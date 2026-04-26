"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { CloseIcon } from "./icons";

interface BoostModalProps {
  product: Product | null;
  onClose: () => void;
}

const BUDGET_OPTIONS = [
  {
    amount: 50,
    label: "Starter",
    description: "Boost for 3 days · ~500 extra views",
  },
  {
    amount: 100,
    label: "Growth",
    description: "Boost for 7 days · ~1 200 extra views",
  },
  {
    amount: 200,
    label: "Pro",
    description: "Boost for 14 days · ~3 000 extra views",
  },
] as const;

type BudgetAmount = (typeof BUDGET_OPTIONS)[number]["amount"];

function productGradient(hex: string): string {
  return `radial-gradient(ellipse at 50% 60%, ${hex}33 0%, ${hex}11 40%, #ece9e2 70%)`;
}

export function BoostModal({ product, onClose }: BoostModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedBudget, setSelectedBudget] = useState<BudgetAmount | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;
    // Reset state each time a new product is opened
    setStep(1);
    setSelectedBudget(null);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const firstColor = product.colors[0];
  const imageSrc = firstColor.image;
  const showImage = imageSrc.startsWith("/images/");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-white w-full max-w-md z-10 outline-none overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:opacity-60 transition-opacity z-10"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Step indicator */}
        <div className="flex gap-1 p-4 pb-0">
          {([1, 2, 3] as const).map((n) => (
            <div
              key={n}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors duration-300",
                step >= n ? "bg-charcoal" : "bg-black/10"
              )}
            />
          ))}
        </div>

        {/* ── Step 1: Confirm product ── */}
        {step === 1 && (
          <div className="p-6 flex flex-col gap-5">
            <div>
              <p className="text-label mb-1">Step 1 of 3</p>
              <h2 className="text-lg font-medium text-charcoal">Boost this product</h2>
              <p className="text-[13px] text-warm-gray mt-1">
                Promote your listing to reach more shoppers across FashionHero.
              </p>
            </div>

            {/* Product preview */}
            <div className="flex items-center gap-4 p-3 border border-black/8 rounded-lg bg-cream-light">
              <div
                className="w-16 h-16 flex-shrink-0 rounded overflow-hidden"
                style={{ background: productGradient(firstColor.hex) }}
              >
                {showImage ? (
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-charcoal leading-tight truncate">
                  {product.name}
                </p>
                <p className="text-[13px] text-warm-gray mt-0.5">{product.price} PLN</p>
              </div>
            </div>

            <button
              className="btn-cta w-full"
              onClick={() => setStep(2)}
            >
              Choose Budget →
            </button>
          </div>
        )}

        {/* ── Step 2: Choose budget ── */}
        {step === 2 && (
          <div className="p-6 flex flex-col gap-5">
            <div>
              <p className="text-label mb-1">Step 2 of 3</p>
              <h2 className="text-lg font-medium text-charcoal">Select your budget</h2>
              <p className="text-[13px] text-warm-gray mt-1">
                Choose how much you&apos;d like to invest in this boost.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {BUDGET_OPTIONS.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => setSelectedBudget(option.amount)}
                  className={cn(
                    "w-full text-left p-4 border rounded-lg transition-all duration-150",
                    selectedBudget === option.amount
                      ? "border-charcoal bg-charcoal text-white"
                      : "border-black/10 bg-white hover:border-charcoal/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium">{option.label}</span>
                    <span className="text-[16px] font-semibold">{option.amount} PLN</span>
                  </div>
                  <p
                    className={cn(
                      "text-[12px] mt-0.5",
                      selectedBudget === option.amount ? "text-white/70" : "text-warm-gray"
                    )}
                  >
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <button
              className="btn-cta w-full disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={selectedBudget === null}
              onClick={() => setStep(3)}
            >
              Confirm Boost
            </button>

            <button
              className="text-center text-[12px] font-medium uppercase tracking-[0.5px] text-charcoal underline underline-offset-4 hover:opacity-60 transition-opacity"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </div>
        )}

        {/* ── Step 3: Confirmation ── */}
        {step === 3 && (
          <div className="p-6 flex flex-col items-center gap-5 text-center">
            {/* Checkmark */}
            <div className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center mt-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div>
              <p className="text-label mb-1">Step 3 of 3</p>
              <h2 className="text-lg font-medium text-charcoal">Boost activated!</h2>
              <p className="text-[13px] text-warm-gray mt-1">
                Your listing will appear prominently for shoppers over the next boost period.
              </p>
            </div>

            <div className="w-full p-4 border border-black/8 rounded-lg bg-cream-light text-left space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-warm-gray">Product</span>
                <span className="text-charcoal font-medium truncate max-w-[60%] text-right">
                  {product.name}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-warm-gray">Budget</span>
                <span className="text-charcoal font-medium">{selectedBudget} PLN</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-warm-gray">Duration</span>
                <span className="text-charcoal font-medium">
                  {selectedBudget === 50
                    ? "3 days"
                    : selectedBudget === 100
                    ? "7 days"
                    : "14 days"}
                </span>
              </div>
            </div>

            <button className="btn-cta w-full" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
