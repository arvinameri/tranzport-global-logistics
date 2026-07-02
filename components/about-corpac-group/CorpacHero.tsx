"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type CorpacHeroProps = {
  lang: string;
};

type TimelineItem = {
  year: string;
  text: string;
};

type HeroContent = {
  isRtl: boolean;
  yearClassName: string;
  textClassName: string;
  timeline: TimelineItem[];
};

function getHeroContent(lang: string): HeroContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, HeroContent> = {
    en: {
      isRtl: false,
      yearClassName:
        "tl-year font-manrope text-5xl font-medium tracking-tight whitespace-pre-line text-right will-change-[opacity,transform] md:text-7xl lg:text-8xl",
      textClassName:
        "tl-text text-left text-xl leading-tight will-change-[opacity,transform] md:text-3xl lg:text-[32px]",
      timeline: [
        {
          year: "2010",
          text: "The Baharan Group began its activities with a focus on domestic trade.",
        },
        {
          year: "Growth",
          text: "Leveraging innovative management and specialized expertise to establish a path of sustainable growth.",
        },
        {
          year: "Expansion",
          text: "Expanding operations into domestic trade within distribution, sales, foreign trade, and logistics.",
        },
        {
          year: "Today",
          text: "Baharan Group stands as an experienced holding with an effective presence in both domestic and international markets.",
        },
      ],
    },
    fa: {
      isRtl: true,
      yearClassName:
        "tl-year font-vazirmatn text-[38px] font-semibold tracking-tight whitespace-pre-line text-left will-change-[opacity,transform] md:text-[60px] lg:text-[72px]",
      textClassName:
        "tl-text font-vazirmatn text-right text-[18px] leading-[1.9] will-change-[opacity,transform] md:text-[26px] lg:text-[29px]",
      timeline: [
        {
          year: "2010",
          text: "گروه بهاران فعالیت خود را با تمرکز بر تجارت داخلی آغاز کرد.",
        },
        {
          year: "رشد",
          text: "با تکیه بر مدیریت نوآورانه و تخصص حرفه‌ای، مسیر رشد پایدار خود را پایه‌گذاری کرد.",
        },
        {
          year: "گسترش",
          text: "دامنه فعالیت‌های خود را در تجارت داخلی، توزیع، فروش، تجارت خارجی و لجستیک توسعه داد.",
        },
        {
          year: "امروز",
          text: "گروه بهاران امروز به‌عنوان هلدینگی باتجربه با حضوری مؤثر در بازارهای داخلی و بین‌المللی شناخته می‌شود.",
        },
      ],
    },
    ar: {
      isRtl: true,
      yearClassName:
        "tl-year font-vazirmatn text-[37px] font-semibold tracking-tight whitespace-pre-line text-left will-change-[opacity,transform] md:text-[58px] lg:text-[70px]",
      textClassName:
        "tl-text font-vazirmatn text-right text-[18px] leading-[1.9] will-change-[opacity,transform] md:text-[25px] lg:text-[28px]",
      timeline: [
        {
          year: "2010",
          text: "بدأت مجموعة بهاران أعمالها مع التركيز على التجارة المحلية.",
        },
        {
          year: "النمو",
          text: "اعتمدت على الإدارة المبتكرة والخبرة المتخصصة لتأسيس مسار نمو مستدام.",
        },
        {
          year: "التوسع",
          text: "وسّعت عملياتها في مجالات التجارة المحلية والتوزيع والمبيعات والتجارة الخارجية والخدمات اللوجستية.",
        },
        {
          year: "اليوم",
          text: "تقف مجموعة بهاران اليوم ككيان قابض ذي خبرة وحضور فعّال في الأسواق المحلية والدولية.",
        },
      ],
    },
  };

  return content[safeLang];
}

export default function CorpacHero({ lang }: CorpacHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const content = useMemo(() => getHeroContent(lang), [lang]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !dotRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      gsap.to(dotRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      items.forEach((item) => {
        if (!item) return;

        const year = item.querySelector(".tl-year");
        const text = item.querySelector(".tl-text");

        gsap.set([year, text], { opacity: 0.15, scale: 0.95 });

        ScrollTrigger.create({
          trigger: item,
          start: "center 55%",
          end: "center 45%",
          onEnter: () => {
            gsap.to([year, text], {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              color: "#ffffff",
            });
          },
          onEnterBack: () => {
            gsap.to([year, text], {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              color: "#ffffff",
            });
          },
          onLeave: () => {
            gsap.to([year, text], {
              opacity: 0.15,
              scale: 0.95,
              duration: 0.4,
              ease: "power2.in",
            });
          },
          onLeaveBack: () => {
            gsap.to([year, text], {
              opacity: 0.15,
              scale: 0.95,
              duration: 0.4,
              ease: "power2.in",
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      dir="ltr"
      className="relative w-full bg-[#07071C] pb-40 pt-20 lg:pb-64 lg:pt-32"
    >
      <div
        ref={sectionRef}
        className="relative mx-auto w-full max-w-7xl px-6 md:px-12"
      >
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white/10" />

        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 origin-top scale-y-0 bg-[#00FF85]"
        />

        <div
          ref={dotRef}
          className="absolute left-1/2 top-0 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#00FF85]/20"
        >
          <div className="h-2 w-2 rounded-full bg-[#00FF85]" />
        </div>

        <div className="relative flex flex-col gap-40 py-20 md:gap-64">
          {content.timeline.map((item, index) => (
            <div
              key={`${item.year}-${index}`}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="relative flex w-full items-center justify-between"
            >
              {content.isRtl ? (
                <>
                  <div className="w-[45%] pl-8 md:pl-16" dir="rtl">
                    <p className={content.textClassName}>{item.text}</p>
                  </div>

                  <div className="w-[45%] pr-8 text-left md:pr-16" dir="ltr">
                    <h2 className={content.yearClassName}>{item.year}</h2>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[45%] pr-8 text-right md:pr-16" dir="ltr">
                    <h2 className={content.yearClassName}>{item.year}</h2>
                  </div>

                  <div className="w-[45%] pl-8 md:pl-16" dir="ltr">
                    <p className={content.textClassName}>{item.text}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
