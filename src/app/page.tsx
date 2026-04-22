import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import {
  ProblemSection,
  ProofSection,
  HowItWorksSection,
  UseCasesSection,
  PassDemoSection,
  BenefitsSection,
  ComparisonSection,
  TestimonialSection,
  PricingSection,
  FAQSection,
  FinalCTASection,
  Footer,
} from '@/components/landing/Sections';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <div className="divider-gradient" />
      <ProblemSection />
      <ProofSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PassDemoSection />
      <div className="divider-gradient" />
      <BenefitsSection />
      <ComparisonSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
