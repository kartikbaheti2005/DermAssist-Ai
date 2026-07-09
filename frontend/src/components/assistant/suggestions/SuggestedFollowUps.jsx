import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SuggestedFollowUps = ({
  followUps,
  onFollowUp,
}) => {
  console.log({
    followUps,
    onFollowUp,
  });
  console.log("ChatInput Props:", {
    followUps,
    onFollowUp,
  });
  const [expanded, setExpanded] = useState(false);

  const visibleFollowUps = expanded
  ? followUps
  : followUps.slice(0, 2);

  return (
    <div className="mt-4">
      <p className="mb-3 text-sm font-medium text-gray-500">
        Suggested Follow-ups
      </p>

      <div className="space-y-2">
        {visibleFollowUps.map((question, index) => (
          <button
            key={index}
            onClick={() => {
              console.log("Clicked:", question);
              onFollowUp(question);
            }}
            className="w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-left text-sm text-blue-700 transition hover:bg-blue-100"
          >
            {question}
          </button>
        ))}
      </div>

      {followUps.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {expanded ? (
            <>
              Show Less
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show More
              <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
};


export default SuggestedFollowUps;