import ChatInput from "../chat/ChatInput";
import ChatMessages from "../chat/ChatMessages";
import { AlertCircle, ArrowLeft } from "lucide-react";
const ConversationContent = ({ conversation, onSendMessage, suggestedFollowUps, onFollowUp, isTyping, isLoading, chatError, onBackToHome }) => (
  <div className="flex h-full min-h-[34rem] flex-col overflow-hidden">
    <header className="assistant-fly-in assistant-fly-in--left flex items-center gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
      <button type="button" onClick={onBackToHome} aria-label="Back to assistant home" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"><ArrowLeft size={19} aria-hidden="true" /></button>
      <div className="min-w-0"><h2 className="truncate text-base font-semibold text-slate-900">{conversation.title}</h2><p className="mt-0.5 text-xs text-slate-500">AI health-information support</p></div>
    </header>
    <div className="flex-1 overflow-y-auto">
      {isLoading ? <div className="m-6 h-20 animate-pulse rounded-2xl bg-slate-100" aria-label="Loading conversation" /> : <ChatMessages messages={conversation.messages || []} suggestedFollowUps={suggestedFollowUps} onFollowUp={onFollowUp} isTyping={isTyping} />}
    </div>
    {chatError && <div role="alert" className="mx-4 mb-2 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 sm:mx-6"><AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" /><p>{chatError}</p></div>}
    <p className="px-4 pt-2 text-[11px] leading-4 text-slate-500 sm:px-6">Your message and relevant saved health context may be processed by this app’s configured AI provider.</p>
    <div className="border-t border-slate-200 p-3 sm:p-4"><ChatInput onSendMessage={onSendMessage} suggestedFollowUps={suggestedFollowUps} onFollowUp={onFollowUp} disabled={isTyping || isLoading} /></div>
  </div>
);
export default ConversationContent;
