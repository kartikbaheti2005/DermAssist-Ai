import { MessageSquare } from "lucide-react";

const ConversationItem = ({
  conversation,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-4 text-left transition-all duration-200 ${
        isActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`rounded-full p-2 ${
            isActive
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <MessageSquare size={18} />
        </div>

        {/* Conversation Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {conversation.title}
            </h3>

            <span className="text-xs text-gray-500">
              {conversation.updatedAt}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-gray-600">
            {conversation.preview}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;