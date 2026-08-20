import { useEffect } from "react";
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

export default function Landing() {
  useEffect(() => {
    const html = document.documentElement;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const previousPage = html.dataset.page;
    const previousThemeColor = themeColor?.getAttribute("content") ?? null;

    html.dataset.page = "landing";
    themeColor?.setAttribute("content", "#ffffff");

    return () => {
      if (previousPage === undefined) {
        delete html.dataset.page;
      } else {
        html.dataset.page = previousPage;
      }
      if (previousThemeColor !== null) {
        themeColor?.setAttribute("content", previousThemeColor);
      }
    };
  }, []);

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
