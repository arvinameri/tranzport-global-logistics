"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type CorpacWhyChooseProps = {
  lang: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type WhyChooseContent = {
  isRtl: boolean;
  heading: string;
  headingClassName: string;
  headingWrapperClassName: string;
  featureTitleClassName: string;
  featureDescriptionClassName: string;
  cardAlignClassName: string;
  features: FeatureItem[];
};

function getWhyChooseContent(lang: string): WhyChooseContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, WhyChooseContent> = {
    en: {
      isRtl: false,
      heading: "Global Footprint",
      headingClassName:
        "mx-auto flex max-w-225 flex-wrap justify-center text-[36px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[60px] lg:text-[72px]",
      headingWrapperClassName: "text-center",
      featureTitleClassName:
        "whitespace-pre-line font-manrope text-[26px] font-normal leading-[1.02] tracking-[-0.05em] text-[#06062a] md:text-[36px] lg:text-[44px]",
      featureDescriptionClassName:
        "mt-6 max-w-97.5 text-[16px] leading-[1.35] tracking-[-0.02em] text-[#55555f] md:text-[18px]",
      cardAlignClassName: "text-left",
      features: [
        {
          title: "Built for\nGlobal Operations",
          description:
            "Founded in 2010, Baharan Group operates with 400+ professionals and 260+ partners across 120+ countries.",
        },
        {
          title: "Strategic\nInfrastructure",
          description:
            "9 modern warehousing facilities spanning over 500,000 sq. ft., integrated with multimodal transport.",
        },
        {
          title: "Trusted by\nIndustry Leaders",
          description:
            "Supporting clients from mid-sized businesses to Fortune 500 companies with reliable, end-to-end logistics.",
        },
      ],
    },
    fa: {
      isRtl: true,
      heading: "حضور جهانی",
      headingClassName:
        "mx-auto flex max-w-225 flex-wrap justify-center font-vazirmatn text-[32px] font-medium leading-[1.08] tracking-[-0.03em] md:text-[52px] lg:text-[64px]",
      headingWrapperClassName: "text-center",
      featureTitleClassName:
        "whitespace-pre-line font-vazirmatn text-[23px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#06062a] md:text-[31px] lg:text-[38px]",
      featureDescriptionClassName:
        "mt-6 max-w-97.5 font-vazirmatn text-[15px] leading-[1.95] tracking-[-0.01em] text-[#55555f] md:text-[17px]",
      cardAlignClassName: "text-right",
      features: [
        {
          title: "طراحی‌شده برای\nعملیات جهانی",
          description:
            "گروه بهاران که در سال 2010 بنیان‌گذاری شد، امروز با بیش از 400 نیروی متخصص و 260+ شریک تجاری در بیش از 120 کشور فعالیت می‌کند.",
        },
        {
          title: "زیرساخت\nراهبردی",
          description:
            "برخوردار از 9 مرکز انبارداری مدرن با بیش از 500,000 فوت مربع فضا، یکپارچه‌شده با حمل‌ونقل چندوجهی.",
        },
        {
          title: "مورد اعتماد\nرهبران صنعت",
          description:
            "پشتیبانی از مشتریان، از کسب‌وکارهای متوسط تا شرکت‌های Fortune 500، با راهکارهای لجستیکی یکپارچه و قابل اتکا.",
        },
      ],
    },
    ar: {
      isRtl: true,
      heading: "الانتشار العالمي",
      headingClassName:
        "mx-auto flex max-w-225 flex-wrap justify-center font-vazirmatn text-[31px] font-medium leading-[1.1] tracking-[-0.03em] md:text-[50px] lg:text-[62px]",
      headingWrapperClassName: "text-center",
      featureTitleClassName:
        "whitespace-pre-line font-vazirmatn text-[23px] font-semibold leading-[1.22] tracking-[-0.03em] text-[#06062a] md:text-[30px] lg:text-[37px]",
      featureDescriptionClassName:
        "mt-6 max-w-97.5 font-vazirmatn text-[15px] leading-[1.95] tracking-[-0.01em] text-[#55555f] md:text-[17px]",
      cardAlignClassName: "text-right",
      features: [
        {
          title: "مصمم لـ\nالعمليات العالمية",
          description:
            "تأسست مجموعة بهاران عام 2010، وتعمل اليوم بأكثر من 400 متخصص و260+ شريكًا عبر أكثر من 120 دولة.",
        },
        {
          title: "بنية تحتية\nاستراتيجية",
          description:
            "تضم 9 مرافق تخزين حديثة تمتد على أكثر من 500,000 قدم مربع، ومتكاملة مع حلول النقل متعدد الوسائط.",
        },
        {
          title: "موثوق من قبل\nروّاد الصناعة",
          description:
            "ندعم العملاء من الشركات المتوسطة حتى شركات Fortune 500 بحلول لوجستية متكاملة وموثوقة من البداية إلى النهاية.",
        },
      ],
    },
  };

  return content[safeLang];
}

export default function CorpacWhyChoose({ lang }: CorpacWhyChooseProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const content = useMemo(() => getWhyChooseContent(lang), [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;

      const words = heading.querySelectorAll(".word");
      if (!words.length) return;

      const turnBlack = () => {
        gsap.to(words, { color: "#06062a", duration: 0.3, overwrite: true });
      };

      const stopTimer = gsap.delayedCall(0.15, turnBlack).pause();

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
    }, headingRef);

    return () => ctx.revert();
  }, [lang]);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="word inline-block transition-colors duration-300 will-change-[color]"
        style={{ color: "#06062a" }}
      >
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <section
      dir="ltr"
      className="relative w-full overflow-hidden bg-[#f5f4f1] py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto w-full max-w-350 px-6 md:px-10 lg:px-16">
        <div
          className={`mx-auto mb-20 max-w-245 ${content.headingWrapperClassName}`}
          dir={content.isRtl ? "rtl" : "ltr"}
        >
          <h2 ref={headingRef} className={content.headingClassName}>
            {splitText(content.heading)}
          </h2>
        </div>

        <div className="grid grid-cols-1 border border-[#d9d8d3] md:grid-cols-3">
          {content.features.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`relative min-h-77.5 bg-transparent px-8 py-12 md:px-10 md:py-14 lg:px-14 ${
                index !== content.features.length - 1
                  ? "md:border-r md:border-[#d9d8d3]"
                  : ""
              }`}
            >
              <span className="absolute -left-1.75 -top-4 text-[26px] font-light text-[#a8a7a2]">
                +
              </span>
              <span className="absolute -bottom-4 -left-1.75 text-[26px] font-light text-[#a8a7a2]">
                +
              </span>

              {index === content.features.length - 1 ? (
                <>
                  <span className="absolute -right-1.75 -top-4 text-[26px] font-light text-[#a8a7a2]">
                    +
                  </span>
                  <span className="absolute -bottom-4 -right-1.75 text-[26px] font-light text-[#a8a7a2]">
                    +
                  </span>
                </>
              ) : null}

              <div
                dir={content.isRtl ? "rtl" : "ltr"}
                className={content.cardAlignClassName}
              >
                <h3 className={content.featureTitleClassName}>{item.title}</h3>

                <p className={content.featureDescriptionClassName}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
