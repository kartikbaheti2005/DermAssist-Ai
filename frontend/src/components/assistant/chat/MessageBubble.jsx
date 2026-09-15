import { Bot, User } from "lucide-react";

const MessageBubble = ({ message }) => {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-3xl gap-3 ${
          isAssistant ? "" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
            isAssistant
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {isAssistant ? <Bot size={20} /> : <User size={20} />}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <div
            className={`rounded-2xl px-5 py-3 shadow-sm ${
              isAssistant
                ? "bg-gray-100 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-7">
              {message.content}
            </p>
          </div>

          <span
            className={`mt-2 text-xs text-gray-500 ${
              isAssistant ? "text-left" : "text-right"
            }`}
          >
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;