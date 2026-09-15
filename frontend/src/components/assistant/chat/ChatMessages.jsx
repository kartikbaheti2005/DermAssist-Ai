import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";

const ChatMessages = ({
  messages,
  isTyping = false,
  suggestedFollowUps = [],
  onFollowUp,
}) => {
  const bottomRef = useRef(null);
    useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="flex flex-col gap-4 p-6">
      {messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}
      </>
      ) : (
        <div className="flex flex-1 items-center justify-center py-10 text-center">
          <p className="text-sm text-gray-500">
            No messages yet. Start the conversation below.
          </p>
        </div>
      )}

      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;