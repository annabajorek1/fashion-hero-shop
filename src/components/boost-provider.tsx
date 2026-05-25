"use client";

import { createContext, useContext, useState } from "react";
import { sellers as initialSellers } from "@/data/sellers";

interface BoostContextValue {
  boostedSellerIds: Set<string>;
  activateBoost: (sellerId: string) => void;
}

const BoostContext = createContext<BoostContextValue | null>(null);

export function BoostProvider({ children }: { children: React.ReactNode }) {
  const [boostedSellerIds, setBoostedSellerIds] = useState<Set<string>>(
    () => new Set(initialSellers.filter((s) => s.boostActive).map((s) => s.id))
  );

  function activateBoost(sellerId: string) {
    setBoostedSellerIds((prev) => new Set([...prev, sellerId]));
  }

  return (
    <BoostContext.Provider value={{ boostedSellerIds, activateBoost }}>
      {children}
    </BoostContext.Provider>
  );
}

export function useBoost(): BoostContextValue {
  const ctx = useContext(BoostContext);
  if (!ctx) throw new Error("useBoost must be used inside BoostProvider");
  return ctx;
}
