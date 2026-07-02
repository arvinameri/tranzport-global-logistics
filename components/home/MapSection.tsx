"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

// مختصات ۲۷ نقطه در سراسر جهان
const MAP_LOCATIONS = [
  { id: 1, top: "32%", left: "18%" },
  { id: 2, top: "35%", left: "26%" },
  { id: 3, top: "45%", left: "20%" },
  { id: 4, top: "28%", left: "23%" },
  { id: 5, top: "40%", left: "15%" },
  { id: 6, top: "65%", left: "32%" },
  { id: 7, top: "58%", left: "28%" },
  { id: 8, top: "78%", left: "30%" },
  { id: 9, top: "28%", left: "48%" },
  { id: 10, top: "32%", left: "52%" },
  { id: 11, top: "38%", left: "46%" },
  { id: 12, top: "35%", left: "55%" },
  { id: 13, top: "50%", left: "48%" },
  { id: 14, top: "60%", left: "55%" },
  { id: 15, top: "70%", left: "54%" },
  { id: 16, top: "45%", left: "58%" },
  { id: 17, top: "42%", left: "60%" },
  { id: 18, top: "48%", left: "68%" },
  { id: 19, top: "52%", left: "72%" },
  { id: 20, top: "38%", left: "76%" },
  { id: 21, top: "45%", left: "80%" },
  { id: 22, top: "35%", left: "84%" },
  { id: 23, top: "25%", left: "70%" },
  { id: 24, top: "55%", left: "82%" },
  { id: 25, top: "75%", left: "82%" },
  { id: 26, top: "72%", left: "75%" },
  { id: 27, top: "82%", left: "88%" },
];

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      title: "Our Operational\nFootprint",
      description:
        "Offices, warehousing capacity, and\nconnected logistics hubs across key global markets",
      stat1Label: "Service coverage",
      stat1Value: "98 countries",
      stat2Label: "Warehousing network",
      stat2Value: "9 U.S. locations",
      stat3Label: "Global network affiliation",
      stat3Value: "Corpac Group",
      btnWorld: "World",
      btnUsa: "USA",
    },
    fa: {
      dir: "rtl" as const,
      title: "گستره عملیاتی\nما",
      description:
        "دفاتر، ظرفیت‌های انبارداری و\nقطب‌های لجستیکی متصل در بازارهای کلیدی جهان",
      stat1Label: "پوشش خدمات",
      stat1Value: "۹۸ کشور",
      stat2Label: "شبکه انبارداری",
      stat2Value: "۹ موقعیت در آمریکا",
      stat3Label: "وابستگی شبکه جهانی",
      stat3Value: "گروه کورپک",
      btnWorld: "جهان",
      btnUsa: "آمریکا",
    },
    ar: {
      dir: "rtl" as const,
      title: "بصمتنا\nالتشغيلية",
      description:
        "مكاتب وقدرات تخزينية و\nمراكز لوجستية متصلة عبر الأسواق العالمية الرئيسية",
      stat1Label: "تغطية الخدمات",
      stat1Value: "٩٨ دولة",
      stat2Label: "شبكة التخزين",
      stat2Value: "٩ مواقع في أمريكا",
      stat3Label: "الانتماء للشبكة العالمية",
      stat3Value: "مجموعة كورباك",
      btnWorld: "العالم",
      btnUsa: "أمريكا",
    },
  };

  return content[safeLang];
}

export default function MapSection({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const glows = gsap.utils.toArray(".dot-glow") as HTMLElement[];

      if (glows.length > 0) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: () => {
            if (Math.random() > 0.6) {
              const randomIdx = Math.floor(Math.random() * glows.length);
              const randomGlow = glows[randomIdx];

              gsap.fromTo(
                randomGlow,
                { scale: 1, opacity: 0.1 },
                {
                  scale: 1.6,
                  opacity: 0.6,
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                  ease: "power1.inOut",
                  overwrite: "auto",
                },
              );
            }
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full overflow-hidden bg-brand-dark py-24 md:py-32"
      dir={content.dir}
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* ستون راست/چپ بر اساس direction */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <h2 className="mb-4 whitespace-pre-line font-manrope text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {content.title}
            </h2>
            <p className="mb-12 whitespace-pre-line max-w-sm text-sm text-brand-gray md:text-base leading-relaxed">
              {content.description}
            </p>

            {/* کارت شیشه‌ای */}
            <div className="max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-white/20">
              <div className="mb-8">
                <span className="mb-1 block text-xs text-brand-gray">
                  {content.stat1Label}
                </span>
                <strong className="block font-manrope text-2xl font-medium text-white">
                  {content.stat1Value}
                </strong>
              </div>
              <div className="mb-8">
                <span className="mb-1 block text-xs text-brand-gray">
                  {content.stat2Label}
                </span>
                <strong className="block font-manrope text-2xl font-medium text-white">
                  {content.stat2Value}
                </strong>
              </div>
              <div>
                <span className="mb-1 block text-xs text-brand-gray">
                  {content.stat3Label}
                </span>
                <strong className="block font-manrope text-2xl font-medium text-white">
                  {content.stat3Value}
                </strong>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-center lg:col-span-7">
            {/* دکمه‌های World / USA */}
            <div className="mb-10 flex items-center rounded-full border border-white/10 bg-white/5 p-1">
              <button className="cursor-default rounded-full bg-white/10 px-8 py-2 text-sm font-medium text-white shadow-sm transition-all">
                {content.btnWorld}
              </button>
              <button className="cursor-pointer rounded-full px-8 py-2 text-sm font-medium text-brand-gray transition-all hover:text-white">
                {content.btnUsa}
              </button>
            </div>

            {/* کانتینر نقشه */}
            <div
              ref={mapContainerRef}
              className="relative aspect-4/3 w-full max-w-3xl"
              dir="ltr"
            >
              <img
                src="/assets/images/world-map.png"
                alt="BaharanGroup global logistics network map"
                className="pointer-events-none h-full w-full select-none object-contain opacity-50"
              />

              {MAP_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  style={{ top: loc.top, left: loc.left }}
                >
                  <div className="dot-glow absolute h-5 w-5 rounded-full bg-[#00FF85] opacity-10" />
                  <div className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#00FF85] shadow-[0_0_6px_#00FF85]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
