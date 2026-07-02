import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";
import CorpacIntroGrid from "@/components/about-corpac-group/CorpacIntroGrid";
import CorpacHero from "@/components/about-corpac-group/CorpacHero";
import CorpacCommitment from "@/components/about-corpac-group/CorpacCommitment";
import CorpacWhyChoose from "@/components/about-corpac-group/CorpacWhyChoose";
import { AppLocale, locales } from "@/i18nConfig";

type PageProps = {
  params: Promise<{ lang: string }>;
};

type FooterHeroContent = {
  titleLine1: string;
  titleLine2: string;
  description: string;
};

function getFooterHeroContent(lang: string): FooterHeroContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, FooterHeroContent> = {
    en: {
      titleLine1: "Need to Move Your Cargo",
      titleLine2: "with Confidence?",
      description:
        "Connect with our logistics specialists today and receive a tailored solution designed around your supply chain, timelines, and operational priorities.",
    },
    fa: {
      titleLine1: "برای جابه‌جایی محموله‌ات",
      titleLine2: "به یک راهکار مطمئن نیاز داری؟",
      description:
        "همین امروز با متخصصان لجستیک ما ارتباط بگیر و یک راهکار اختصاصی متناسب با زنجیره تأمین، زمان‌بندی و اولویت‌های عملیاتی کسب‌وکارت دریافت کن.",
    },
    ar: {
      titleLine1: "هل تحتاج إلى نقل شحنتك",
      titleLine2: "بأعلى مستوى من الثقة؟",
      description:
        "تواصل اليوم مع خبراء الخدمات اللوجستية لدينا واحصل على حل مخصص يتوافق مع سلسلة الإمداد الخاصة بك والجداول الزمنية وأولوياتك التشغيلية.",
    },
  };

  return content[safeLang];
}

export default async function AboutCorpacGroupPage({ params }: PageProps) {
  const { lang } = await params;
  const footerHeroContent = getFooterHeroContent(lang);

  return (
    <main className="relative min-h-screen w-full bg-[#07071C]" dir="ltr">
      <Header lang={lang} />

      <CorpacIntroGrid lang={lang} />

      <CorpacHero lang={lang} />

      <CorpacWhyChoose lang={lang} />

      <CorpacCommitment lang={lang} />

      <FooterCTA
        lang={lang}
        titleLine1={footerHeroContent.titleLine1}
        titleLine2={footerHeroContent.titleLine2}
        description={footerHeroContent.description}
      />
    </main>
  );
}
