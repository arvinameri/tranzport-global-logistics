import Header from "@/components/layout/Header";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import AirHero from "@/components/air-freight/AirHero";
import AirScrollStack from "@/components/air-freight/AirScrollStack";
import AirWhyChoose from "@/components/air-freight/AirWhyChoose";
import { AppLocale, locales } from "@/i18nConfig";

type AirFreightPageProps = {
  params: Promise<{ lang: string }>;
};

function getFooterContent(lang: AppLocale) {
  const content = {
    en: {
      titleLine1: "Need to Ship by Air?",
      titleLine2: "",
      description:
        "Contact our air freight specialists today and get a personalized shipping solution for your business. Fast, secure, and reliable air logistics start here.",
    },
    fa: {
      titleLine1: "نیاز به حمل هوایی دارید؟",
      titleLine2: "",
      description:
        "همین امروز با متخصصان حمل‌ونقل هوایی ما تماس بگیرید و یک راهکار اختصاصی متناسب با کسب‌وکار خود دریافت کنید. لجستیک هوایی سریع، امن و قابل اعتماد از همین‌جا آغاز می‌شود.",
    },
    ar: {
      titleLine1: "هل تحتاجون إلى الشحن الجوي؟",
      titleLine2: "",
      description:
        "تواصلوا اليوم مع خبراء الشحن الجوي لدينا واحصلوا على حل شحن مخصص لأعمالكم. الخدمات اللوجستية الجوية السريعة والآمنة والموثوقة تبدأ من هنا.",
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

export default async function AirFreightPage({ params }: AirFreightPageProps) {
  const { lang } = await params;

  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const footerContent = getFooterContent(safeLang);

  return (
    <main className="relative min-h-screen w-full bg-brand-dark" dir="ltr">
      <Header lang={safeLang} />
      <AirHero lang={safeLang} />
      <AirScrollStack lang={safeLang} />
      <AirWhyChoose lang={safeLang} />
      <CaseStudies lang={safeLang} />
      <FooterCTA
        lang={safeLang}
        titleLine1={footerContent.titleLine1}
        titleLine2={footerContent.titleLine2}
        description={footerContent.description}
      />
    </main>
  );
}
