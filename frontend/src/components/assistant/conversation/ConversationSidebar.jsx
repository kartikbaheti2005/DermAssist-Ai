import ConversationList from "./ConversationList";
import NewChatButton from "../common/NewChatButton";
const ConversationSidebar = ({ conversations, activeConversationId, onSelectConversation, onNewChat }) => (
  <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-4"><h2 className="text-base font-semibold text-slate-900">AI Assistant</h2><p className="mt-1 text-xs text-slate-500">Saved conversations</p></div>
    <div className="p-4"><NewChatButton onClick={onNewChat} /></div>
    <div className="flex-1 overflow-y-auto px-4 pb-4"><ConversationList conversations={conversations} activeConversationId={activeConversationId} onSelectConversation={onSelectConversation} /></div>
  </div>
);
export default ConversationSidebar;
