import Header from "@/components/layout/Header";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import ProjectCargoHero from "@/components/project-cargo/ProjectCargoHero";
import ProjectCargoWhyChoose from "@/components/project-cargo/ProjectCargoWhyChoose";
import { AppLocale, locales } from "@/i18nConfig";

export default async function ProjectCargoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const footerTexts = {
    en: {
      title1: "Let’s Move Something",
      title2: "Big Together",
      desc: "Our project logistics experts are ready to plan and execute your next move — anywhere in the world.",
    },
    fa: {
      title1: "بیایید با هم کارهای",
      title2: "بزرگ انجام دهیم",
      desc: "کارشناسان لجستیک پروژه ما آماده برنامه‌ریزی و اجرای جابجایی بعدی شما هستند — در هر کجای دنیا.",
    },
    ar: {
      title1: "دعونا ننجز معاً",
      title2: "أشياء عظيمة",
      desc: "خبراء لوجستيات المشاريع لدينا مستعدون لتخطيط وتنفيذ خطوتك التالية — في أي مكان في العالم.",
    },
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0a0f1c]">
      <Header lang={lang} />
      <ProjectCargoHero lang={lang} />
      <ProjectCargoWhyChoose lang={lang} />
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
