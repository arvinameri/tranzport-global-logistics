import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";
import ContactHero from "@/components/contact/ContactHero";
import { AppLocale, locales } from "@/i18nConfig";

export const metadata = {
  title: "Contact Baharan | Logistics & Freight Solutions",
  description:
    "Get in touch with Baharan for global freight coordination and full logistics strategy.",
};

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

function getFooterContent(lang: AppLocale) {
  const content = {
    en: {
      titleLine1: "Let's Move Your",
      titleLine2: "Business Forward",
      description:
        "Whether you need global freight coordination or a full logistics strategy, our team is ready to deliver.",
    },
    fa: {
      titleLine1: "کسب‌وکار خود را",
      titleLine2: "به جلو حرکت دهید",
      description:
        "چه به هماهنگی حمل‌ونقل جهانی نیاز داشته باشید و چه یک استراتژی جامع لجستیک، تیم ما برای ارائه بهترین خدمات آماده است.",
    },
    ar: {
      titleLine1: "لندفع عملك",
      titleLine2: "إلى الأمام معاً",
      description:
        "سواء كنت بحاجة إلى تنسيق الشحن العالمي أو استراتيجية لوجستية كاملة، فريقنا مستعد لتقديم أفضل الحلول.",
    },
  } satisfies Record<
    AppLocale,
    {
      titleLine1: string;
      titleLine2: string;
      description: string;
    }
  >;

  return content[lang];
}

export default async function ContactRoutePage({ params }: ContactPageProps) {
  const { lang } = await params;

  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const footerContent = getFooterContent(safeLang);

  return (
    <main className="relative min-h-screen w-full bg-[#0a0e1a]">
      <Header lang={safeLang} />

      <ContactHero lang={safeLang} />

      <FooterCTA
        lang={safeLang}
        titleLine1={footerContent.titleLine1}
        titleLine2={footerContent.titleLine2}
        description={footerContent.description}
      />
    </main>
  );
}
