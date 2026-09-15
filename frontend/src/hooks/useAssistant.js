import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAssistantContext,
    getAssistantSuggestions,
    getAssistantActions,
} from "../api/assistantApi";

import {
    conversations as initialConversations,
} from "../data/assistantData";

const useAssistant = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [healthSnapshot, setHealthSnapshot] = useState({});
  const [latestPrediction, setLatestPrediction] = useState({});
  const [latestReport, setLatestReport] = useState({});
  const [nextAppointment, setNextAppointment] = useState({});
  const [quickActions, setQuickActions] = useState([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
    loadAssistantData();
}, []);

const activeConversation =
    conversations.find(
        (conversation) =>
            conversation.id === activeConversationId
    ) || null;

  const loadAssistantData = async () => {

      try {

          const [

              context,
              suggestions,
              actions,

          ] = await Promise.all([
              getAssistantContext(),
              getAssistantSuggestions(),
              getAssistantActions(),

          ]);

          console.log("Assistant Context", context);
          console.log("Suggestions", suggestions);
          console.log("Actions", actions);

          setHealthSnapshot({
              bmi: context.latest_health_record?.bmi,
              bloodGroup: context.latest_health_record?.blood_group,
              allergies: context.latest_health_record?.allergies,
              medications: context.latest_health_record?.medications,
          });

          setLatestReport({
              id: context.latest_prediction?.id,
              generatedOn: context.latest_prediction?.created_at,
              status: "Generated",
          });

          setNextAppointment({
              doctor: context.next_appointment?.doctor?.name,
              specialization: context.next_appointment?.doctor?.specialty,
              date: context.next_appointment?.appointment_date,
              time: context.next_appointment?.appointment_time,
              status: context.next_appointment?.status,
          });

          setQuickActions(actions);

          setSuggestedQuestions(
              suggestions.map(item => item.title)
          );

          setSuggestedFollowUps(
              suggestions.map(item => item.description)
          );
          
          setLatestPrediction({
              disease: context.latest_prediction?.disease,
              confidence: context.latest_prediction?.confidence,
              risk: context.latest_prediction?.risk_level,
              model: "DermAssist AI",
          });
      }

      catch (err) {
          console.error(err);
      }

  };
  const createConversation = (title = "New Conversation") => {
    const id = Date.now();

    const conversation = {
      id,
      title,
      preview: "",
      updatedAt: "Just now",
      messages: [],
    };

    setConversations((prev) => [conversation, ...prev]);
    setActiveConversationId(id);

    return id;
  };

  const sendMessageToConversation = (conversationId, content) => {
    const userMessage = {
      id: Date.now(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content:
        "This is a mock AI response. Backend and LLM integration will be completed in Phase 4 and Phase 5.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== conversationId) return conversation;

        return {
          ...conversation,
          preview: content,
          updatedAt: "Just now",
          messages: [
            ...conversation.messages,
            userMessage,
            assistantMessage,
          ],
        };
      })
    );
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
  };

  const handleNewChat = () => {
      createConversation();
      setActiveConversationId(null);
  };

  const handleSendMessage = (content) => {
      let conversationId = activeConversationId;
      if (!conversationId) {
          conversationId = createConversation();
          setActiveConversationId(conversationId);
      }

      sendMessageToConversation(
          conversationId,
          content
      );
  };

  const routeMap = {
      "/health-records/latest": "/health-records",
      "/appointments/my": "/appointments",
  
      // TEMP until Prediction page exists
      "/predictions": "/reports",
  };

const handleQuickAction = (action) => {

    console.log(action);

    navigate(routeMap[action.route] || action.route);

};
  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleFollowUp = (question) => {
    handleSendMessage(question);
  };

const handleBackToHome = () => {

    console.log("BACK BUTTON PRESSED");

    console.log("Before:", activeConversationId);

    setActiveConversationId(null);

    setTimeout(() => {

        console.log("After:", activeConversationId);

    }, 100);

};
  
    return {
    // State
    conversations,
    activeConversation,
    activeConversationId,
    isTyping,

    // Medical Context
    healthSnapshot,
    latestPrediction,
    latestReport,
    nextAppointment,

    // Suggestions
    quickActions,
    suggestedQuestions,
    suggestedFollowUps,

    // Conversation Actions
    onSelectConversation: handleSelectConversation,
    onNewChat: handleNewChat,
    onSendMessage: handleSendMessage,
    onBackToHome: handleBackToHome,

    // AI Assistant Actions
    onQuickAction: handleQuickAction,
    onSuggestedQuestion: handleSuggestedQuestion,
    onFollowUp: handleFollowUp,
  };
};

export default useAssistant;