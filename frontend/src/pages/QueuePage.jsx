import DashboardLayout from "../components/layout/DashboardLayout";

import QueueSummary from "../components/queue/QueueSummary";
import QueueStatus from "../components/queue/QueueStatus";
import QueueTimeline from "../components/queue/QueueTimeline";
import QueueCard from "../components/queue/QueueCard";

import useQueue from "../hooks/useQueue";

const QueuePage = () => {
  const {
    queueSummary,
    queueStatus,
    queueTimeline,
    smartQueueInsights,
  } = useQueue();

  return (
      <div className="space-y-6">

        {/* Queue Summary */}
        <QueueSummary
          queueSummary={queueSummary}
        />

        {/* Two Column Section */}
        <div className="grid gap-6 lg:grid-cols-2">

          <QueueStatus
            queueStatus={queueStatus}
          />

          <QueueTimeline
            queueTimeline={queueTimeline}
          />

        </div>

        {/* Smart Queue */}
        <QueueCard
          smartQueueInsights={smartQueueInsights}
        />

      </div>
  );
};

export default QueuePage;