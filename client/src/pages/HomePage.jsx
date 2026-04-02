import { CategoryShowcase } from '../components/home/CategoryShowcase.jsx';
import { CtaBanner } from '../components/home/CtaBanner.jsx';
import { HeroSection } from '../components/home/HeroSection.jsx';
import { InstagramGallery } from '../components/home/InstagramGallery.jsx';
import { NewDropsSection } from '../components/home/NewDropsSection.jsx';
import { TestimonialsSection } from '../components/home/TestimonialsSection.jsx';
import { TrendingSection } from '../components/home/TrendingSection.jsx';
import { WhyUsSection } from '../components/home/WhyUsSection.jsx';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <NewDropsSection />
      <TrendingSection />
      <WhyUsSection />
      <InstagramGallery />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
