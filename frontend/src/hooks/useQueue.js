import {
  queueSummary,
  queueStatus,
  queueTimeline,
  smartQueueInsights,
} from "../data/queueData";

const useQueue = () => {
  return {
    queueSummary,
    queueStatus,
    queueTimeline,
    smartQueueInsights,
  };
};

export default useQueue;