export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-[#395BA7] text-[#FFFFFF] shadow-[0_18px_50px_rgba(57,91,167,0.38)] hover:-translate-y-1 hover:bg-[#4C73CA] hover:shadow-[0_24px_70px_rgba(57,91,167,0.5)]",
    secondary:
      "border border-[#FFFFFF]/20 bg-[#FFFFFF]/10 text-[#FFFFFF] backdrop-blur-xl hover:bg-[#FFFFFF]/15 hover:-translate-y-1",
    light:
      "bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#DDE6FF] hover:-translate-y-1"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black uppercase tracking-[0.14em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
