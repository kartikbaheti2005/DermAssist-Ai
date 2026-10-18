import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Brain, CheckCircle2, Image as ImageIcon, Info, Camera, Sun, ScanLine, AlertCircle } from "lucide-react";
import UploadCard from "../components/prediction/UploadCard";
import ProcessingLoader from "../components/prediction/ProcessingLoader";
import ResultCard from "../components/prediction/ResultCard";
import ExplainableAI from "../components/prediction/ExplainableAI";
import RecommendationPanel from "../components/prediction/RecommendationPanel";
import { predictImage, getPredictionHeatmap, getRecommendations } from "../api/predictionApi";
import { uploadImage } from "../api/imageApi";

const PAGE_STATE = { UPLOAD: "upload", PROCESSING: "processing", RESULT: "result" };
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://dermassist-ai-backend.onrender.com").replace(/\/$/, "");
const assetUrl = (path) => {
  if (!path) return null;
  const normalized = String(path).replaceAll("\\", "/");
  const uploadsIndex = normalized.lastIndexOf("uploads/");
  const relative = uploadsIndex >= 0 ? normalized.slice(uploadsIndex + "uploads/".length) : normalized.split("/").pop();
  return `${API_BASE_URL}/uploads/${relative.split("/").map(encodeURIComponent).join("/")}`;
};
const errorMessage = (error) => error?.response?.data?.detail || error?.response?.data?.message || error?.message || "The analysis could not be completed. Please try again.";

const ScanTips = () => (
  <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-7">
    <div className="flex items-center gap-3">
      <Info size={24} className="text-blue-600" aria-hidden="true" />
      <div><h2 className="text-lg font-bold text-slate-900">Prepare your image</h2><p className="text-sm text-slate-500">A clear photo can help the model process it.</p></div>
    </div>
    <div className="mt-6 space-y-5">
      {[
        [Sun, "Good lighting", "Use bright, even light and avoid strong shadows."],
        [Camera, "Show the whole area", "Keep the lesion and surrounding skin in frame."],
        [ScanLine, "Sharp focus", "Hold steady and avoid blurry images."],
        [ImageIcon, "Simple background", "Keep unrelated objects out of the frame."],
      ].map(([Icon, title, description]) => (
        <div key={title} className="flex items-start gap-3"><Icon size={19} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" /><div><h3 className="text-sm font-semibold text-slate-800">{title}</h3><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div></div>
      ))}
    </div>
  </aside>
);

const LesionTrackerPage = () => {
  const [pageState, setPageState] = useState(PAGE_STATE.UPLOAD);
  const [result, setResult] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");
  const [supplementaryLoading, setSupplementaryLoading] = useState(false);
  const analysisRequest = useRef(0);

  const handleAnalyze = async (imageFile) => {
    const requestId = ++analysisRequest.current;
    setError("");
    setResult(null);
    setEvidence(null);
    setRecommendations(null);
    setSupplementaryLoading(false);
    setPageState(PAGE_STATE.PROCESSING);
    try {
      const upload = await uploadImage(imageFile);
      if (requestId !== analysisRequest.current) return;
      const image = upload?.image;
      if (!image?.id) throw new Error("The image upload did not return an image record.");
      const response = await predictImage(image.id);
      if (requestId !== analysisRequest.current) return;
      const prediction = response?.prediction;
      if (!prediction?.id) throw new Error("The model did not return a saved prediction.");
      setResult({ prediction, originalUrl: assetUrl(image.image_path || image.image_name) });
      setEvidence({ original_url: assetUrl(image.image_path || image.image_name), heatmap_url: null, overlay_url: null });
      setSupplementaryLoading(true);
      setPageState(PAGE_STATE.RESULT);

      Promise.allSettled([
        getPredictionHeatmap(prediction.id),
        getRecommendations(prediction.id),
      ]).then(([heatmapResult, recommendationResult]) => {
        if (requestId !== analysisRequest.current) return;
        const heatmap = heatmapResult.status === "fulfilled" ? heatmapResult.value : null;
        setEvidence({
          original_url: assetUrl(image.image_path || image.image_name),
          heatmap_url: assetUrl(heatmap?.heatmap_url),
          overlay_url: assetUrl(heatmap?.overlay_url),
        });
        setRecommendations(recommendationResult.status === "fulfilled" ? recommendationResult.value : null);
        setSupplementaryLoading(false);
      });
    } catch (requestError) {
      if (requestId !== analysisRequest.current) return;
      setError(errorMessage(requestError));
      setSupplementaryLoading(false);
      setPageState(PAGE_STATE.UPLOAD);
    }
  };

  const reset = () => {
    analysisRequest.current += 1;
    setResult(null);
    setEvidence(null);
    setRecommendations(null);
    setSupplementaryLoading(false);
    setError("");
    setPageState(PAGE_STATE.UPLOAD);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-5 sm:px-6 lg:py-8">
      <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {pageState === PAGE_STATE.UPLOAD && <Upload size={23} aria-hidden="true" />}
          {pageState === PAGE_STATE.PROCESSING && <Brain size={23} className="animate-pulse" aria-hidden="true" />}
          {pageState === PAGE_STATE.RESULT && <CheckCircle2 size={23} aria-hidden="true" />}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">AI skin screening</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">Upload a clear image for analysis by the DermAssist screening model. The result is decision support, not a medical diagnosis.</p>
          <p className="mt-3 text-xs text-slate-500">JPG or PNG · up to 10 MB · Avoid including identifying details in the image</p>
        </div>
      </header>

      {error && <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" /><span>{error}</span></div>}

      {pageState === PAGE_STATE.UPLOAD && <div className="grid items-start gap-6 lg:grid-cols-5"><div className="lg:col-span-3"><UploadCard onAnalyze={handleAnalyze} /></div><div className="lg:col-span-2"><ScanTips /></div></div>}

      {pageState === PAGE_STATE.PROCESSING && <div className="mx-auto max-w-3xl"><ProcessingLoader /><p className="mt-4 text-center text-sm text-slate-500">The image is being uploaded and analyzed by the configured model. This can take a little while.</p></div>}

      {pageState === PAGE_STATE.RESULT && result && <div className="dashboard-stagger space-y-6">
        <ResultCard prediction={result.prediction} />
        <div className="grid items-start gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7"><ExplainableAI evidence={evidence} evidenceLoading={supplementaryLoading} /></div>
          <div className="xl:col-span-5"><RecommendationPanel recommendations={recommendations} riskLevel={result.prediction.risk_level} assessment={result.prediction} recommendationLoading={supplementaryLoading} /></div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link to="/doctors" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Find a dermatologist</Link>
          <button type="button" onClick={reset} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Analyze another image</button>
        </div>
      </div>}
    </div>
  );
};

export default LesionTrackerPage;
