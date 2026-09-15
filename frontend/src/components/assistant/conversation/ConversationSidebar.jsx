import ConversationList from "./ConversationList";
import NewChatButton from "../common/NewChatButton";

const ConversationSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}) => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          AI Assistant
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your Medical AI Copilot
        </p>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <NewChatButton onClick={onNewChat} />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
        />
      </div>
    </div>
  );
};

export default ConversationSidebar;