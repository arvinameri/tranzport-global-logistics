import Header from "@/components/layout/Header";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import TruckingHero from "@/components/domestic-trucking/TruckingHero";
import TruckingScrollStack from "@/components/domestic-trucking/TruckingScrollStack";
import TruckingWhyChoose from "@/components/domestic-trucking/TruckingWhyChoose";
import { AppLocale, locales } from "@/i18nConfig";

function getFooterContent(lang: AppLocale) {
  const content = {
    en: {
      titleLine1: "Need a logistics partner",
      titleLine2: "for your next big project?",
      description:
        "Let Baharan Group manage the complexity — so your team can focus on building what’s next.",
    },
    fa: {
      titleLine1: "به یک شریک لجستیکی",
      titleLine2: "برای پروژه بزرگ بعدی خود نیاز دارید؟",
      description:
        "اجازه دهیدگروه بهاران پیچیدگی‌ها را مدیریت کند — تا تیم شما روی ساختن آینده تمرکز کند.",
    },
    ar: {
      titleLine1: "هل تحتاج إلى شريك لوجستي",
      titleLine2: "لمشروعك الكبير القادم؟",
      description:
        "دع مجموعة بهاران تدير التعقيدات — ليتفرغ فريقك للتركيز على بناء ما هو قادم.",
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

export default async function DomesticTruckingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const footerContent = getFooterContent(safeLang);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#F9FAFB]">
      <Header lang={safeLang} />

      {/* بخش هیرو */}
      <TruckingHero lang={safeLang} />

      {/* بخش اسکرول کرکره‌ای سرویس‌ها */}
      <TruckingScrollStack lang={safeLang} />

      {/* بخش مزایای انتخاب (Why Choose) */}
      <TruckingWhyChoose lang={safeLang} />

      {/* بخش کیس استادی‌ها */}
      <CaseStudies lang={safeLang} />

      {/* بخش فوتر (CTA) */}
      <FooterCTA
        lang={safeLang}
        titleLine1={footerContent.titleLine1}
        titleLine2={footerContent.titleLine2}
        description={footerContent.description}
      />
    </main>
  );
}
