"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type FeatureItem = {
  title: string;
  description: string;
};

type AirWhyChooseProps = {
  lang: string;
};

function getWhyChooseContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      isRtl: false,
      heading: "Why Choose Baharan Group for Air Freight",
      subtitle:
        "Backed by years of effective presence in domestic and international markets, delivering scalable solutions aligned with global standards.",
      features: [
        {
          title: "Global Reach,\nLocal Expertise",
          description:
            "Reliable connections with leading carriers, backed by Baharan Group's extensive experience in domestic and international trade.",
        },
        {
          title: "Proven Track\nRecord",
          description:
            "Successful collaborations with reputable companies, optimizing your supply chain with transparent logistics and high efficiency.",
        },
        {
          title: "Commitment\n& Trust",
          description:
            "Driven by professional accountability and organizational commitment, ensuring compliant, secure, and seamless cross-border operations.",
        },
      ] satisfies FeatureItem[],
    },
    fa: {
      isRtl: true,
      heading: "چرا گروه بهاران را برای حمل‌ونقل هوایی انتخاب کنید",
      subtitle:
        "با پشتوانه سال‌ها حضور مؤثر در بازارهای داخلی و بین‌المللی، راهکارهای مقیاس‌پذیر و منطبق با استانداردهای جهانی ارائه می‌دهیم.",
      features: [
        {
          title: "پوشش جهانی،\nتخصص محلی",
          description:
            "ارتباطات قابل اعتماد با کریرهای معتبر، همراه با تجربه گسترده گروه بهاران در تجارت داخلی و بین‌المللی.",
        },
        {
          title: "سابقه‌ای\nاثبات‌شده",
          description:
            "همکاری‌های موفق با شرکت‌های معتبر برای بهینه‌سازی زنجیره تأمین شما با لجستیکی شفاف و کارآمد.",
        },
        {
          title: "تعهد\nو اعتماد",
          description:
            "مبتنی بر مسئولیت‌پذیری حرفه‌ای و تعهد سازمانی، برای اجرای عملیات بین‌المللی ایمن، منطبق و روان.",
        },
      ] satisfies FeatureItem[],
    },
    ar: {
      isRtl: true,
      heading: "لماذا تختار مجموعة بهاران للشحن الجوي",
      subtitle:
        "مدعومون بسنوات من الحضور الفعال في الأسواق المحلية والدولية، ونقدم حلولاً قابلة للتوسع ومتوافقة مع المعايير العالمية.",
      features: [
        {
          title: "انتشار عالمي،\nخبرة محلية",
          description:
            "روابط موثوقة مع شركات النقل الرائدة، مدعومة بخبرة مجموعة بهاران الواسعة في التجارة المحلية والدولية.",
        },
        {
          title: "سجل\nمثبت",
          description:
            "شراكات ناجحة مع شركات مرموقة لتحسين سلسلة الإمداد الخاصة بكم عبر خدمات لوجستية شفافة وعالية الكفاءة.",
        },
        {
          title: "الالتزام\nوالثقة",
          description:
            "مدفوعون بالمسؤولية المهنية والالتزام المؤسسي لضمان عمليات عابرة للحدود آمنة وسلسة ومتوافقة.",
        },
      ] satisfies FeatureItem[],
    },
  } satisfies Record<
    AppLocale,
    {
      isRtl: boolean;
      heading: string;
      subtitle: string;
      features: FeatureItem[];
    }
  >;

  return content[safeLang];
}

export default function AirWhyChoose({ lang }: AirWhyChooseProps) {
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
    return text.split(" ").map((word, i, arr) => (
      <React.Fragment key={`${word}-${i}`}>
        <span
          className="word inline-block transition-colors duration-300 will-change-[color]"
          style={{ color: "#06062a" }}
        >
          {word}
        </span>
        {i < arr.length - 1 ? <span>&nbsp;</span> : null}
      </React.Fragment>
    ));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4f1] py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-350 px-6 md:px-10 lg:px-16">
        <div
          dir={content.isRtl ? "rtl" : "ltr"}
          className="mx-auto mb-20 max-w-245 text-center"
        >
          <h2
            ref={headingRef}
            className="mx-auto flex max-w-225 flex-wrap justify-center gap-x-2 gap-y-1 text-[36px] font-normal leading-[0.98] tracking-[-0.05em] md:gap-x-3 md:gap-y-2 md:text-[60px] lg:text-[72px]"
          >
            {splitText(content.heading)}
          </h2>

          <p className="mx-auto mt-6 max-w-190 text-[18px] leading-[1.2] tracking-[-0.03em] text-[#8E8E96] md:text-[24px]">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 border border-[#d9d8d3] md:grid-cols-3">
          {content.features.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              dir={content.isRtl ? "rtl" : "ltr"}
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

              <h3
                className={`whitespace-pre-line text-[26px] font-normal leading-[1.02] tracking-[-0.05em] text-[#06062a] md:text-[36px] lg:text-[44px] ${
                  content.isRtl ? "text-right" : "text-left"
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`mt-6 max-w-97.5 text-[16px] leading-[1.35] tracking-[-0.02em] text-[#55555f] md:text-[18px] ${
                  content.isRtl ? "text-right" : "text-left"
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
