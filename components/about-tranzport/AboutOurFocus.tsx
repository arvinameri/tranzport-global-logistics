"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type AboutOurFocusProps = {
  lang: string;
};

type FocusItem = {
  title: string;
  desc: string;
};

type FocusContent = {
  isRtl: boolean;
  heading: string;
  headingClassName: string;
  cardTitleClassName: string;
  cardDescClassName: string;
  cardAlignClassName: string;
  items: FocusItem[];
};

function getFocusContent(lang: string): FocusContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, FocusContent> = {
    en: {
      isRtl: false,
      heading: "Our Focus",
      headingClassName:
        "mx-auto max-w-4xl font-sans text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white md:text-[4rem] lg:text-[5rem]",
      cardTitleClassName:
        "relative z-10 mb-4 font-sans text-2xl font-semibold leading-[1.1] tracking-tight text-white transition-colors duration-300 group-hover:text-[#20E6AA] md:text-[1.7rem]",
      cardDescClassName: "relative z-10 text-sm leading-[1.7] text-white/50",
      cardAlignClassName: "text-left",
      items: [
        {
          title: "Global Logistics Expertise",
          desc: "End-to-end freight solutions: ocean, air, customs, trucking, warehousing, and project cargo.",
        },
        {
          title: "Technology that Delivers",
          desc: "Real-time visibility, smart integration tools, and automated reporting for efficient, transparent supply chains.",
        },
        {
          title: "Customer-First Approach",
          desc: "Tailored logistics for industries like energy, manufacturing, retail, and finance — built to adapt to every client's unique needs.",
        },
      ],
    },
    fa: {
      isRtl: true,
      heading: "تمرکز ما",
      headingClassName:
        "mx-auto max-w-4xl font-vazirmatn text-[38px] font-semibold leading-[1.2] tracking-tight text-white md:text-[52px] lg:text-[62px]",
      cardTitleClassName:
        "relative z-10 mb-4 font-vazirmatn text-[22px] font-semibold leading-[1.3] tracking-tight text-white transition-colors duration-300 group-hover:text-[#20E6AA] md:text-[26px]",
      cardDescClassName:
        "relative z-10 font-vazirmatn text-[14px] leading-[2] text-white/60",
      cardAlignClassName: "text-right",
      items: [
        {
          title: "تخصص لجستیک جهانی",
          desc: "راهکارهای جامع حمل‌ونقل از مبدأ تا مقصد: دریایی، هوایی، گمرکی، حمل داخلی، انبارداری و پروژه‌های کارگو.",
        },
        {
          title: "فناوری در خدمت شما",
          desc: "امکان رصد لحظه‌ای، ابزارهای یکپارچه‌سازی هوشمند و گزارش‌دهی خودکار برای زنجیره‌های تأمین شفاف و کارآمد.",
        },
        {
          title: "رویکرد مشتری‌محور",
          desc: "راهکارهای لجستیکی اختصاصی برای صنایعی همچون انرژی، تولید، خرده‌فروشی و مالی — با قابلیت انطباق با نیازهای منحصربه‌فرد هر مشتری.",
        },
      ],
    },
    ar: {
      isRtl: true,
      heading: "محور تركيزنا",
      headingClassName:
        "mx-auto max-w-4xl font-vazirmatn text-[36px] font-semibold leading-[1.22] tracking-tight text-white md:text-[50px] lg:text-[60px]",
      cardTitleClassName:
        "relative z-10 mb-4 font-vazirmatn text-[21px] font-semibold leading-[1.3] tracking-tight text-white transition-colors duration-300 group-hover:text-[#20E6AA] md:text-[25px]",
      cardDescClassName:
        "relative z-10 font-vazirmatn text-[14px] leading-[2] text-white/60",
      cardAlignClassName: "text-right",
      items: [
        {
          title: "الخبرة اللوجستية العالمية",
          desc: "حلول شحن متكاملة من البداية إلى النهاية: الشحن البحري والجوي، الجمارك، النقل البري، التخزين، وشحن المشاريع.",
        },
        {
          title: "تكنولوجيا تحقق النتائج",
          desc: "رؤية فورية، أدوات تكامل ذكية، وتقارير مؤتمتة لضمان سلاسل إمداد فعّالة وشفافة.",
        },
        {
          title: "نهج يركز على العميل",
          desc: "حلول لوجستية مخصصة لقطاعات مثل الطاقة والتصنيع والتجزئة والتمويل — مصممة لتلبية الاحتياجات الفريدة لكل عميل.",
        },
      ],
    },
  };
  return content[safeLang];
}

export default function AboutOurFocus({ lang }: AboutOurFocusProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const content = useMemo(() => getFocusContent(lang), [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-heading-wrap",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".why-heading-wrap", start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".why-cards-container",
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      className="relative isolate w-full overflow-hidden bg-[#0A0733] py-28 md:py-32"
    >
      <div className="absolute left-1/2 top-0 z-2 h-8 w-[34vw] min-w-60 max-w-160 -translate-x-1/2 rounded-b-[28px] bg-[#0A0733] shadow-[0_10px_30px_rgba(0,0,0,0.18)]" />
      <div className="absolute left-[calc(50%-17vw)] top-0 z-2 hidden h-8 w-10 rounded-br-3xl bg-[#0A0733] md:block" />
      <div className="absolute left-[calc(50%+17vw-2.5rem)] top-0 z-2 hidden h-8 w-10 rounded-bl-3xl bg-[#0A0733] md:block" />

      <div className="absolute bottom-0 left-1/2 z-2 h-10 w-[34vw] min-w-60 max-w-160 -translate-x-1/2 rounded-t-[28px] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-0 left-[calc(50%-17vw)] z-2 hidden h-10 w-10 rounded-tr-3xl bg-white md:block" />
      <div className="absolute bottom-0 left-[calc(50%+17vw-2.5rem)] z-2 hidden h-10 w-10 rounded-tl-3xl bg-white md:block" />

      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_30%,rgba(32,230,170,0.05),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 md:mb-20 text-center">
          <div className="why-heading-wrap opacity-0">
            <h2 className={content.headingClassName}>{content.heading}</h2>
          </div>
        </div>

        <div className="why-cards-container relative grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/10 md:grid-cols-3">
          {content.items.map((f, i) => (
            <div
              key={i}
              className="why-card group relative p-8 opacity-0 transition-colors duration-300 hover:bg-white/3 md:p-10 md:not-last:border-r md:border-white/10"
            >
              <span className="absolute inset-y-6 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-[#00FF85] opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100" />

              <div
                dir={content.isRtl ? "rtl" : "ltr"}
                className={content.cardAlignClassName}
              >
                <h3 className={content.cardTitleClassName}>{f.title}</h3>
                <p className={content.cardDescClassName}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
