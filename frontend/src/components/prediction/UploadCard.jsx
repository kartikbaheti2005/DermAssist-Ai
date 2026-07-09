import { useRef, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  X,
  AlertCircle,
} from "lucide-react";

const UploadCard = ({onAnalyze,}) => {

  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const MAX_SIZE = 10 * 1024 * 1024;

  const validateFile = (file) => {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return false;
    }

    if (file.size > MAX_SIZE) {
      setError("Image size must be less than 10 MB.");
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    setError("");

    if (!validateFile(file)) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
            Skin Lesion Analysis
        </h1>
        
        <p className="mt-2 text-slate-500 max-w-3xl">
            Upload a clear image of the affected skin area and let DermAssist AI perform an AI-assisted skin lesion analysis.
        </p>

      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="
          max-w-xl
          mx-auto
          flex
          min-h-[280px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-blue-300
          bg-blue-50/40
          transition
          hover:bg-blue-50
        "
        onClick={() => fileInputRef.current.click()}
      >

        {!preview ? (
          <>
            <Upload
              size={60}
              className="mb-4 text-blue-600"
            />

            <h3 className="text-xl font-semibold text-slate-800">
              Drag & Drop Image
            </h3>

            <p className="mt-2 text-slate-500">
              or click to browse files
            </p>

            <p className="mt-6 text-sm text-slate-400">
              JPG • PNG • JPEG
            </p>

            <p className="text-sm text-slate-400">
              Maximum Size: 10 MB
            </p>
          </>
        ) : (
          <div className="relative p-4">

            <img
                src={preview}
                alt="Preview"
                className="
                    mx-auto
                    max-h-[320px]
                    w-full
                    rounded-2xl
                    object-contain
                    shadow-lg
                "
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="
                absolute
                right-3
                top-3
                rounded-full
                bg-red-500
                p-2
                text-white
                shadow-lg
                transition
                hover:bg-red-600
              "
            >
              <X size={18} />
            </button>

          </div>
        )}

      </div>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleChange}
      />

      {error && (
        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-50
            p-4
            text-red-600
          "
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <button
        disabled={!selectedImage}
        onClick={onAnalyze}
        className="
          mt-8
          w-full
          rounded-xl
          bg-blue-600
          px-6
          py-4
          text-lg
          font-semibold
          text-white
          transition

          hover:bg-blue-700

          disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
      >
        Analyze Image
      </button>

    </div>
  );
};

export default UploadCard;