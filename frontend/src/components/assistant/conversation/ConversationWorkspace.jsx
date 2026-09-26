import ConversationContent from "./ConversationContent";
import ConversationHome from "./ConversationHome";
const ConversationWorkspace = (props) => (
  <div className="h-full min-h-[34rem] rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-blue-50/40 shadow-[0_12px_40px_-24px_rgba(30,64,175,0.25)]">
    {props.activeConversation
      ? <ConversationContent conversation={props.activeConversation} onSendMessage={props.onSendMessage} suggestedFollowUps={props.suggestedFollowUps} onFollowUp={props.onFollowUp} isTyping={props.isTyping} isLoading={props.isLoadingConversation} chatError={props.chatError} onBackToHome={props.onBackToHome} />
      : <ConversationHome quickActions={props.quickActions} suggestedQuestions={props.suggestedQuestions} onQuickAction={props.onQuickAction} onSuggestedQuestion={props.onSuggestedQuestion} contextError={props.contextError} />}
  </div>
);
export default ConversationWorkspace;
