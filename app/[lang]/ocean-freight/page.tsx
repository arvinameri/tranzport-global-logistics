// client/app/[lang]/ocean-freight/page.tsx
import Header from "@/components/layout/Header";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import OceanHero from "@/components/ocean-freight/OceanHero";
import OceanScrollStack from "@/components/ocean-freight/OceanScrollStack";
import OceanWhyChoose from "@/components/ocean-freight/OceanWhyChoose";
import { AppLocale, normalizeLocale } from "@/i18nConfig";

export default async function OceanFreightPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLocale(rawLang);
  const safeLang: AppLocale = lang;

  const footerTexts = {
    en: {
      title1: "Ready to Ship Your Cargo?",
      title2: "",
      desc: "Contact our ocean freight specialists today and get a tailored shipping plan for your business. Reliable, efficient, and stress-free ocean shipping starts here.",
    },
    fa: {
      title1: "آماده ارسال بار خود هستید؟",
      title2: "",
      desc: "همین امروز با متخصصان حمل و نقل دریایی ما تماس بگیرید و یک برنامه حمل و نقل اختصاصی برای کسب و کار خود دریافت کنید. حمل و نقل دریایی مطمئن، کارآمد و بدون استرس از اینجا شروع می‌شود.",
    },
    ar: {
      title1: "جاهز لشحن بضائعك؟",
      title2: "",
      desc: "اتصل بمتخصصي الشحن البحري لدينا اليوم واحصل على خطة شحن مخصصة لعملك. الشحن البحري الموثوق والفعال والخالي من التوتر يبدأ من هنا.",
    },
  };

  return (
    <main className="relative min-h-screen w-full bg-brand-dark">
      <Header lang={lang} />
      <OceanHero lang={lang} />
      <OceanScrollStack lang={lang} />
      <OceanWhyChoose lang={lang} />
      <CaseStudies lang={lang} />
      <FooterCTA
        lang={lang}
        titleLine1={footerTexts[safeLang].title1}
        titleLine2={footerTexts[safeLang].title2}
        description={footerTexts[safeLang].desc}
      />
    </main>
  );
}
