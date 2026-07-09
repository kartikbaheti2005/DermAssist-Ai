import ChatInput from "../chat/ChatInput";
import ChatMessages from "../chat/ChatMessages";
import { ArrowLeft } from "lucide-react";

const ConversationContent = ({
  conversation,
  onSendMessage,
  suggestedFollowUps,
  onFollowUp,
  isTyping,
  onBackToHome,
}) => {
  console.log("ConversationContent:", onBackToHome);
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
     <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            console.log("Back button clicked");
            onBackToHome?.();
          }}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
          title="Back to Home"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {conversation.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Continue your conversation with the Medical AI Copilot.
          </p>
        </div>
      </div>
    </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages
          messages={conversation.messages}
          suggestedFollowUps={suggestedFollowUps}
          onFollowUp={onFollowUp}
          isTyping={isTyping}
        />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3">
        <ChatInput
          onSendMessage={onSendMessage}
          suggestedFollowUps={suggestedFollowUps}
          onFollowUp={onFollowUp}
        />
      </div>
    </div>
  );
};

export default ConversationContent;