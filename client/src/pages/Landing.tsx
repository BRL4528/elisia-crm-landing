import "@/landing/landing.css";
import { LandingHeader } from "@/landing/LandingHeader";
import { Hero } from "@/landing/Hero";
import { Features } from "@/landing/Features";
import { HowItWorks } from "@/landing/HowItWorks";
import { Pricing } from "@/landing/Pricing";
import { Faq } from "@/landing/Faq";
import { Contact } from "@/landing/Contact";
import { CtaBand } from "@/landing/CtaBand";
import { LandingFooter } from "@/landing/LandingFooter";
import { useLandingTheme } from "@/landing/useLandingTheme";

export default function Landing() {
  useLandingTheme();

  return (
    <div className="lp">
      <a className="skip" href="#top">
        Pular para o conteúdo
      </a>
      <LandingHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Contact />
      <CtaBand />
      <LandingFooter />
    </div>
  );
}
