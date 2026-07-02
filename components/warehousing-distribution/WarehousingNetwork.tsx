"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, defaultLocale, isValidLocale } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  { id: 1, top: "39%", left: "18%" },
  { id: 2, top: "36%", left: "21%" },
  { id: 3, top: "43%", left: "24%" },
  { id: 4, top: "38%", left: "29%" },
  { id: 5, top: "44%", left: "33%" },
  { id: 6, top: "35%", left: "37%" },
  { id: 7, top: "46%", left: "40%" },
  { id: 8, top: "40%", left: "43%" },
  { id: 9, top: "33%", left: "47%" },
];

function normalizeLocale(value?: string): AppLocale {
  if (value && isValidLocale(value)) return value;
  return defaultLocale;
}

export default function WarehousingNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const lang = useMemo(() => {
    const rawLang =
      typeof params?.lang === "string"
        ? params.lang
        : Array.isArray(params?.lang)
          ? params.lang[0]
          : undefined;

    return normalizeLocale(rawLang);
  }, [params]);

  const isRtl = lang === "fa" || lang === "ar";

  const content: Record<
    AppLocale,
    {
      title: string;
      description: string;
      mapAlt: string;
    }
  > = {
    en: {
      title: "Global Warehousing Network",
      description:
        "9 strategic facilities across major global markets, offering scalable capacity, proximity to key ports, and seamless multimodal connectivity to support your distribution network.",
      mapAlt: "Tranzport global warehouse network map",
    },
    fa: {
      title: "شبکه جهانی انبارداری",
      description:
        "۹ مرکز استراتژیک در بازارهای مهم جهانی، با ظرفیت مقیاس‌پذیر، نزدیکی به بنادر کلیدی و اتصال یکپارچه چندوجهی برای پشتیبانی از شبکه توزیع شما.",
      mapAlt: "نقشه شبکه جهانی انبارداری ترنزپورت",
    },
    ar: {
      title: "شبكة التخزين العالمية",
      description:
        "9 مرافق استراتيجية عبر الأسواق العالمية الرئيسية، توفر طاقة استيعابية قابلة للتوسع، وقرباً من الموانئ الرئيسية، واتصالاً متعدد الوسائط بسلاسة لدعم شبكة التوزيع الخاصة بك.",
      mapAlt: "خريطة شبكة التخزين العالمية لترانزبورت",
    },
  };

  const t = content[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const glows = gsap.utils.toArray(".warehouse-dot-glow") as HTMLElement[];

      if (!glows.length) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: () => {
          if (Math.random() > 0.65) {
            const randomGlow = glows[Math.floor(Math.random() * glows.length)];

            gsap.fromTo(
              randomGlow,
              { scale: 1, opacity: 0.12 },
              {
                scale: 1.8,
                opacity: 0.6,
                duration: 0.35,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                overwrite: "auto",
              },
            );
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-brand-dark py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="mx-auto mb-14 max-w-4xl text-center md:mb-18"
        >
          <h2
            className={`text-4xl font-semibold text-white md:text-5xl lg:text-6xl ${
              isRtl
                ? "font-vazirmatn leading-[1.35] tracking-normal"
                : "leading-tight tracking-tight"
            }`}
          >
            {t.title}
          </h2>

          <p
            className={`mx-auto mt-5 max-w-3xl text-sm text-white/60 md:text-base lg:text-lg ${
              isRtl ? "font-vazirmatn leading-loose" : "leading-relaxed"
            }`}
          >
            {t.description}
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-video w-full">
            <img
              src="/assets/images/world-map.png"
              alt={t.mapAlt}
              className="pointer-events-none h-full w-full select-none object-contain opacity-55"
            />

            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: loc.top, left: loc.left }}
              >
                <div className="warehouse-dot-glow absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FF85] opacity-10" />
                <div className="relative z-10 h-2 w-2 rounded-full bg-[#00FF85] shadow-[0_0_10px_#00FF85]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
