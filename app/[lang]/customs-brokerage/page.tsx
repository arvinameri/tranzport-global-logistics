import Header from "@/components/layout/Header";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import CustomsHero from "@/components/customs-brokerage/CustomsHero";
import CustomsCoreServices from "@/components/customs-brokerage/CustomsCoreServices";
import CustomsWhyChoose from "@/components/customs-brokerage/CustomsWhyChoose";
import { AppLocale, locales } from "@/i18nConfig";

function getPageContent(lang: AppLocale) {
  const content = {
    en: {
      footerTitle1: "Ready for stress-",
      footerTitle2: "free customs clearance?",
      footerDescription:
        "Partner with Baharan Group for compliance, efficiency, and peace of mind.",
    },
    fa: {
      footerTitle1: "برای ترخیص گمرکی",
      footerTitle2: "بدون دغدغه آماده‌اید؟",
      footerDescription:
        "برای انطباق، بهره‌وری و آرامش خاطر با گروه بهاران همکاری کنید.",
    },
    ar: {
      footerTitle1: "هل أنتم مستعدون",
      footerTitle2: "لتخليص جمركي بلا تعقيد؟",
      footerDescription:
        "تعاونوا مع مجموعة بهاران من أجل الامتثال والكفاءة وراحة البال.",
    },
  } satisfies Record<
    AppLocale,
    {
      footerTitle1: string;
      footerTitle2: string;
      footerDescription: string;
    }
  >;

  return content[lang];
}

export default async function CustomsBrokeragePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const pageContent = getPageContent(safeLang);

  return (
    <main className="relative min-h-screen w-full bg-[#07071C]">
      <Header lang={safeLang} />
      <CustomsHero lang={safeLang} />
      <CustomsCoreServices lang={safeLang} />
      <CustomsWhyChoose lang={safeLang} />
      <CaseStudies lang={safeLang} />
      <FooterCTA
        lang={safeLang}
        titleLine1={pageContent.footerTitle1}
        titleLine2={pageContent.footerTitle2}
        description={pageContent.footerDescription}
      />
    </main>
  );
}
