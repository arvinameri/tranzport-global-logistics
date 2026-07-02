"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales, getLocaleDirection } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

function getWhyContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";
  return {
    en: {
      title: "Why It Matters",
      description:
        "Technology that improves control, accelerates decision-making, and strengthens visibility across the supply chain.",
      features: [
        {
          title: "Automation",
          desc: "Reduce manual work, improve process speed, and create more consistent execution through connected digital workflows across logistics operations.",
        },
        {
          title: "Visibility",
          desc: "Maintain real-time oversight across freight movements, milestones, and exceptions with stronger control from origin through final delivery.",
        },
        {
          title: "Smart\nCompliance",
          desc: "Support regulatory accuracy and operational transparency with systems designed to strengthen compliance management and data-driven decision-making.",
        },
      ],
    },
    fa: {
      title: "چرا این موضوع مهم است؟",
      description:
        "فناوری که کنترل را بهبود می‌بخشد، تصمیم‌گیری را تسریع می‌کند و شفافیت را در سراسر زنجیره تامین افزایش می‌دهد.",
      features: [
        {
          title: "اتوماسیون",
          desc: "کاهش کار دستی، افزایش سرعت فرآیندها و اجرای یکپارچه‌تر از طریق جریان‌های کاری دیجیتال در سراسر عملیات لجستیک.",
        },
        {
          title: "رؤیت‌پذیری",
          desc: "نظارت لحظه‌ای بر جابجایی کالاها و استثنائات، با کنترل دقیق‌تر از مبدأ تا زمان تحویل نهایی.",
        },
        {
          title: "انطباق هوشمند",
          desc: "پشتیبانی از دقت نظارتی و شفافیت عملیاتی با سیستم‌هایی که برای تقویت مدیریت انطباق و تصمیم‌گیری مبتنی بر داده طراحی شده‌اند.",
        },
      ],
    },
    ar: {
      title: "لماذا هذا مهم؟",
      description:
        "تكنولوجيا تحسن التحكم وتسرع عملية صنع القرار وتعزز الرؤية في جميع أنحاء سلسلة التوريد.",
      features: [
        {
          title: "الأتمتة",
          desc: "تقليل العمل اليدوي، وتحسين سرعة العمليات، وخلق تنفيذ أكثر اتساقًا من خلال التدفقات الرقمية.",
        },
        {
          title: "الرؤية والشفافية",
          desc: "الحفاظ على المراقبة في الوقت الفعلي عبر حركات الشحن والأحداث، مع تحكم أقوى من المصدر حتى التسليم.",
        },
        {
          title: "الامتثال الذكي",
          desc: "دعم الدقة التنظيمية والشفافية التشغيلية من خلال أنظمة مصممة لتعزيز إدارة الامتثال والقرارات المستندة للبيانات.",
        },
      ],
    },
  }[safeLang];
}

export default function TechnologyWhyItMatters({ lang }: { lang: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const content = useMemo(() => getWhyContent(lang), [lang]);
  const dir = getLocaleDirection(lang);
  const isRtl = dir === "rtl";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;
      const words = heading.querySelectorAll(".word");
      if (!words.length) return;

      const turnBlack = () =>
        gsap.to(words, { color: "#06062a", duration: 0.3, overwrite: true });
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

  // حل مشکل چیدمان کلمات فارسی با حذف margin و استفاده از Space واقعی
  const splitText = (text: string) => {
    return text.split(" ").map((word, i, arr) => (
      <React.Fragment key={i}>
        <span
          className="word transition-colors duration-300 will-change-[color]"
          style={{ color: "#06062a" }}
        >
          {word}
        </span>
        {i < arr.length - 1 && " "}
      </React.Fragment>
    ));
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#f5f4f1] py-24 md:py-32 lg:py-36"
      dir={dir}
    >
      <div className="mx-auto w-full max-w-350 px-6 md:px-10 lg:px-16">
        <div className="mx-auto mb-20 max-w-245 text-center">
          <h2
            ref={headingRef}
            className={`mx-auto block max-w-225 text-[36px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[60px] lg:text-[72px] ${
              isRtl ? "font-sans font-bold" : ""
            }`}
          >
            {splitText(content.title)}
          </h2>
          <p
            className={`mx-auto mt-6 max-w-190 text-[18px] leading-[1.2] tracking-[-0.03em] text-[#8E8E96] md:text-[24px] ${
              isRtl ? "font-sans leading-[1.8]" : ""
            }`}
          >
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 border border-[#d9d8d3] md:grid-cols-3">
          {content.features.map((item, index) => (
            <div
              key={item.title}
              className={`relative min-h-77.5 bg-transparent px-8 py-12 md:px-10 md:py-14 lg:px-14 ${
                index !== content.features.length - 1
                  ? isRtl
                    ? "md:border-l md:border-[#d9d8d3]"
                    : "md:border-r md:border-[#d9d8d3]"
                  : ""
              }`}
            >
              {/* Decorative plus marks */}
              <span
                className={`absolute -top-4 text-[26px] font-light text-[#a8a7a2] ${
                  isRtl ? "-right-1.75" : "-left-1.75"
                }`}
              >
                +
              </span>
              <span
                className={`absolute -bottom-4 text-[26px] font-light text-[#a8a7a2] ${
                  isRtl ? "-right-1.75" : "-left-1.75"
                }`}
              >
                +
              </span>

              {index === content.features.length - 1 && (
                <>
                  <span
                    className={`absolute -top-4 text-[26px] font-light text-[#a8a7a2] ${
                      isRtl ? "-left-1.75" : "-right-1.75"
                    }`}
                  >
                    +
                  </span>
                  <span
                    className={`absolute -bottom-4 text-[26px] font-light text-[#a8a7a2] ${
                      isRtl ? "-left-1.75" : "-right-1.75"
                    }`}
                  >
                    +
                  </span>
                </>
              )}

              <h3
                className={`whitespace-pre-line text-[26px] font-normal leading-[1.02] tracking-[-0.05em] text-[#06062a] md:text-[36px] lg:text-[44px] ${
                  isRtl ? "font-sans font-bold leading-[1.3] text-right" : ""
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-6 max-w-97.5 text-[16px] leading-[1.35] tracking-[-0.02em] text-[#55555f] md:text-[18px] ${
                  isRtl ? "font-sans leading-[1.8] text-right" : ""
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
