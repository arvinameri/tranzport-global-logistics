import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";
import AboutHero from "@/components/about-tranzport/AboutHero";
import AboutTrustedBy from "@/components/about-tranzport/AboutTrustedBy";
import AboutOurFocus from "@/components/about-tranzport/AboutOurFocus";
import AboutMissionValues from "@/components/about-tranzport/AboutMissionValues";
import { AppLocale, locales } from "@/i18nConfig";

type AboutTranzportPageProps = {
  params: Promise<{ lang: string }>;
};

function getFooterContent(lang: AppLocale) {
  const content = {
    en: {
      titleLine1: "Ready to Move Cargo?",
      titleLine2: "",
      description:
        "Contact our logistics specialists today and get a personalized shipping solution for your business. Fast, secure, and reliable logistics start here.",
    },
    fa: {
      titleLine1: "آماده جابه‌جایی بار هستید؟",
      titleLine2: "",
      description:
        "همین امروز با متخصصان لجستیک ما تماس بگیرید و یک راهکار حمل‌ونقل اختصاصی برای کسب‌وکار خود دریافت کنید. لجستیک سریع، امن و قابل اعتماد از همین‌جا آغاز می‌شود.",
    },
    ar: {
      titleLine1: "هل أنتم مستعدون لنقل شحنتكم؟",
      titleLine2: "",
      description:
        "تواصلوا اليوم مع خبراء الخدمات اللوجستية لدينا واحصلوا على حل شحن مخصص لأعمالكم. الخدمات اللوجستية السريعة والآمنة والموثوقة تبدأ من هنا.",
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

export default async function AboutTranzportPage({
  params,
}: AboutTranzportPageProps) {
  const { lang } = await params;

  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const footerContent = getFooterContent(safeLang);

  return (
    <main dir="ltr" className="relative min-h-screen w-full bg-[#07071C]">
      <Header lang={safeLang} />

      <AboutHero lang={safeLang} />

      <AboutTrustedBy lang={safeLang} />

      <AboutOurFocus lang={safeLang} />

      <AboutMissionValues lang={safeLang} />

      <FooterCTA
        lang={safeLang}
        titleLine1={footerContent.titleLine1}
        titleLine2={footerContent.titleLine2}
        description={footerContent.description}
      />
    </main>
  );
}
