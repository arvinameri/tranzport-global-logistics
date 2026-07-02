"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppLocale, locales, getLocaleDirection } from "@/i18nConfig";

function getHeroContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      brand: "Baharan Group",
      title: "Project Cargo Backed by Experience and Precision",
      description:
        "Supported by extensive experience in construction contracting, commercial sales, and supply chain integration, Baharan manages heavy, oversized, and sensitive cargo with disciplined execution, operational coordination, and reliable delivery standards.",
      btnPrimary: "Start a Shipment",
      btnSecondary: "Talk to a Logistics Expert",
    },
    fa: {
      brand: "گروه بهاران",
      title: "پروژه کارگو با پشتوانه تجربه و دقت",
      description:
        "با تکیه بر تجربه گسترده در پیمانکاری ساخت‌وساز، فروش تجاری و یکپارچه‌سازی زنجیره تامین، گروه بهاران محموله‌های سنگین، فوق‌سنگین و حساس را با اجرای دقیق، هماهنگی عملیاتی و استانداردهای مطمئن مدیریت می‌کند.",
      btnPrimary: "شروع حمل‌ونقل",
      btnSecondary: "گفت‌وگو با کارشناس لجستیک",
    },
    ar: {
      brand: "مجموعة بهاران",
      title: "شحن المشاريع مدعوم بالخبرة والدقة",
      description:
        "بدعم من خبرة واسعة في مقاولات البناء والمبيعات التجارية وتكامل سلسلة التوريد، تدير مجموعة بهاران الشحنات الثقيلة والضخمة والحساسة بتنفيذ منضبط وتنسيق تشغيلي ومعايير تسليم موثوقة.",
      btnPrimary: "ابدأ الشحن",
      btnSecondary: "تحدث مع خبير لوجستي",
    },
  };

  return content[safeLang];
}

export default function ProjectCargoHero({ lang }: { lang: string }) {
  const content = useMemo(() => getHeroContent(lang), [lang]);
  const dir = getLocaleDirection(lang);
  const isRtl = dir === "rtl";

  return (
    <section
      className="bg-[#07071C] px-3 pb-4 pt-24 md:px-4 md:pb-6 md:pt-28 lg:px-5 lg:pt-32"
      dir={dir}
    >
      <div className="mx-auto grid w-full max-w-480 grid-cols-1 gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Left content: Text & Buttons */}
        <div className="relative flex min-h-135 flex-col justify-between rounded-[34px] bg-[#F4F4F1] px-7 py-8 md:min-h-170 md:px-10 md:py-10 lg:min-h-215 lg:px-14 lg:py-12">
          {/* Brand / Top Tag */}
          <div
            className={`text-[17px] font-black uppercase italic tracking-[-0.02em] text-[#0B0B2A] md:text-[19px] lg:text-[22px] ${
              isRtl ? "font-sans font-bold" : ""
            }`}
          >
            {content.brand}
          </div>

          <div className="flex flex-col gap-4 lg:gap-5">
            <h1
              className={`max-w-[14ch] text-[36px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0A0A28] md:text-[46px] lg:text-[56px] xl:text-[62px] ${
                isRtl ? "font-sans leading-[1.3]" : ""
              }`}
            >
              {content.title}
            </h1>

            <p
              className={`max-w-[40ch] text-[15px] leading-normal tracking-[-0.01em] text-[#767688] md:text-[16px] lg:text-[17px] ${
                isRtl ? "font-sans leading-[1.8]" : ""
              }`}
            >
              {content.description}
            </p>

            <div className="mt-1 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/contact`}
                className={`inline-flex items-center justify-center rounded-full bg-[#2CC36B] px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-white transition hover:bg-[#25af5f] md:px-7 md:py-3.5 md:text-[15px] lg:px-8 lg:py-4 lg:text-[16px] ${
                  isRtl ? "font-sans font-bold" : ""
                }`}
              >
                {content.btnPrimary}
              </Link>

              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-[#11112D] shadow-sm transition hover:bg-[#f0f0f0] md:px-7 md:py-3.5 md:text-[15px] lg:px-8 lg:py-4 lg:text-[16px] ${
                  isRtl ? "font-sans font-bold" : ""
                }`}
              >
                {content.btnSecondary}
              </button>
            </div>
          </div>
        </div>

        {/* Right content: Image */}
        <div className="relative min-h-135 overflow-hidden rounded-[34px] bg-[#14142F] md:min-h-170 lg:min-h-215">
          <Image
            src="/assets/images/project-cargo/project-cargo-hero.jpg"
            alt="Project Cargo Logistics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
