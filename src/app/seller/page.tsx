"use client";

import { useState, useRef } from "react";
import { getSeller, getDaysOnPlatform, isNewSeller } from "@/data/sellers";
import { getProductsBySeller } from "@/data/products";
import { useBoost } from "@/components/boost-provider";
import { BoostModal } from "@/components/boost-modal";
import { ProductCard } from "@/components/product-card";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const DEMO_SELLER_SLUG = "kasia-creates";

export default function SellerPage() {
  const seller = getSeller(DEMO_SELLER_SLUG)!;
  const daysOnPlatform = getDaysOnPlatform(seller);
  const eligible = isNewSeller(seller);
  const boostDeadlineDays = 90 - daysOnPlatform;

  const { boostedSellerIds, activateBoost } = useBoost();
  const boostActive = boostedSellerIds.has(seller.id);

  const [showModal, setShowModal] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const sellerProducts = getProductsBySeller(DEMO_SELLER_SLUG);

  function handleActivate() {
    activateBoost(seller.id);
    setShowModal(false);
  }

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  }

  return (
    <>
      <main className="min-h-screen bg-[#ece9e2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-6">

          {/* Header */}
          <div>
            <p className="text-label mb-1">Panel sprzedawcy</p>
            <h1 className="text-2xl md:text-3xl font-normal text-charcoal">
              {seller.name}
            </h1>
            <p className="text-sm text-warm-gray mt-1">
              Na platformie od {daysOnPlatform} dni
            </p>
          </div>

          {/* New seller boost banner */}
          {eligible && !boostActive && (
            <div className="bg-charcoal text-white rounded-xl px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-label text-white/60 mb-1">Dostępne dla nowych sprzedawców</p>
                <p className="font-medium text-base">
                  Jesteś nowym sprzedawcą — masz dostęp do bezpłatnego boostu widoczności
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Ta opcja jest dostępna przez pierwsze 90 dni na platformie.
                  Pozostało Ci jeszcze <strong className="text-white">{boostDeadlineDays} dni</strong>.
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-charcoal font-medium text-sm px-5 py-3 rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Aktywuj boost widoczności
              </button>
            </div>
          )}

          {/* Confirmation after activation */}
          {boostActive && (
            <div className="bg-white border border-[#cdcdcd] rounded-xl px-5 py-5">
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-0.5">✓</div>
                <div>
                  <p className="font-medium text-charcoal">Boost widoczności aktywny</p>
                  <p className="text-sm text-warm-gray mt-1">
                    Twoje produkty są teraz widoczne w sekcji{" "}
                    <strong className="text-charcoal">„Nowi sprzedawcy"</strong>{" "}
                    na stronie głównej FashionHero.
                    {eligible && (
                      <> Boost obowiązuje przez pierwsze 90 dni — zostało <strong className="text-charcoal">{boostDeadlineDays} dni</strong>.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Products carousel */}
          <div className="bg-white border border-[#cdcdcd] rounded-xl px-5 py-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-label text-warm-gray mb-0.5">Twoje produkty</p>
                <p className="text-sm text-charcoal font-medium">{sellerProducts.length} produktów</p>
              </div>
              {boostActive && (
                <span className="text-[11px] font-medium uppercase tracking-wide bg-charcoal text-white px-2.5 py-1 rounded-full">
                  Boost aktywny
                </span>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white hover:bg-[#ece9e2] rounded-full p-1.5 shadow-sm hidden md:flex items-center justify-center border border-[#cdcdcd]"
                aria-label="Przewiń w lewo"
              >
                <ChevronLeftIcon />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
              >
                {sellerProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="min-w-[200px] max-w-[200px] flex-shrink-0"
                  />
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white hover:bg-[#ece9e2] rounded-full p-1.5 shadow-sm hidden md:flex items-center justify-center border border-[#cdcdcd]"
                aria-label="Przewiń w prawo"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>

        </div>
      </main>

      {showModal && (
        <BoostModal
          onActivate={handleActivate}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
