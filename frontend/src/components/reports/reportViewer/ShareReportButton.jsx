import { Share2 } from "lucide-react";

const ShareReportButton = ({ report }) => {
  const handleShare = () => {
    console.log("Share Report", report?.id);

    // Future:
    // navigator.share(...)
    // Copy Link
    // Share API
  };

  return (
    <button
      onClick={handleShare}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <Share2 className="h-5 w-5" />

      Share Report
    </button>
  );
};

export default ShareReportButton;