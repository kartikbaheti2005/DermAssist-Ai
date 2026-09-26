import QuickActions from "../suggestions/QuickActions";
import SuggestedQuestions from "../suggestions/SuggestedQuestions";
import { Info, Sparkles } from "lucide-react";
const ConversationHome = ({ quickActions, suggestedQuestions, onQuickAction, onSuggestedQuestion, contextError }) => (
  <div className="assistant-fly-stage flex h-full min-h-[34rem] flex-col overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
    <div className="assistant-fly-in assistant-fly-in--up mb-7 text-center">
      <span className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm"><Sparkles size={14} aria-hidden="true" /> DERMASSIST CARE COMPANION</span>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">AI Assistant</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">Ask about saved screening results, health records, or appointments. The assistant provides information, not diagnosis or treatment.</p>
    </div>
    {contextError && <div role="status" className="assistant-fly-in assistant-fly-in--right mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{contextError}</div>}
    <div className="assistant-fly-in assistant-fly-in--left mb-6 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs leading-5 text-blue-900"><Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" /><p>Messages and relevant health context may be processed by the AI provider configured for this app. Avoid sharing details you do not want to send.</p></div>
    <div className="assistant-fly-in assistant-fly-in--right mb-8"><QuickActions actions={quickActions} onActionClick={onQuickAction} /></div>
    <div className="assistant-fly-in assistant-fly-in--up"><SuggestedQuestions questions={suggestedQuestions} onQuestionClick={onSuggestedQuestion} /></div>
  </div>
);
export default ConversationHome;
