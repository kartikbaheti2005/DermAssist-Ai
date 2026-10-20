import { Download } from "lucide-react";

const DownloadButton = ({ report }) => {
  const handleDownload = () => window.print();

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-sky-600
        px-5
        py-3
        font-medium
        text-white
        transition
        hover:bg-sky-700
      "
    >
      <Download className="h-5 w-5" />

      Print or save as PDF
    </button>
  );
};

export default DownloadButton;
