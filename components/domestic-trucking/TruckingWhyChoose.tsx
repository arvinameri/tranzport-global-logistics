"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type FeatureItem = {
  title: string;
  description: string;
};

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      heading: "Why Choose Baharan Group for Domestic Trucking",
      intro:
        "Supporting domestic transport with practical experience in distribution, market development, and supply chain performance.",
      features: [
        {
          title: "Market\nExperience",
          description:
            "Built on hands-on experience in domestic trade, commercial sales, and regional distribution network development.",
        },
        {
          title: "Supply Chain\nCoordination",
          description:
            "Strong alignment between logistics execution, sales operations, and performance optimization across moving supply chains.",
        },
        {
          title: "Reliable\nGrowth",
          description:
            "Backed by Baharan Group’s commitment to sustainable value creation, professional accountability, and long-term market development.",
        },
      ] satisfies FeatureItem[],
    },
    fa: {
      dir: "rtl" as const,
      heading: "چرا گروه بهاران را برای حمل داخلی انتخاب کنید",
      intro:
        "پشتیبانی از حمل‌ونقل داخلی با تجربه عملی در توزیع، توسعه بازار و عملکرد زنجیره تأمین.",
      features: [
        {
          title: "تجربه\nبازار",
          description:
            "مبتنی بر تجربه عملی در تجارت داخلی، فروش تجاری و توسعه شبکه‌های توزیع منطقه‌ای.",
        },
        {
          title: "هماهنگی\nزنجیره تأمین",
          description:
            "همسویی قوی بین اجرای عملیات لجستیک، فرایندهای فروش و بهینه‌سازی عملکرد در سراسر زنجیره‌های تأمین در حال حرکت.",
        },
        {
          title: "رشد\nقابل اتکا",
          description:
            "با پشتوانه تعهد گروه بهاران به خلق ارزش پایدار، پاسخ‌گویی حرفه‌ای و توسعه بلندمدت بازار.",
        },
      ] satisfies FeatureItem[],
    },
    ar: {
      dir: "rtl" as const,
      heading: "لماذا تختار مجموعة بهاران للنقل الداخلي",
      intro:
        "دعم النقل الداخلي بخبرة عملية في التوزيع وتطوير السوق وأداء سلسلة التوريد.",
      features: [
        {
          title: "خبرة\nالسوق",
          description:
            "مبني على خبرة عملية في التجارة الداخلية والمبيعات التجارية وتطوير شبكات التوزيع الإقليمية.",
        },
        {
          title: "تنسيق\nسلسلة التوريد",
          description:
            "انسجام قوي بين تنفيذ العمليات اللوجستية وعمليات المبيعات وتحسين الأداء عبر سلاسل التوريد المتحركة.",
        },
        {
          title: "نمو\nموثوق",
          description:
            "بدعم من التزام مجموعة بهاران بخلق القيمة المستدامة والمساءلة المهنية والتطوير طويل الأمد للسوق.",
        },
      ] satisfies FeatureItem[],
    },
  };

  return content[safeLang];
}

export default function TruckingWhyChoose({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isRtl = content.dir === "rtl";

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
        className={`word inline-block transition-colors duration-300 will-change-[color] ${
          isRtl ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
        }`}
        style={{ color: "#06062a" }}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      dir={content.dir}
      className="relative w-full overflow-hidden bg-[#f5f4f1] py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto w-full max-w-350 px-6 md:px-10 lg:px-16">
        <div className="mx-auto mb-20 max-w-245 text-center">
          <h2
            ref={headingRef}
            className="mx-auto flex flex-wrap justify-center max-w-225 text-[36px] font-normal leading-[1.2] tracking-[-0.05em] md:text-[60px] lg:text-[72px]"
          >
            {splitText(content.heading)}
          </h2>

          <p className="mx-auto mt-6 max-w-190 text-[18px] leading-[1.2] tracking-[-0.03em] text-[#8E8E96] md:text-[24px]">
            {content.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 border border-[#d9d8d3] md:grid-cols-3">
          {content.features.map((item, index) => (
            <div
              key={index}
              className={`relative min-h-77.5 bg-transparent px-8 py-12 md:px-10 md:py-14 lg:px-14 ${
                index !== content.features.length - 1
                  ? content.dir === "rtl"
                    ? "md:border-l md:border-[#d9d8d3]"
                    : "md:border-r md:border-[#d9d8d3]"
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

              <h3 className="whitespace-pre-line text-[26px] font-normal leading-[1.3] tracking-[-0.05em] text-[#06062a] md:text-[36px] lg:text-[44px]">
                {item.title}
              </h3>

              <p className="mt-6 max-w-97.5 text-[16px] leading-[1.6] tracking-[-0.02em] text-[#55555f] md:text-[18px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
