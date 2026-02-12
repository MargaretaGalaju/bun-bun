'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { TopCategories } from '@/components/home/TopCategories';
import { PromoCards } from '@/components/home/PromoCards';
import { AboutSection } from '@/components/home/AboutSection';
import { PopularProducts } from '@/components/home/PopularProducts';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { TrustBadges } from '@/components/home/TrustBadges';
import { DeliveryScheduleBanner } from '@/components/home/DeliveryScheduleBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FarmersSection } from '@/components/home/FarmersSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { SeasonalProducts } from '@/components/home/SeasonalProducts';
import { AppDownloadSection } from '@/components/home/AppDownloadSection';
import { FAQSection } from '@/components/home/FAQSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <TopCategories />
      <PromoCards />
      <AboutSection />
      <PopularProducts />
      <NewsletterBanner />
      <TrustBadges />
      <DeliveryScheduleBanner />
      <CategoryGrid />
      <FarmersSection />
      <CommunitySection />
      <ReviewsCarousel />
      <SeasonalProducts />
      <AppDownloadSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
