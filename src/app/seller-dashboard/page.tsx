"use client";

import { useState } from "react";
import Image from "next/image";
import { getAllSellers } from "@/data/sellers";
import { getProductsBySeller } from "@/data/products";
import type { Product } from "@/types";
import { BoostModal } from "@/components/boost-modal";
import { cn } from "@/lib/utils";

function productGradient(hex: string): string {
  return `radial-gradient(ellipse at 50% 60%, ${hex}33 0%, ${hex}11 40%, #ece9e2 70%)`;
}

export default function SellerDashboardPage() {
  const seller = getAllSellers()[0]; // Demo: UrbanEdge
  const products = getProductsBySeller(seller.slug);
  const [boostProduct, setBoostProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Page header */}
      <div className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
          <p className="text-label mb-1">Seller Dashboard</p>
          <h1 className="text-2xl font-medium text-charcoal">{seller.name}</h1>
          <p className="text-[13px] text-warm-gray mt-1">{seller.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <Stat label="Products" value={String(products.length)} />
            <div className="w-px h-8 bg-black/10" />
            <Stat label="Rating" value={seller.rating > 0 ? `${seller.rating} ★` : "—"} />
            <div className="w-px h-8 bg-black/10" />
            <Stat label="Member since" value={String(seller.joinedYear)} />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-medium text-charcoal">My Products</h2>
          <span className="text-[12px] text-warm-gray">{products.length} listings</span>
        </div>

        {products.length === 0 ? (
          <p className="text-[14px] text-warm-gray py-12 text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <SellerProductCard
                key={product.id}
                product={product}
                onBoost={() => setBoostProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

      <BoostModal product={boostProduct} onClose={() => setBoostProduct(null)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-warm-gray uppercase tracking-[0.5px]">{label}</p>
      <p className="text-[14px] font-medium text-charcoal mt-0.5">{value}</p>
    </div>
  );
}

function SellerProductCard({
  product,
  onBoost,
}: {
  product: Product;
  onBoost: () => void;
}) {
  const firstColor = product.colors[0];
  const imageSrc = firstColor.image;
  const showImage = imageSrc.startsWith("/images/");

  const badgeLabel: Record<string, string> = {
    new: "NEW",
    "new-color": "NEW COLOR",
    bestseller: "BESTSELLER",
    sale: "SALE",
  };

  return (
    <div className="bg-white border border-black/8 overflow-hidden flex flex-col">
      {/* Product image */}
      <div
        className="relative aspect-square"
        style={{ background: productGradient(firstColor.hex) }}
      >
        {showImage ? (
          <Image
            src={imageSrc}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-charcoal text-white text-[10px] font-medium uppercase tracking-[0.5px] px-2 py-0.5 rounded-full">
            {badgeLabel[product.badge]}
          </span>
        )}
      </div>

      {/* Product info + action */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex-1">
          <p className="text-[13px] font-medium text-charcoal leading-tight line-clamp-2">
            {product.name}
          </p>
          <p className="text-[12px] text-warm-gray mt-0.5">{product.price} PLN</p>
        </div>

        <button
          onClick={onBoost}
          className={cn(
            "w-full py-2 text-[11px] font-medium uppercase tracking-[0.5px] rounded-full border border-charcoal text-charcoal",
            "hover:bg-charcoal hover:text-white transition-colors duration-150"
          )}
        >
          Boost this product
        </button>
      </div>
    </div>
  );
}
