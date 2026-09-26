import { useState } from "react";
import { Brain, Image as ImageIcon, Info } from "lucide-react";

const views = [
  { id: "original", label: "Original", key: "original_url" },
  { id: "heatmap", label: "Heatmap", key: "heatmap_url" },
  { id: "overlay", label: "Overlay", key: "overlay_url" },
];

const ExplainableAI = ({ evidence, evidenceLoading = false }) => {
  const [active, setActive] = useState("original");
  const selected = views.find((view) => view.id === active);
  const imageUrl = evidence?.[selected?.key];

  return (
    <section className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="explanation-title">
      <div className="flex items-center gap-3">
        <Brain size={27} className="text-blue-600" aria-hidden="true" />
        <div>
          <h2 id="explanation-title" className="text-xl font-bold text-slate-900">Visual evidence</h2>
          <p className="text-sm text-slate-500">Grad-CAM view from this model run</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose image view">
        {views.map((view) => (
          <button
            key={view.id}
            type="button"
            onClick={() => setActive(view.id)}
            disabled={!evidence?.[view.key]}
            aria-pressed={active === view.id}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 ${active === view.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >{view.label}</button>
        ))}
      </div>
      {evidenceLoading && <p className="mt-2 text-xs text-slate-500" aria-live="polite">Loading model explanation images. The original scan is available now.</p>}

      <div className="mt-4 flex min-h-[270px] items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
        {imageUrl ? (
          <img src={imageUrl} alt={`${selected.label} of the analyzed skin image`} className="max-h-[440px] w-full object-contain" />
        ) : (
          <div className="px-6 py-10 text-center">
            <ImageIcon size={44} className="mx-auto text-slate-400" aria-hidden="true" />
            <p className="mt-3 font-medium text-slate-700">{evidenceLoading ? "Preparing visual evidence…" : "Visual evidence is unavailable"}</p>
            <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">{evidenceLoading ? "The original scan is available while explanation images load." : "No Grad-CAM files were returned for this prediction. No heatmap has been simulated."}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
        <Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>Grad-CAM highlights image regions that influenced the model output. It is an explanation aid and does not confirm that a lesion is present in a highlighted area.</p>
      </div>
    </section>
  );
};

export default ExplainableAI;
