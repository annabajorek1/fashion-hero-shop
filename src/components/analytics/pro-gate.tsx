import { cn } from "@/lib/utils";

interface ProGateProps {
  isPro: boolean;
  onUpgrade: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ProGate({ isPro, onUpgrade, children, className }: ProGateProps) {
  if (isPro) return <div className={className}>{children}</div>;

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <div className="pointer-events-none select-none" style={{ filter: "blur(5px)" }}>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-white/70 backdrop-blur-[2px]">
        <div className="text-center">
          <p className="text-[11px] text-label mb-1">Tylko dla subskrybentów</p>
          <p className="text-sm font-medium text-charcoal">
            Dostępne w planie Pro — 99 PLN/mies.
          </p>
        </div>
        <button
          onClick={onUpgrade}
          className="btn-cta px-5 py-2 text-[12px]"
        >
          Odblokuj
        </button>
      </div>
    </div>
  );
}
