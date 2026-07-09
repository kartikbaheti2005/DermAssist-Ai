import ConversationContent from "./ConversationContent";
import ConversationHome from "./ConversationHome";

const ConversationWorkspace = ({
  activeConversation,
  isTyping,
  onBackToHome,

  quickActions,
  suggestedQuestions,
  suggestedFollowUps,

  onSendMessage,
  onQuickAction,
  onSuggestedQuestion,
  onFollowUp,
}) => {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white shadow-sm">
      {activeConversation ? (
        <ConversationContent
          conversation={activeConversation}
          onSendMessage={onSendMessage}
          suggestedFollowUps={suggestedFollowUps}
          onFollowUp={onFollowUp}
          isTyping={isTyping}
          onBackToHome={onBackToHome}
        />
      ) : (
        <ConversationHome
          quickActions={quickActions}
          suggestedQuestions={suggestedQuestions}
          onQuickAction={onQuickAction}
          onSuggestedQuestion={onSuggestedQuestion}
        />
      )}
    </div>
  );
};

export default ConversationWorkspace;