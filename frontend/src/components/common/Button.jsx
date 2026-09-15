const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        duration-200
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;