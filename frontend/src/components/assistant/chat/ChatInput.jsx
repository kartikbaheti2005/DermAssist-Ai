import { ImagePlus, Mic, Send } from "lucide-react";
import { useState } from "react";
import SuggestedFollowUps from "../suggestions/SuggestedFollowUps";

const ChatInput = ({
  onSendMessage,
  suggestedFollowUps,
  onFollowUp,
}) => {

  console.log(onFollowUp);
  const [message, setMessage] = useState("");
   
  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">

      <SuggestedFollowUps
          followUps={suggestedFollowUps}
          onFollowUp={onFollowUp}
      />
      <div className="flex items-end gap-3">
        {/* Future Features */}
        <div className="flex gap-2">
          <button
            disabled
            title="Attach Image (Coming Soon)"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ImagePlus size={20} />
          </button>

          <button
            disabled
            title="Voice Assistant (Coming Soon)"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <Mic size={20} />
          </button>
        </div>

        {/* Input */}
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your skin health..."
          className="flex-1 min-h-[56px] rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-lg bg-blue-600 p-3 h-12 w-12 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;