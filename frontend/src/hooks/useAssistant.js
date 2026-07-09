import { useState } from "react";

import {
  conversations as initialConversations,
  healthSnapshot,
  latestPrediction,
  latestReport,
  nextAppointment,
  quickActions,
  suggestedQuestions,
  suggestedFollowUps,
} from "../data/assistantData";

const useAssistant = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId
    ) || null;

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
  };

  const handleSendMessage = (content) => {
    console.log("Sending:", content);
    let conversationId = activeConversationId;

    if (!conversationId) {
      conversationId = createConversation();
    }

    sendMessageToConversation(conversationId, content);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt);
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleFollowUp = (question) => {
    handleSendMessage(question);
  };

 const handleBackToHome = () => {
    console.log("Back to Home");
    setActiveConversationId(null);
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