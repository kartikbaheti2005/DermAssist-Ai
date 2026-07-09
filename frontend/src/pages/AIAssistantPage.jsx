import DashboardLayout from "../components/layout/DashboardLayout";
import AssistantLayout from "../components/assistant/AssistantLayout";
import useAssistant from "../hooks/useAssistant";

const AIAssistantPage = () => {
  const {
    conversations,
    activeConversation,
    activeConversationId,

    healthSnapshot,
    latestPrediction,
    latestReport,
    nextAppointment,

    quickActions,
    suggestedQuestions,
    suggestedFollowUps,

    onSelectConversation,
    onNewChat,
    onSendMessage,

    onQuickAction,
    onSuggestedQuestion,
    onFollowUp,
  } = useAssistant();

  return (
      <AssistantLayout
        conversations={conversations}
        activeConversation={activeConversation}
        activeConversationId={activeConversationId}
        healthSnapshot={healthSnapshot}
        latestPrediction={latestPrediction}
        latestReport={latestReport}
        nextAppointment={nextAppointment}
        quickActions={quickActions}
        suggestedQuestions={suggestedQuestions}
        suggestedFollowUps={suggestedFollowUps}
        onSelectConversation={onSelectConversation}
        onNewChat={onNewChat}
        onSendMessage={onSendMessage}
        onQuickAction={onQuickAction}
        onSuggestedQuestion={onSuggestedQuestion}
        onFollowUp={onFollowUp}
        
      />
  );
};

export default AIAssistantPage;