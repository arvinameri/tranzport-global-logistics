"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

// استایل‌های پس‌زمینه کارت‌ها برای تنوع بصری خودکار
const CARD_STYLES = [
  { front: "bg-[#050B14] text-white", back: "bg-[#00FF85] text-brand-dark" },
  { front: "bg-[#2EAA60] text-white", back: "bg-[#050B14] text-white" },
  {
    front: "bg-white text-brand-dark border border-gray-100 shadow-sm",
    back: "bg-brand-dark text-white",
  },
  { front: "bg-gray-800 text-white", back: "bg-[#00FF85] text-brand-dark" },
];

type CaseStudyItem = {
  id: number;
  slug: string;
  date: string;
  title: string;
  frontBg: string;
  backBg: string;
  image?: string;
};

type CaseStudiesProps = {
  lang: string;
};

function getCaseStudiesContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      isRtl: false,
      eyebrow: "Case Study",
      headingLine1: "Real Results from",
      headingLine2: "Real Projects",
      viewAll: "View All Case Studies",
      backTitle: "Ready to see how we did it?",
      readFullCase: "Read Full Case",
      prevLabel: "Scroll case studies left",
      nextLabel: "Scroll case studies right",
      noCases: "No case studies published yet.",
    },
    fa: {
      isRtl: true,
      eyebrow: "مطالعه موردی",
      headingLine1: "نتایج واقعی از",
      headingLine2: "پروژه‌های واقعی",
      viewAll: "مشاهده همه مطالعات موردی",
      backTitle: "مایلید ببینید چطور انجامش دادیم؟",
      readFullCase: "مشاهده پرونده کامل",
      prevLabel: "اسکرول به کارت‌های قبلی",
      nextLabel: "اسکرول به کارت‌های بعدی",
      noCases: "هنوز مطالعه موردی ثبت نشده است.",
    },
    ar: {
      isRtl: true,
      eyebrow: "دراسة حالة",
      headingLine1: "نتائج حقيقية من",
      headingLine2: "مشاريع حقيقية",
      viewAll: "عرض جميع دراسات الحالة",
      backTitle: "هل ترغبون في معرفة كيف أنجزنا ذلك؟",
      readFullCase: "قراءة الدراسة كاملة",
      prevLabel: "التمرير إلى البطاقات السابقة",
      nextLabel: "التمرير إلى البطاقات التالية",
      noCases: "لم يتم نشر أي دراسات حالة حتى الآن.",
    },
  };

  return content[safeLang];
}

