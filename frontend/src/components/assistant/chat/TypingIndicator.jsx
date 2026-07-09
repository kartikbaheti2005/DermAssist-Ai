import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-xs gap-3">
        {/* AI Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Bot size={20} />
        </div>

        {/* Typing Bubble */}
        <div className="rounded-2xl bg-gray-100 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
              style={{ animationDelay: "0.15s" }}
            ></span>
            <span
              className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
              style={{ animationDelay: "0.3s" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;