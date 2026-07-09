const SuggestedQuestions = ({
  questions,
  onQuestionClick,
}) => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Suggested Questions
      </h3>

      <div className="flex flex-wrap gap-3">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;