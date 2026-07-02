"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_DATA = [
  "CN: 894021 • SHANGHAI > ROTTERDAM • IN TRANSIT",
  "CN: 772109 • DUBAI > HAMBURG • DELIVERED",
  "CN: 129044 • NEW YORK > LONDON • CUSTOMS CLEARED",
  "CN: 550123 • TOKYO > LOS ANGELES • ARRIVED AT PORT",
];

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      eyebrow: (
        <>
          <span className="highlight-text transition-colors">BIG</span> Trade.{" "}
          <span className="highlight-text transition-colors">BIG</span> Trust.{" "}
          <span className="highlight-text transition-colors">BIG</span> Insight.
        </>
      ),
      headlinePart1: "Global trade",
      headlinePart2: "Supplier & logistics",
      cta: "Request a Quote",
    },
    fa: {
      dir: "rtl" as const,
      eyebrow: (
        <>
          تجارت <span className="highlight-text transition-colors">بزرگ</span>.{" "}
          اعتماد <span className="highlight-text transition-colors">بزرگ</span>.{" "}
          بینش <span className="highlight-text transition-colors">بزرگ</span>.
        </>
      ),
      headlinePart1: "تجارت جهانی",
      headlinePart2: "تأمین و لجستیک",
      cta: "درخواست استعلام",
    },
    ar: {
      dir: "rtl" as const,
      eyebrow: (
        <>
          تجارة <span className="highlight-text transition-colors">كبرى</span>.{" "}
          ثقة <span className="highlight-text transition-colors">كبرى</span>.{" "}
          رؤية <span className="highlight-text transition-colors">كبرى</span>.
        </>
      ),
      headlinePart1: "التجارة العالمية",
      headlinePart2: "الموردين واللوجستيات",
      cta: "اطلب عرض سعر",
    },
  };

  return content[safeLang];
}

export default function HeroSection({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isRtl = content.dir === "rtl";
  const ctaHref = `/${lang}/contact`;

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const tryPlay = () => {
        video.play().catch(() => {});
      };

      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener("loadeddata", tryPlay, { once: true });
      }
    }

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(".highlight-text");

      gsap.to(targets, {
        color: "#00FF85",
        duration: 0.1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden bg-brand-dark"
      dir={content.dir}
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-screen flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl pt-14">
          <h2
            className={`mb-5 text-white/88 antialiased md:text-[14px] ${
              isRtl
                ? "font-vazirmatn text-[11px] font-semibold leading-[1.85] tracking-[0.05em] md:tracking-[0.08em]"
                : "font-manrope text-[10px] font-semibold uppercase leading-[1.7] tracking-[0.24em] md:tracking-[0.28em]"
            }`}
          >
            {content.eyebrow}
          </h2>

          {/* === این بخش تیتر اصلی است که حرفه‌ای‌تر و کمی کوچک‌تر شده === */}
          <h1
            className={`text-white ${
              isRtl
                ? "font-vazirmatn text-[2.1rem] font-bold leading-tight tracking-[-0.02em] md:text-[3.1rem] lg:text-[3.6rem]"
                : "font-sans text-[2.3rem] font-bold leading-[1.05] tracking-[-0.03em] md:text-[3.6rem] lg:text-[4rem]"
            }`}
          >
            {content.headlinePart1}
            <br />
            <span className="bg-linear-to-r from-white/95 via-white/80 to-white/55 bg-clip-text text-transparent">
              {content.headlinePart2}
            </span>
          </h1>
          {/* === پایان تغییر تیتر === */}

          <div className="mt-9 flex flex-wrap items-center gap-6 md:mt-10">
            <Link
              href={ctaHref}
              className={`group relative overflow-hidden rounded-full bg-[#00FF85] px-7 py-3.5 text-[13px] text-[#07111a] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,255,133,0.45)] md:px-8 md:py-4 ${
                isRtl
                  ? "font-vazirmatn font-bold tracking-normal"
                  : "font-manrope font-extrabold uppercase tracking-[0.14em]"
              }`}
            >
              <span className="relative z-10">{content.cta}</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 z-20 w-full border-t border-white/10 bg-black/75 py-3 backdrop-blur-xl"
        dir="ltr"
      >
        <div className="flex w-max animate-marquee gap-20 whitespace-nowrap pl-4">
          {[...MARQUEE_DATA, ...MARQUEE_DATA].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#00FF85]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/90">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
