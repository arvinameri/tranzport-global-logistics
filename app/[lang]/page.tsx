import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import MapSection from "@/components/home/MapSection";
import CoreSolutions from "@/components/home/CoreSolutions";
import ShippingCTA from "@/components/home/ShippingCTA";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import { normalizeLocale } from "@/i18nConfig";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLocale(rawLang);

  return (
    <main className="relative min-h-screen w-full bg-brand-dark selection:bg-[#00FF85] selection:text-brand-dark">
      <Header lang={lang} />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <MapSection lang={lang} />
      <CoreSolutions lang={lang} />
      <ShippingCTA lang={lang} />
      <CaseStudies lang={lang} />
      <FooterCTA lang={lang} />
    </main>
  );
}
