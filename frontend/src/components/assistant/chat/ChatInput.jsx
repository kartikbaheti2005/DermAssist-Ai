import { ImagePlus, Mic, Send } from "lucide-react";
import { useState } from "react";
import SuggestedFollowUps from "../suggestions/SuggestedFollowUps";
const ChatInput = ({ onSendMessage, suggestedFollowUps, onFollowUp, disabled = false }) => {
  const [message, setMessage] = useState("");
  const send = () => { const text = message.trim(); if (!text || disabled) return; onSendMessage(text); setMessage(""); };
  const onKeyDown = (event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-4">
      <SuggestedFollowUps followUps={suggestedFollowUps} onFollowUp={onFollowUp} />
      <div className="flex items-end gap-2 sm:gap-3">
        <div className="hidden gap-1 sm:flex"><button type="button" disabled title="Image attachment is not available yet" aria-label="Image attachment unavailable" className="rounded-lg p-2 text-slate-400"><ImagePlus size={19} /></button><button type="button" disabled title="Voice input is not available yet" aria-label="Voice input unavailable" className="rounded-lg p-2 text-slate-400"><Mic size={19} /></button></div>
        <textarea rows={2} value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={onKeyDown} disabled={disabled} aria-label="Message the AI Assistant" placeholder="Ask about your saved information…" className="min-h-[54px] flex-1 resize-y rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 sm:px-4" />
        <button type="button" onClick={send} disabled={!message.trim() || disabled} aria-label={disabled ? "Assistant is responding" : "Send message"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"><Send size={18} aria-hidden="true" /></button>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Enter to send · Shift+Enter for a new line</p>
    </div>
  );
};
export default ChatInput;
