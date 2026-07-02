"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type FeatureItem = {
  subtitle: string;
  title: string;
};

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      heading: "Why Choose Baharan Group for Customs Brokerage",
      features: [
        {
          subtitle: "Backed by Baharan Group",
          title:
            "Part of a holding with effective presence in domestic and international markets since 2010.",
        },
        {
          subtitle: "Experience with Leading Brands",
          title:
            "Track record shaped by cooperation with companies like Azarakhsh, Kohan Ceram, EEFA, P&G and other major organizations.",
        },
        {
          subtitle: "Supply Chain & Compliance Focus",
          title:
            "Customs decisions aligned with supply chain management, sales process optimization and risk control.",
        },
        {
          subtitle: "Organizational Commitment",
          title:
            "Guided by professional accountability and long-term value creation as core principles of Baharan Group.",
        },
      ] satisfies FeatureItem[],
    },
    fa: {
      dir: "rtl" as const,
      heading: "چرا گروه بهاران را برای خدمات گمرکی انتخاب کنید",
      features: [
        {
          subtitle: "با پشتوانه گروه بهاران",
          title:
            "بخشی از یک هلدینگ با حضور مؤثر در بازارهای داخلی و بین‌المللی از سال 2010.",
        },
        {
          subtitle: "تجربه همکاری با برندهای پیشرو",
          title:
            "سابقه‌ای شکل‌گرفته از همکاری با شرکت‌هایی مانند آذرخش، کهن سرام، EEFA، P&G و دیگر سازمان‌های بزرگ.",
        },
        {
          subtitle: "تمرکز بر زنجیره تأمین و انطباق",
          title:
            "تصمیمات گمرکی همسو با مدیریت زنجیره تأمین، بهینه‌سازی فرایند فروش و کنترل ریسک.",
        },
        {
          subtitle: "تعهد سازمانی",
          title:
            "هدایت‌شده بر پایه مسئولیت‌پذیری حرفه‌ای و خلق ارزش بلندمدت به‌عنوان اصول محوری گروه بهاران.",
        },
      ] satisfies FeatureItem[],
    },
    ar: {
      dir: "rtl" as const,
      heading: "لماذا تختار مجموعة بهاران للتخليص الجمركي",
      features: [
        {
          subtitle: "بدعم من مجموعة بهاران",
          title:
            "جزء من مجموعة قابضة لها حضور فعّال في الأسواق المحلية والدولية منذ عام 2010.",
        },
        {
          subtitle: "خبرة مع علامات رائدة",
          title:
            "سجل خبرات تشكل عبر التعاون مع شركات مثل أذرخش وكوهان سيرام وEEFA وP&G وغيرها من المؤسسات الكبرى.",
        },
        {
          subtitle: "تركيز على سلسلة التوريد والامتثال",
          title:
            "قرارات جمركية منسجمة مع إدارة سلسلة التوريد وتحسين عمليات البيع وضبط المخاطر.",
        },
        {
          subtitle: "التزام مؤسسي",
          title:
            "مرتكز على المسؤولية المهنية وخلق القيمة طويلة الأمد باعتبارهما من المبادئ الأساسية لمجموعة بهاران.",
        },
      ] satisfies FeatureItem[],
    },
  };

  return content[safeLang];
}

export default function CustomsWhyChoose({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLHeadingElement>(null);
  const content = useMemo(() => getContent(lang), [lang]);
  const isRtl = content.dir === "rtl";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textContainerRef.current?.querySelectorAll(".word");

      if (words && words.length) {
        const turnBaseColor = () => {
          gsap.to(words, {
            color: "rgba(255, 255, 255, 0.4)",
            duration: 0.2,
            overwrite: true,
          });
        };

        const stopTimer = gsap.delayedCall(0.1, turnBaseColor).pause();

        ScrollTrigger.create({
          trigger: textContainerRef.current,
          start: "top 85%",
          end: "bottom 30%",
          onUpdate: (self) => {
            stopTimer.restart(true);
            gsap.to(words, {
              color: "#00FF85",
              duration: 0.1,
              stagger: {
                amount: 0.3,
                from: self.direction === 1 ? "start" : "end",
              },
              overwrite: "auto",
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors will-change-[color] text-white/40 ${
          isRtl ? "ml-2 md:ml-3 lg:ml-4" : "mr-2 md:mr-3 lg:mr-4"
        }`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      dir={content.dir}
      className="relative flex min-h-screen w-full items-center overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/assets/images/customs-brokerage/why-choose-bg.jpg"
          alt="Customs Brokerage Landscape"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#07071C]/90 via-[#07071C]/40 to-[#07071C]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex h-full flex-col justify-center pb-10 md:pb-20">
            <h2
              ref={textContainerRef}
              className="font-manrope text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-[4.5rem]"
            >
              {splitText(content.heading)}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className={`
                  flex flex-col justify-start rounded-2xl border border-white/10
                  bg-white/5 p-8 backdrop-blur-md transition-colors duration-300
                  hover:bg-white/10
                  ${index % 2 === 0 ? "mt-0" : "md:mt-12"}
                `}
              >
                <span className="mb-4 text-sm font-medium tracking-wide text-white/70">
                  {feature.subtitle}
                </span>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
