import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";
import TechnologyHero from "@/components/technology/TechnologyHero";
import TechnologyPlatformGrid from "@/components/technology/TechnologyPlatformGrid";
import TechnologyWhyItMatters from "@/components/technology/TechnologyWhyItMatters";
import { AppLocale, normalizeLocale } from "@/i18nConfig";

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLocale(rawLang);
  const safeLang: AppLocale = lang;

  const footerTexts = {
    en: {
      title1: "Smarter Logistics",
      title2: "Through Technology",
      desc: "Talk to our experts today and see how BaharanGroup’s platform transforms visibility and control in your supply chain.",
    },
    fa: {
      title1: "لجستیک هوشمندتر",
      title2: "از طریق فناوری",
      desc: "همین امروز با کارشناسان ما صحبت کنید و ببینید پلتفرم گروه بهاران چگونه دید و کنترل را در زنجیره تامین شما متحول می‌کند.",
    },
    ar: {
      title1: "خدمات لوجستية أذكى",
      title2: "من خلال التكنولوجيا",
      desc: "تحدث إلى خبرائنا اليوم واكتشف كيف تعمل منصة مجموعة بهاران على تحويل الرؤية والتحكم في سلسلة التوريد الخاصة بك.",
    },
  };

  return (
    <main className="relative min-h-screen w-full bg-[#07071C]">
      <Header lang={lang} />
      <TechnologyHero lang={lang} />
      <TechnologyPlatformGrid lang={lang} />
      <TechnologyWhyItMatters lang={lang} />
      <FooterCTA
        lang={lang}
        titleLine1={footerTexts[safeLang].title1}
        titleLine2={footerTexts[safeLang].title2}
        description={footerTexts[safeLang].desc}
      />
    </main>
  );
}
