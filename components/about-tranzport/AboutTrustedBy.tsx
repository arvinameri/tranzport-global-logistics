"use client";

import React, { useLayoutEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type AboutTrustedByProps = {
  lang: string;
};

type TrustedContent = {
  isRtl: boolean;
  prefix: string;
  labels: string[];
  prefixClassName: string;
  labelClassName: string;
  flexDirection: string;
  textAlignment: string;
};

function getTrustedContent(lang: string): TrustedContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, TrustedContent> = {
    en: {
      isRtl: false,
      prefix: "Trusted by",
      labels: ["Leaders", "Shippers", "Industry"],
      prefixClassName:
        "font-sans text-3xl font-light tracking-tight text-white/90 md:text-5xl lg:text-6xl leading-none",
      labelClassName:
        "font-sans text-4xl font-semibold tracking-tight leading-none md:text-5xl lg:text-6xl",
      flexDirection: "flex-row",
      textAlignment: "justify-start",
    },
    fa: {
      isRtl: true,
      prefix: "مورد اعتماد",
      labels: ["رهبران صنعت", "شرکت‌های حمل", "کسب‌وکارها"],
      prefixClassName:
        "font-vazirmatn text-[28px] font-medium tracking-tight text-white/90 md:text-[42px] lg:text-[52px] leading-none",
      labelClassName:
        "font-vazirmatn text-[32px] font-bold tracking-tight leading-none md:text-[48px] lg:text-[58px]",
      flexDirection: "flex-row-reverse",
      textAlignment: "justify-end",
    },
    ar: {
      isRtl: true,
      prefix: "موثوق من قبل",
      labels: ["قادة الصناعة", "شركات الشحن", "الأعمال التجارية"],
      prefixClassName:
        "font-vazirmatn text-[26px] font-medium tracking-tight text-white/90 md:text-[40px] lg:text-[50px] leading-none",
      labelClassName:
        "font-vazirmatn text-[30px] font-bold tracking-tight leading-none md:text-[46px] lg:text-[56px]",
      flexDirection: "flex-row-reverse",
      textAlignment: "justify-end",
    },
  };
  return content[safeLang];
}

export default function AboutTrustedBy({ lang }: AboutTrustedByProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLSpanElement[]>([]);
  const content = useMemo(() => getTrustedContent(lang), [lang]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);
      const total = items.length;
      if (!total) return;

      const inactive = {
        opacity: 0.15,
        scale: 0.85,
        color: "#ffffff",
        textShadow: "0 0 0px rgba(0,255,133,0)",
        transformOrigin: content.isRtl ? "right center" : "left center",
      };

      const active = {
        opacity: 1,
        scale: 1,
        color: "#00FF85",
        textShadow: "0 0 24px rgba(0,255,133,0.4)",
        transformOrigin: content.isRtl ? "right center" : "left center",
      };

      gsap.set(items, inactive);
      gsap.set(items[0], active);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${total * 100}%`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (total - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
        },
      });

      tl.to(
        trackRef.current,
        {
          yPercent: -(100 / total) * (total - 1),
          ease: "none",
          duration: total - 1,
        },
        0,
      );

      items.forEach((item, i) => {
        if (i < total - 1) {
          tl.to(item, { ...inactive, ease: "power2.inOut", duration: 1 }, i);
          tl.to(
            items[i + 1],
            { ...active, ease: "power2.inOut", duration: 1 },
            i,
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [content.isRtl]);

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      className="relative w-full bg-[#07071C]"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/videos/about/trusted-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#07071C]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,transparent,#07071C_70%)]" />

        <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-24">
          <div
            className={`flex items-center gap-4 md:gap-5 w-full ${content.flexDirection}`}
          >
            <h2
              dir={content.isRtl ? "rtl" : "ltr"}
              className={content.prefixClassName}
            >
              {content.prefix}
            </h2>

            <div className="relative h-10 md:h-15 lg:h-18 overflow-visible w-75 md:w-100 shrink-0">
              <div
                ref={trackRef}
                className="absolute top-0 left-0 flex flex-col w-full will-change-transform"
              >
                {content.labels.map((label, index) => (
                  <div
                    key={label}
                    className={`flex h-10 md:h-15 lg:h-18 items-center ${content.textAlignment}`}
                  >
                    <span
                      ref={(el) => {
                        if (el) itemRefs.current[index] = el;
                      }}
                      dir={content.isRtl ? "rtl" : "ltr"}
                      className={`block transition-transform ${content.labelClassName}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
