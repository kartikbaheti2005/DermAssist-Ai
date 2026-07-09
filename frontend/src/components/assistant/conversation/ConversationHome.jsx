import QuickActions from "../suggestions/QuickActions";
import SuggestedQuestions from "../suggestions/SuggestedQuestions";

const ConversationHome = ({
  quickActions,
  suggestedQuestions,
  onQuickAction,
  onSuggestedQuestion,
}) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-8 pt-8 pb-8">
      {/* Welcome */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Medical AI Copilot
        </h1>

        <p className="mt-3 max-w-2xl mx-auto text-gray-500">
          Ask questions about your skin health, AI predictions,
          reports, appointments, or health records.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <QuickActions
          actions={quickActions}
          onActionClick={onQuickAction}
        />
      </div>

      {/* Suggested Questions */}
      <SuggestedQuestions
        questions={suggestedQuestions}
        onQuestionClick={onSuggestedQuestion}
      />
    </div>
  );
};

export default ConversationHome;