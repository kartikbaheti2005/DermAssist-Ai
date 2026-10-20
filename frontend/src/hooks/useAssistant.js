import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChatConversation, getChatConversation, getChatConversations, sendChatMessage } from "../api/chatbotApi";
import { getAssistantActions, getAssistantContext, getAssistantSuggestions } from "../api/assistantApi";

const routes = {
  "/health-records/latest": "/health-records",
  "/appointments/my": "/appointments",
  "/predictions": "/reports",
  "/images/upload": "/lesion-tracker",
};
const errorText = (error) => error?.response?.data?.detail
  || (error?.code === "ECONNABORTED"
    ? "The assistant is taking longer than expected. Please try again."
    : "The assistant could not complete that request. Check the connection and try again.");
const toMessage = (item) => ({
  id: item.id,
  role: item.role,
  content: item.message,
  timestamp: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
});
const toConversation = (item) => ({
  ...item,
  preview: item.preview || "Open conversation",
  updatedAt: item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "",
  messages: item.messages || [],
});

const useAssistant = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [chatError, setChatError] = useState("");
  const [contextError, setContextError] = useState("");
  const [contextLoading, setContextLoading] = useState(true);
  const [healthSnapshot, setHealthSnapshot] = useState({ bmi: "Not added", bloodGroup: "Not added", allergies: "Not listed", medications: "Not listed" });
  const [latestPrediction, setLatestPrediction] = useState({ disease: "No screening yet", confidence: "Unavailable", risk: "Unavailable", model: "Unavailable" });
  const [latestReport, setLatestReport] = useState({ id: "None available", generatedOn: "—", status: "—" });
  const [nextAppointment, setNextAppointment] = useState({ doctor: "No upcoming visit", specialization: "—", date: "—", time: "—", status: "—" });
  const [quickActions, setQuickActions] = useState([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState([]);
  const selectionToken = useRef(0);
  const navigate = useNavigate();
  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeConversationId) || null,
    [conversations, activeConversationId],
  );

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const [contextResult, suggestionsResult, actionsResult, conversationsResult] = await Promise.allSettled([
        getAssistantContext(), getAssistantSuggestions(), getAssistantActions(), getChatConversations(),
      ]);
      if (!mounted) return;
      if (contextResult.status === "fulfilled") {
        const context = contextResult.value;
        const record = context.latest_health_record || {};
        const prediction = context.latest_prediction;
        const appointment = context.next_appointment;
        setHealthSnapshot({
          bmi: record.bmi ?? "Not added",
          bloodGroup: record.blood_group || "Not added",
          allergies: record.allergies || "Not listed",
          medications: record.medications || "Not listed",
        });
        if (prediction) {
          const confidence = Number(prediction.confidence);
          setLatestPrediction({
            disease: String(prediction.disease || "Screening result").replaceAll("_", " "),
            confidence: Number.isFinite(confidence) ? `${(confidence * 100).toFixed(1)}%` : "Unavailable",
            risk: prediction.risk_level || "Unavailable",
            model: prediction.model_version || "DermAssist model",
          });
          setLatestReport({
            id: `Prediction #${prediction.id}`,
            generatedOn: prediction.created_at ? new Date(prediction.created_at).toLocaleDateString() : "Date unavailable",
            status: "Saved",
          });
        }
        if (appointment) setNextAppointment({
          doctor: appointment.doctor?.name || "Dermatology visit",
          specialization: appointment.doctor?.specialty || "Specialty unavailable",
          date: appointment.appointment_date || "Date unavailable",
          time: appointment.appointment_time || "Time to be confirmed",
          status: appointment.status || "Status unavailable",
        });
      } else {
        setContextError("Health context could not be loaded. You can still chat, but the assistant will not have your latest records or screenings.");
      }
      if (suggestionsResult.status === "fulfilled" && Array.isArray(suggestionsResult.value)) {
        setSuggestedQuestions(suggestionsResult.value.map((item) => item.title).filter(Boolean));
        setSuggestedFollowUps(suggestionsResult.value.map((item) => item.description).filter(Boolean));
      }
      if (actionsResult.status === "fulfilled" && Array.isArray(actionsResult.value)) setQuickActions(actionsResult.value);
      if (conversationsResult.status === "fulfilled" && Array.isArray(conversationsResult.value)) {
        setConversations(conversationsResult.value.map(toConversation));
      } else {
        setContextError((current) => current || "Saved conversations could not be loaded. You can still start a new conversation.");
      }
      setContextLoading(false);
    };
    load();
    return () => { mounted = false; };
  }, []);

  const onSelectConversation = useCallback(async (id) => {
    const token = ++selectionToken.current;
    setActiveConversationId(id);
    setChatError("");
    setIsLoadingConversation(true);
    try {
      const result = await getChatConversation(id);
      if (token !== selectionToken.current) return;
      const messages = (result.messages || []).map(toMessage);
      const item = toConversation({ ...result.conversation, messages, preview: messages.at(-1)?.content || "No messages yet" });
      setConversations((current) => [item, ...current.filter((entry) => entry.id !== id)]);
    } catch (error) {
      if (token === selectionToken.current) setChatError(errorText(error));
    } finally {
      if (token === selectionToken.current) setIsLoadingConversation(false);
    }
  }, []);

  const onNewChat = useCallback(async () => {
    setChatError("");
    try {
      const item = await createChatConversation();
      setConversations((current) => [toConversation({ ...item, preview: "No messages yet", messages: [] }), ...current]);
      setActiveConversationId(item.id);
    } catch (error) {
      setChatError(errorText(error));
    }
  }, []);

  const onSendMessage = useCallback(async (content) => {
    const text = content.trim();
    if (!text || isTyping) return;
    setChatError("");
    setIsTyping(true);
    let id = activeConversationId;
    const pendingId = `pending-${Date.now()}`;
    try {
      if (!id) {
        const item = await createChatConversation();
        id = item.id;
        setActiveConversationId(id);
        setConversations((current) => [toConversation({ ...item, preview: text, messages: [] }), ...current]);
      }
      const localUser = {
        id: pendingId, role: "user", content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setConversations((current) => current.map((item) => item.id === id
        ? { ...item, preview: text, updatedAt: "Just now", messages: [...(item.messages || []), localUser] }
        : item));
      const result = await sendChatMessage(id, text);
      const userMessage = result.user_message ? toMessage(result.user_message) : localUser;
      const assistantMessage = result.assistant_message ? toMessage(result.assistant_message) : {
        id: `assistant-${Date.now()}`, role: "assistant", content: result.response,
        timestamp: result.timestamp ? new Date(result.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
      };
      setConversations((current) => current.map((item) => item.id === id ? {
        ...item, preview: text, updatedAt: "Just now",
        messages: [...(item.messages || []).filter((entry) => entry.id !== pendingId), userMessage, assistantMessage],
      } : item));
    } catch (error) {
      setChatError(errorText(error));
      if (id) setConversations((current) => current.map((item) => item.id === id
        && !(item.messages || []).some((entry) => entry.id === pendingId)
        ? { ...item, messages: [...(item.messages || []), { id: pendingId, role: "user", content: text, timestamp: "Not sent" }] }
        : item));
    } finally {
      setIsTyping(false);
    }
  }, [activeConversationId, isTyping]);

  const onQuickAction = useCallback((action) => navigate(routes[action.route] || action.route), [navigate]);
  const onBackToHome = useCallback(() => { setActiveConversationId(null); setChatError(""); }, []);

  return {
    conversations, activeConversation, activeConversationId, isTyping,
    isLoadingConversation, chatError, contextError, contextLoading,
    healthSnapshot, latestPrediction, latestReport, nextAppointment,
    quickActions, suggestedQuestions, suggestedFollowUps,
    onSelectConversation, onNewChat, onSendMessage, onQuickAction,
    onSuggestedQuestion: onSendMessage, onFollowUp: onSendMessage, onBackToHome,
  };
};

export default useAssistant;