export default function CaseStudies({ lang }: CaseStudiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [studies, setStudies] = useState<CaseStudyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const content = useMemo(() => getCaseStudiesContent(lang), [lang]);

  // فچ کردن مقاله‌های واقعی از دیتابیس
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("/api/articles?category=Case Studies&limit=6", {
          cache: "no-store",
        });
        const data = await res.json();

        if (data?.ok && Array.isArray(data.data) && data.data.length > 0) {
          const formatted = data.data.map((item: any, index: number) => {
            // تشخیص محتوای زبان بر اساس lang
            const localizedSlug =
              lang === "fa"
                ? item.slug_fa
                : lang === "ar"
                  ? item.slug_ar
                  : item.slug_en;
            const localizedTitle =
              lang === "fa"
                ? item.title_fa
                : lang === "ar"
                  ? item.title_ar
                  : item.title_en;

            // استایل دوره‌ای برای کارت‌ها
            const style = CARD_STYLES[index % CARD_STYLES.length];

            // اگر تصویر دارد، آن را به عنوان پس‌زمینه کارت جایگزین رنگ پیش‌فرض می‌کنیم
            const frontBgWithImage = item.image_url
              ? `bg-gray-800 text-white bg-cover bg-center bg-blend-overlay`
              : style.front;

            return {
              id: item.id,
              slug: localizedSlug || item.slug_en,
              title: localizedTitle || item.title_en,
              date: item.published_date,
              image: item.image_url,
              frontBg: frontBgWithImage,
              backBg: style.back,
            };
          });

          setStudies(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dynamicHeadings = gsap.utils.toArray(
        ".scroll-green-text",
      ) as HTMLElement[];

      dynamicHeadings.forEach((heading) => {
        const words = heading.querySelectorAll(".word");
        if (!words.length) return;

        const turnDark = () => {
          gsap.to(words, { color: "#020408", duration: 0.3, overwrite: true });
        };

        const stopTimer = gsap.delayedCall(0.15, turnDark).pause();

        ScrollTrigger.create({
          trigger: heading,
          start: "top 95%",
          end: "bottom 5%",
          onUpdate: (self) => {
            stopTimer.restart(true);
            gsap.to(words, {
              color: "#00FF85",
              duration: 0.1,
              stagger: {
                amount: 0.2,
                from: self.direction === 1 ? "start" : "end",
              },
              overwrite: "auto",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang, isLoading]); // وابستگی به isLoading اضافه شد تا بعد از لود متن، GSAP عمل کند

  const splitText = (text: string) => {
    return text.split(" ").map((word, i, arr) => (
      <React.Fragment key={`${word}-${i}`}>
        <span
          className="word inline-block transition-colors duration-300 will-change-[color]"
          style={{ color: "#020408" }}
        >
          {word}
        </span>
        {i < arr.length - 1 ? (
          <span className="mr-2 inline-block md:mr-3" aria-hidden="true" />
        ) : null}
      </React.Fragment>
    ));
  };

  const updateScrollState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    setCanScrollPrev(slider.scrollLeft > 8);
    setCanScrollNext(slider.scrollLeft < maxScrollLeft - 8);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollState();

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    slider.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lang, studies]);

  const scrollCards = (direction: "prev" | "next") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const amount = Math.min(slider.clientWidth * 0.85, 420);

    slider.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  // اگر هنوز در حال بارگذاری است و چیزی نداریم، می‌توانیم چیزی رندر نکنیم یا یک حالت skeleton نشان دهیم
  // اینجا برای زیبایی، سکشن را رندر می‌کنیم ولی کارت‌ها را بعد از لود نشان می‌دهیم
  if (!isLoading && studies.length === 0) {
    // اگر هیچ کیس استادی واقعی وجود نداشت، سکشن را مخفی می‌کنیم
    return null;
  }

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full overflow-hidden bg-[#f3f4f6] pb-40 pt-32"
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div
          dir={content.isRtl ? "rtl" : "ltr"}
          className={`mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${
            content.isRtl ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className={content.isRtl ? "text-right" : "text-left"}>
            <span className="mb-4 block text-sm font-medium text-gray-500 md:text-base">
              {content.eyebrow}
            </span>

            <h2 className="scroll-green-text flex max-w-2xl flex-wrap gap-y-2 font-manrope text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-[5rem]">
              {splitText(content.headingLine1)}
              <span className="w-full" />
              {splitText(content.headingLine2)}
            </h2>
          </div>

          <Link
            href={`/${lang}/case-studies-news`}
            className="whitespace-nowrap rounded-full bg-[#2EAA60] px-8 py-4 text-center text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#258a4c]"
          >
            {content.viewAll}
          </Link>
        </div>

        <div
          ref={sliderRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10"
        >
          {studies.map((study) => (
            <div
              key={study.id}
              className="group relative h-112.5 w-[320px] shrink-0 cursor-pointer snap-start perspective-[1000px] md:w-95"
            >
              <div className="transform-3d relative h-full w-full transition-transform duration-700 group-hover:transform-[rotateY(180deg)]">
                <div
                  className={`backface-hidden absolute inset-0 flex flex-col justify-between rounded-4xl p-10 ${study.frontBg}`}
                  style={
                    study.image
                      ? { backgroundImage: `url('${study.image}')` }
                      : {}
                  }
                  dir={content.isRtl ? "rtl" : "ltr"}
                >
                  <span
                    className={`text-sm font-medium opacity-90 ${
                      content.isRtl ? "text-right" : "text-left"
                    }`}
                  >
                    {study.date}
                  </span>

                  <h3
                    className={`font-manrope text-3xl font-semibold leading-tight ${
                      content.isRtl ? "text-right" : "text-left"
                    }`}
                  >
                    {study.title}
                  </h3>
                </div>

                <div
                  className={`backface-hidden transform-[rotateY(180deg)] absolute inset-0 flex flex-col items-center justify-center rounded-4xl p-10 text-center shadow-xl ${study.backBg}`}
                  dir={content.isRtl ? "rtl" : "ltr"}
                >
                  <h4 className="mb-6 font-manrope text-2xl font-bold">
                    {content.backTitle}
                  </h4>

                  <Link
                    href={`/${lang}/case-studies-news/case-studies/${study.slug}`}
                    className="rounded-full border-2 border-current px-6 py-3 text-sm font-bold transition-transform hover:scale-105"
                  >
                    {content.readFullCase}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Skeleton loader if data is still fetching */}
          {isLoading &&
            [1, 2, 3].map((i) => (
              <div
                key={`skeleton-${i}`}
                className="h-112.5 w-[320px] shrink-0 snap-start md:w-95 rounded-4xl bg-gray-200 animate-pulse"
              ></div>
            ))}
        </div>

        <div
          className={`mt-8 flex gap-4 pr-4 ${
            content.isRtl ? "justify-start pl-4 pr-0" : "justify-end"
          }`}
        >
          <button
            type="button"
            onClick={() => scrollCards("prev")}
            aria-label={content.prevLabel}
            disabled={!canScrollPrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollCards("next")}
            aria-label={content.nextLabel}
            disabled={!canScrollNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
