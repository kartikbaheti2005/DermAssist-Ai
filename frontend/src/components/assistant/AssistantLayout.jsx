import ConversationSidebar from "./conversation/ConversationSidebar";
import ConversationWorkspace from "./conversation/ConversationWorkspace";
import CopilotPanel from "./copilot/CopilotPanel";

const AssistantLayout = ({
  conversations, activeConversation, activeConversationId, isTyping,
  isLoadingConversation, chatError, contextError, contextLoading,
  healthSnapshot, latestPrediction, latestReport, nextAppointment,
  quickActions, suggestedQuestions, suggestedFollowUps,
  onSelectConversation, onNewChat, onSendMessage, onBackToHome,
  onQuickAction, onSuggestedQuestion, onFollowUp,
}) => (
  <div className="grid min-h-[calc(100vh-10rem)] grid-cols-1 gap-4 xl:grid-cols-[15rem_minmax(0,1fr)] 2xl:grid-cols-[15rem_minmax(0,1fr)_20rem]">
    <aside className="hidden min-h-[34rem] xl:block">
      <ConversationSidebar conversations={conversations} activeConversationId={activeConversationId} onSelectConversation={onSelectConversation} onNewChat={onNewChat} />
    </aside>
    <details className="rounded-xl border border-slate-200 bg-white xl:hidden">
      <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-800">Conversation history and new chat</summary>
      <div className="h-64 px-3 pb-3">
        <ConversationSidebar conversations={conversations} activeConversationId={activeConversationId} onSelectConversation={onSelectConversation} onNewChat={onNewChat} />
      </div>
    </details>
    <main className="assistant-panel-enter min-h-[34rem] min-w-0">
      <ConversationWorkspace activeConversation={activeConversation} quickActions={quickActions} suggestedQuestions={suggestedQuestions} suggestedFollowUps={suggestedFollowUps} onSendMessage={onSendMessage} onQuickAction={onQuickAction} onSuggestedQuestion={onSuggestedQuestion} onFollowUp={onFollowUp} onBackToHome={onBackToHome} isTyping={isTyping} isLoadingConversation={isLoadingConversation} chatError={chatError} contextError={contextError} />
    </main>
    <aside className="hidden min-h-[34rem] 2xl:block">
      <CopilotPanel healthSnapshot={healthSnapshot} latestPrediction={latestPrediction} latestReport={latestReport} nextAppointment={nextAppointment} contextLoading={contextLoading} />
    </aside>
  </div>
);
export default AssistantLayout;
