"use client";

import React, { useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { AppLocale, locales } from "@/i18nConfig";

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      brand: "Baharan Group",
      title: "Customs Brokerage You Can Trust",
      description:
        "Part of Baharan Group's integrated approach to trade and logistics, our customs brokerage services support smooth, compliant border crossings so your supply chain can focus on market development and long-term performance.",
      primaryCta: "Start a Shipment",
      secondaryCta: "Talk to a Logistics Expert",
    },
    fa: {
      dir: "rtl" as const,
      brand: "گروه بهاران",
      title: "خدمات ترخیص گمرکی قابل اعتماد",
      description:
        "به‌عنوان بخشی از رویکرد یکپارچه گروه بهاران در تجارت و لجستیک، خدمات ترخیص گمرکی ما عبور روان و منطبق با مقررات از مرزها را پشتیبانی می‌کند تا زنجیره تأمین شما بر توسعه بازار و عملکرد بلندمدت متمرکز بماند.",
      primaryCta: "شروع فرایند حمل",
      secondaryCta: "گفت‌وگو با کارشناس لجستیک",
    },
    ar: {
      dir: "rtl" as const,
      brand: "مجموعة بهاران",
      title: "خدمات تخليص جمركي يمكنك الوثوق بها",
      description:
        "كجزء من نهج مجموعة بهاران المتكامل في التجارة والخدمات اللوجستية، تدعم خدمات التخليص الجمركي لدينا عبوراً سلساً ومتوافقاً عبر الحدود حتى تتمكن سلسلة التوريد لديكم من التركيز على تطوير السوق والأداء طويل الأمد.",
      primaryCta: "ابدأ عملية الشحن",
      secondaryCta: "تحدث إلى خبير لوجستي",
    },
  };

  return content[safeLang];
}

export default function CustomsHero({ lang }: { lang: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const content = useMemo(() => getContent(lang), [lang]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section
      dir={content.dir}
      className="bg-[#07071C] px-3 pb-4 pt-24 md:px-4 md:pb-6 md:pt-28 lg:px-5 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-480 grid-cols-1 gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative flex min-h-135 flex-col justify-between rounded-[34px] bg-[#F4F4F1] px-7 py-8 md:min-h-170 md:px-10 md:py-10 lg:min-h-215 lg:px-14 lg:py-12">
          <div className="text-[17px] font-black uppercase italic tracking-[-0.02em] text-[#0B0B2A] md:text-[19px] lg:text-[22px]">
            {content.brand}
          </div>

          <div className="flex flex-col gap-4 lg:gap-5">
            <h1 className="max-w-[14ch] text-[36px] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0A0A28] md:text-[46px] lg:text-[56px] xl:text-[62px]">
              {content.title}
            </h1>

            <p className="max-w-[40ch] text-[15px] leading-normal tracking-[-0.01em] text-[#767688] md:text-[16px] lg:text-[17px]">
              {content.description}
            </p>

            <div className="mt-1 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-[#2CC36B] px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-white transition hover:bg-[#25af5f] md:px-7 md:py-3.5 md:text-[15px] lg:px-8 lg:py-4 lg:text-[16px]"
              >
                {content.primaryCta}
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[14px] font-medium tracking-[-0.01em] text-[#11112D] shadow-sm transition hover:bg-[#f0f0f0] md:px-7 md:py-3.5 md:text-[15px] lg:px-8 lg:py-4 lg:text-[16px]"
              >
                {content.secondaryCta}
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-135 overflow-hidden rounded-[34px] bg-[#14142F] md:min-h-170 lg:min-h-215">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="/assets/videos/customs/customs-hero.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
