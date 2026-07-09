import { useState } from "react";

//import DashboardLayout from "../components/layout/DashboardLayout";

import UploadCard from "../components/prediction/UploadCard";
import ProcessingLoader from "../components/prediction/ProcessingLoader";
import ResultCard from "../components/prediction/ResultCard";
import ExplainableAI from "../components/prediction/ExplainableAI";
import RecommendationPanel from "../components/prediction/RecommendationPanel";

import {
  Upload,
  Brain,
  CheckCircle2,
  Image as ImageIcon,
  Info,
  Camera,
  Sun,
  ScanLine,
} from "lucide-react";

const PAGE_STATE = {
  UPLOAD: "upload",
  PROCESSING: "processing",
  RESULT: "result",
};

const LesionTrackerPage = () => {
  /**
   * -------------------------------------------------------
   * Temporary page state
   *
   * Replace these transitions later with actual API calls.
   * Business logic intentionally untouched.
   * -------------------------------------------------------
   */

  const [pageState, setPageState] = useState(PAGE_STATE.UPLOAD);

  const handleAnalyze = () => {
    setPageState(PAGE_STATE.PROCESSING);

    // Temporary demo

    setTimeout(() => {
      setPageState(PAGE_STATE.RESULT);
    }, 4000);
  };

  const handleAnalyzeAnother = () => {
    setPageState(PAGE_STATE.UPLOAD);
  };

  return (

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* =======================================================
            PAGE HEADER
        ======================================================= */}

        <header>

          <div className="flex items-start gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

              {pageState === PAGE_STATE.UPLOAD && (
                <Upload className="text-blue-600" size={30} />
              )}

              {pageState === PAGE_STATE.PROCESSING && (
                <Brain className="text-blue-600" size={30} />
              )}

              {pageState === PAGE_STATE.RESULT && (
                <CheckCircle2
                  className="text-green-600"
                  size={30}
                />
              )}

            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                AI Skin Lesion Tracker
              </h1>

              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
                Upload a skin lesion image to receive an AI-powered
                dermatology analysis, explainable insights and
                personalized medical recommendations.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  JPG
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  PNG
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  JPEG
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  Max 10 MB
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* =======================================================
            UPLOAD STATE
        ======================================================= */}

        {pageState === PAGE_STATE.UPLOAD && (

          <div className="grid gap-6 lg:grid-cols-8">

            {/* Upload */}

            <div className="lg:col-span-5">

              <UploadCard
                onAnalyze={handleAnalyze}
              />

            </div>

            {/* Tips */}

            <div className="space-y-6 lg:col-span-3">

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                <div className="flex items-center gap-3">

                  <Info
                    size={26}
                    className="text-blue-600"
                  />

                  <div>

                    <h2 className="text-xl font-bold text-slate-800">
                      Scan Preparation Tips
                    </h2>

                    <p className="text-sm text-slate-500">
                      Improve prediction quality.
                    </p>

                  </div>

                </div>

                <div className="mt-8 space-y-5">

                  <div className="flex items-start gap-3">

                    <Sun
                      size={20}
                      className="mt-1 text-amber-500"
                    />

                    <div>

                      <h3 className="font-semibold">
                        Good Lighting
                      </h3>

                      <p className="text-sm text-slate-500">
                        Use bright natural lighting whenever
                        possible.
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <Camera
                      size={20}
                      className="mt-1 text-blue-600"
                    />

                    <div>

                      <h3 className="font-semibold">
                        Whole Lesion Visible
                      </h3>

                      <p className="text-sm text-slate-500">
                        Ensure the complete lesion appears in
                        the image.
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <ScanLine
                      size={20}
                      className="mt-1 text-green-600"
                    />

                    <div>

                      <h3 className="font-semibold">
                        Sharp Focus
                      </h3>

                      <p className="text-sm text-slate-500">
                        Avoid blurry or low-resolution photos.
                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <ImageIcon
                      size={20}
                      className="mt-1 text-purple-600"
                    />

                    <div>

                      <h3 className="font-semibold">
                        Neutral Background
                      </h3>

                      <p className="text-sm text-slate-500">
                        Remove unnecessary objects around the
                        lesion.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* =======================================================
            PROCESSING STATE
        ======================================================= */}

        {pageState === PAGE_STATE.PROCESSING && (

          <div className="mx-auto max-w-3xl">

            <ProcessingLoader />

            <div className="mt-8 text-center">

              <p className="text-lg font-medium text-slate-700">
                DermAssist AI is carefully analyzing your
                image.
              </p>

              <p className="mt-3 text-slate-500">
                This usually takes between 5–10 seconds.
                Please keep this page open while the
                prediction is generated.
              </p>

            </div>

          </div>

        )}

        {/* =======================================================
            RESULT STATE
        ======================================================= */}

        {pageState === PAGE_STATE.RESULT && (

          <div className="space-y-6">

            {/* Result */}

            <ResultCard />

            {/* Lower Grid */}

            <div className="grid gap-6 xl:grid-cols-12">

              <div className="xl:col-span-7">

                <ExplainableAI />

              </div>

              <div className="xl:col-span-5">

                <RecommendationPanel />

              </div>

            </div>

            {/* Analyze Again */}

            <div className="flex justify-center pt-4">

              <button
                onClick={handleAnalyzeAnother}
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Analyze Another Image
              </button>

            </div>

          </div>

        )}

      </div>
  )
};

export default LesionTrackerPage;