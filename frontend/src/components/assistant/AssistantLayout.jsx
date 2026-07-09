import ConversationSidebar from "./conversation/ConversationSidebar";
import ConversationWorkspace from "./conversation/ConversationWorkspace";
import CopilotPanel from "./copilot/CopilotPanel";

const AssistantLayout = ({
  conversations,
  activeConversation,
  activeConversationId,
  isTyping,

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
  onBackToHome,

  onQuickAction,
  onSuggestedQuestion,
  onFollowUp,
  
}) => {
  return (
    <div className="flex h-[calc(100vh-110px)] gap-6 overflow-hidden">
      {/* Conversation Sidebar */}
      <aside className="w-80 flex-shrink-0 h-full">
        <ConversationSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onNewChat={onNewChat}
        />
      </aside>

      {/* Conversation Workspace */}
      <main className="flex-1 min-w-0 h-full">
        <ConversationWorkspace
          activeConversation={activeConversation}
          quickActions={quickActions}
          suggestedQuestions={suggestedQuestions}
          suggestedFollowUps={suggestedFollowUps}
          onSendMessage={onSendMessage}
          onQuickAction={onQuickAction}
          onSuggestedQuestion={onSuggestedQuestion}
          onBackToHome={onBackToHome}
          onFollowUp={onFollowUp}
          isTyping={isTyping}
        />
      </main>

      {/* Medical Copilot */}
      <aside className="w-96 flex-shrink-0 h-full">
        <CopilotPanel
          healthSnapshot={healthSnapshot}
          latestPrediction={latestPrediction}
          latestReport={latestReport}
          nextAppointment={nextAppointment}
        />
      </aside>
    </div>
  );
};

export default AssistantLayout;