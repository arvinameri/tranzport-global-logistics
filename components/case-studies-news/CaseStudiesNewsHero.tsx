import { AppLocale, locales } from "@/i18nConfig";

type CaseStudiesNewsHeroProps = {
  lang: string;
};

function getHeroContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      isRtl: false,
      eyebrow: "Case Studies & News",
      title:
        "Real projects, real results, and the latest insights from Baharan Group.",
    },
    fa: {
      isRtl: true,
      eyebrow: "مطالعات موردی و اخبار",
      title: "پروژه‌های واقعی، نتایج واقعی و تازه‌ترین بینش‌ها از گروه بهاران.",
    },
    ar: {
      isRtl: true,
      eyebrow: "دراسات الحالة والأخبار",
      title: "مشاريع حقيقية، نتائج حقيقية، وأحدث الرؤى من مجموعة بهاران.",
    },
  } satisfies Record<
    AppLocale,
    {
      isRtl: boolean;
      eyebrow: string;
      title: string;
    }
  >;

  return content[safeLang];
}

export default function CaseStudiesNewsHero({
  lang,
}: CaseStudiesNewsHeroProps) {
  const content = getHeroContent(lang);

  return (
    <section className="mx-auto max-w-350 px-6 pb-10 pt-36 md:px-12 md:pt-40 lg:px-20">
      <div
        dir={content.isRtl ? "rtl" : "ltr"}
        className={content.isRtl ? "text-right" : "text-left"}
      >
        <p className="mb-5 text-sm font-medium text-black/55">
          {content.eyebrow}
        </p>

        <h1 className="max-w-4xl text-4xl font-normal leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
          {content.title}
        </h1>
      </div>
    </section>
  );
}
