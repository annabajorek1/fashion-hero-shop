"use client";

import { useRef } from "react";
import { products } from "@/data/products";
import { useBoost } from "@/components/boost-provider";
import { ProductCard } from "@/components/product-card";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export function NewSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { boostedSellerIds } = useBoost();
  const boostedProducts = products.filter((p) => boostedSellerIds.has(p.sellerId));

  if (boostedProducts.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 bg-[#ece9e2]">
      <div className="px-4 md:px-8 lg:px-12 mb-6 flex flex-col items-center text-center">
        <span className="text-label text-warm-gray mb-2">Świeże odkrycia</span>
        <h2 className="text-[40px] font-normal text-charcoal">
          Nowi sprzedawcy
        </h2>
        <p className="text-sm text-warm-gray mt-2 max-w-sm">
          Odkryj produkty od sprzedawców, którzy właśnie dołączyli do FashionHero.
        </p>
      </div>

      <div className="relative px-4 md:px-8 lg:px-12">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex items-center justify-center"
          aria-label="Przewiń w lewo"
        >
          <ChevronLeftIcon />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {boostedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="min-w-[220px] max-w-[220px] flex-shrink-0"
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex items-center justify-center"
          aria-label="Przewiń w prawo"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
}
