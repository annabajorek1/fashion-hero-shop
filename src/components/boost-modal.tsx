"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface BoostModalProps {
  onActivate: () => void;
  onClose: () => void;
}

export function BoostModal({ onActivate, onClose }: BoostModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md mx-0 sm:mx-4 p-6 flex flex-col gap-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-label text-warm-gray">Dla nowych sprzedawców</span>
            <h2 className="text-xl font-normal text-charcoal mt-1">Boost widoczności</h2>
          </div>
          <button
            onClick={onClose}
            className="text-warm-gray hover:text-charcoal transition-colors mt-1 text-xl leading-none"
            aria-label="Zamknij"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-warm-gray leading-relaxed">
          Twoje produkty pojawią się w sekcji <strong className="text-charcoal">„Nowi sprzedawcy"</strong> na stronie głównej FashionHero — widocznej dla wszystkich kupujących.
        </p>

        <ul className="flex flex-col gap-3">
          {[
            'Twoje produkty w sekcji „Nowi sprzedawcy” na stronie głównej',
            'Widoczność dla 2,4 mln kupujących odwiedzających FashionHero',
            'Bezpłatnie przez pierwsze 90 dni na platformie',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
              <span className="mt-0.5 text-charcoal">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={onActivate}
            className="btn-cta w-full py-3 text-sm"
          >
            Aktywuj boost widoczności
          </button>
          <button
            onClick={onClose}
            className={cn(
              "w-full py-3 text-sm text-warm-gray hover:text-charcoal transition-colors"
            )}
          >
            Może później
          </button>
        </div>
      </div>
    </div>
  );
}
