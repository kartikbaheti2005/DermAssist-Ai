import {
  Brain,
  Clock3,
  TrendingUp,
  BellRing,
} from "lucide-react";

const QueueCard = ({ smartQueueInsights }) => {
  const cards = [
    {
      icon: Clock3,
      title: "Average Wait",
      value: smartQueueInsights[0],
    },
    {
      icon: TrendingUp,
      title: "Queue Performance",
      value: smartQueueInsights[1],
    },
    {
      icon: Brain,
      title: "AI Recommendation",
      value: smartQueueInsights[2],
    },
    {
      icon: BellRing,
      title: "Live Updates",
      value:
        "You'll be notified automatically when your turn is approaching.",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Smart Queue Insights
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          AI-powered information about your consultation queue.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <Icon size={18} />
                </div>

                <h3 className="font-medium text-gray-900">
                  {card.title}
                </h3>
              </div>

              <p className="text-sm leading-6 text-gray-600">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueueCard;