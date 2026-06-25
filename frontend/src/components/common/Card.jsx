// ===============================
// Component
// ===============================

const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-2xl
        bg-white
        border
        border-slate-200
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// ===============================
// Export
// ===============================

export default Card;