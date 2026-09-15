const RISK_STYLES = {
  Low: "bg-green-100 text-green-700",

  Medium: "bg-amber-100 text-amber-700",

  High: "bg-red-100 text-red-700",
};

const RiskBadge = ({ risk }) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          RISK_STYLES[risk] ??
          "bg-slate-100 text-slate-700"
        }
      `}
    >
      {risk} Risk
    </span>
  );
};

export default RiskBadge;