import { ShieldAlert, Info } from "lucide-react";

const ReportDisclaimer = () => {
  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">

      <div className="flex items-start gap-4">

        <div className="rounded-2xl bg-amber-100 p-3">

          <ShieldAlert className="h-6 w-6 text-amber-700" />

        </div>

        <div>

          <h2 className="text-xl font-bold text-amber-800">
            Medical Disclaimer
          </h2>

          <p className="mt-3 leading-7 text-amber-900">

            This report has been generated using artificial intelligence
            to assist in the early assessment of skin lesions. The
            prediction is based solely on the uploaded image and should
            not be considered a confirmed medical diagnosis.

          </p>

          <p className="mt-4 leading-7 text-amber-900">

            Always consult a qualified dermatologist for clinical
            examination, diagnosis, biopsy (when necessary), and
            treatment planning. If you notice rapid changes in size,
            shape, color, bleeding, itching, or pain, seek medical
            attention immediately.

          </p>

        </div>

      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-4">

        <Info className="mt-1 h-5 w-5 text-sky-600" />

        <p className="text-sm leading-6 text-slate-600">

          DermAssist AI is designed as a clinical decision support
          tool to help users and healthcare professionals interpret
          skin lesion images. It is not a substitute for professional
          medical advice, diagnosis, or treatment.

        </p>

      </div>

    </section>
  );
};

export default ReportDisclaimer;