import { HeroCarousel } from "@/components/sections/hero-carousel";
import { CategoryRow } from "@/components/sections/category-row";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { NewSellers } from "@/components/sections/new-sellers";
import { FeatureStory } from "@/components/sections/feature-story";
import { PromoTiles } from "@/components/sections/promo-tiles";
import { ValueProps } from "@/components/sections/value-props";

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <CategoryRow />
      <ProductCarousel />
      <NewSellers />
      <FeatureStory />
      <PromoTiles />
      <ValueProps />
    </main>
  );
}
