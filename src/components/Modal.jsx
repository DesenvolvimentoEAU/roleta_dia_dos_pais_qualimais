export default function Modal({ open, onClose, children, size = "md" }) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#000000]/85 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6 lg:items-center">
      <div
        className={[
          "relative w-full max-h-[calc(100vh-2rem)] rounded-[1.5rem] border border-[#FFFFFF]/10 bg-[#050505]/95 text-[#FFFFFF] shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:rounded-[2rem]",
          sizes[size]
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#FFFFFF]/15 bg-[#000000]/50 text-2xl text-[#FFFFFF] backdrop-blur-xl transition hover:bg-[#FFFFFF]/20 sm:right-4 sm:top-4"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}