"use client";

import { AppLocale, locales } from "@/i18nConfig";

interface ContactCTAProps {
  lang: string;
  titleTop: string;
  titleBottom: string;
  subtitle: string;
}

export default function ContactCTA({
  lang,
  titleTop,
  titleBottom,
  subtitle,
}: ContactCTAProps) {
  const isRtl =
    locales.includes(lang as AppLocale) && (lang === "fa" || lang === "ar");

  return (
    <section className="relative px-4 pb-24 pt-4 md:px-8">
      <div className="relative mx-auto max-w-7xl">
        {/*
          Curved connector lines (left + right brackets) coming down from the
          top section and curving inward toward the CTA.
        */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-40 w-full"
          viewBox="0 0 1200 160"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M120 0 L120 90 Q120 140 170 140 L520 140"
            stroke="#1f2a44"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M1080 0 L1080 90 Q1080 140 1030 140 L680 140"
            stroke="#1f2a44"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* CTA content */}
        <div dir={isRtl ? "rtl" : "ltr"} className="relative pt-16 text-center">
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            <span className="text-white">{titleTop}</span>
            <br />
            <span className="text-white/30">{titleBottom}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm text-gray-400 md:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
