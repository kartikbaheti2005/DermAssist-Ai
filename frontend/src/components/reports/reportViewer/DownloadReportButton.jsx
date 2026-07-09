import { Download } from "lucide-react";

const DownloadReportButton = ({ report }) => {
  const handleDownload = () => {
    console.log("Download Report", report?.id);

    // Future API
    // GET /reports/{id}/download
  };

  return (
    <button
      onClick={handleDownload}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white transition hover:bg-sky-700"
    >
      <Download className="h-5 w-5" />

      Download PDF
    </button>
  );
};

export default DownloadReportButton;