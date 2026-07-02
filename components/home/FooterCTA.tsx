"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppLocale, locales, normalizeLocale } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type FooterCTAProps = {
  lang?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
};

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterContent = {
  isRtlText: boolean;
  headingClassName: string;
  descriptionClassName: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  brandTitle: string;
  servicesTitle: string;
  companyTitle: string;
  socialTitle: string;
  tehranOfficeTitle: string;
  tehranOfficeText: string;
  zanjanOfficeTitle: string;
  zanjanOfficeText: string;
  sharjahOfficeTitle: string;
  sharjahOfficeText: string;
  copyright: string;
  services: FooterLinkItem[];
  company: FooterLinkItem[];
  social: FooterLinkItem[];
};

function getFooterContent(lang: string): FooterContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, FooterContent> = {
    en: {
      isRtlText: false,
      headingClassName:
        "scroll-green-text-white mb-5 font-manrope text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] md:mb-6 md:text-[3.25rem] lg:text-[4.15rem]",
      descriptionClassName:
        "mx-auto mb-10 max-w-[850px] text-base font-medium leading-relaxed text-[#9CA3AF] md:text-lg",
      primaryButtonText: "Request a Quote",
      secondaryButtonText: "Talk to a Logistics Expert",
      brandTitle: "BAHARAN GROUP",
      servicesTitle: "SERVICES",
      companyTitle: "COMPANY",
      socialTitle: "SOCIAL",
      tehranOfficeTitle: "Tehran Office:",
      tehranOfficeText:
        "Motahari Street, Mir Emad Street, First Alley, No. 5, Unit 5\nPostal Code: 1587937518",
      zanjanOfficeTitle: "Zanjan Office:",
      zanjanOfficeText:
        "22 Bahman Highway, opposite Gas Station, Baharan Commercial Complex",
      sharjahOfficeTitle: "Central Warehouse / Sharjah Office:",
      sharjahOfficeText: "—",
      copyright: "© 2025 BAHARAN GROUP.",
      services: [
        { label: "Ocean Freight", href: "/ocean-freight" },
        { label: "Air Freight", href: "/air-freight" },
        { label: "Customs Brokerage", href: "/customs-brokerage" },
        { label: "Domestic Trucking", href: "/domestic-trucking" },
        { label: "Project Cargo", href: "/project-cargo" },
        {
          label: "Warehousing & Distribution",
          href: "/warehousing-distribution",
        },
      ],
      company: [
        { label: "Technology", href: "/technology" },
        { label: "About Baharan Group", href: "/about-tranzport" },
        { label: "About Baharan Holding", href: "/about-corpac-group" },
        { label: "Case Studies and News", href: "/case-studies-news" },
        { label: "Contact", href: "/contact" },
      ],
      social: [
        { label: "Facebook", href: "https://facebook.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
      ],
    },
    fa: {
      isRtlText: true,
      headingClassName:
        "scroll-green-text-white mb-5 font-sans text-[2rem] font-semibold leading-[1.45] tracking-tight md:mb-6 md:text-[2.7rem] lg:text-[3.25rem]",
      descriptionClassName:
        "mx-auto mb-10 max-w-[850px] font-sans text-[15px] font-medium leading-[2.05] text-[#9CA3AF] md:text-[17px]",
      primaryButtonText: "درخواست استعلام",
      secondaryButtonText: "گفت‌وگو با کارشناس لجستیک",
      brandTitle: "گروه بهاران",
      servicesTitle: "خدمات",
      companyTitle: "شرکت",
      socialTitle: "شبکه‌های اجتماعی",
      tehranOfficeTitle: "دفتر تهران:",
      tehranOfficeText:
        "خیابان مطهری، خیابان میرعماد، کوچه اول، پلاک 5، واحد 5\nکد پستی: 1587937518",
      zanjanOfficeTitle: "دفتر زنجان:",
      zanjanOfficeText:
        "اتوبان 22 بهمن، روبه‌روی پمپ بنزین، مجتمع تجاری بهاران",
      sharjahOfficeTitle: "انبار مرکزی / دفتر شارجه:",
      sharjahOfficeText: "—",
      copyright: "© 2025 گروه بهاران.",
      services: [
        { label: "حمل‌ونقل دریایی", href: "/ocean-freight" },
        { label: "حمل‌ونقل هوایی", href: "/air-freight" },
        { label: "ترخیص و امور گمرکی", href: "/customs-brokerage" },
        { label: "حمل داخلی", href: "/domestic-trucking" },
        { label: "پروژه کارگو", href: "/project-cargo" },
        { label: "انبارداری و توزیع", href: "/warehousing-distribution" },
      ],
      company: [
        { label: "فناوری", href: "/technology" },
        { label: "درباره گروه بهاران", href: "/about-tranzport" },
        { label: "درباره هلدینگ بهاران", href: "/about-corpac-group" },
        { label: "مطالعات موردی و اخبار", href: "/case-studies-news" },
        { label: "تماس با ما", href: "/contact" },
      ],
      social: [
        { label: "فیسبوک", href: "https://facebook.com" },
        { label: "لینکدین", href: "https://linkedin.com" },
      ],
    },
    ar: {
      isRtlText: true,
      headingClassName:
        "scroll-green-text-white mb-5 font-sans text-[1.95rem] font-semibold leading-[1.5] tracking-tight md:mb-6 md:text-[2.65rem] lg:text-[3.2rem]",
      descriptionClassName:
        "mx-auto mb-10 max-w-[850px] font-sans text-[15px] font-medium leading-[2.05] text-[#9CA3AF] md:text-[17px]",
      primaryButtonText: "اطلب عرض سعر",
      secondaryButtonText: "تحدث مع خبير لوجستي",
      brandTitle: "مجموعة بهاران",
      servicesTitle: "الخدمات",
      companyTitle: "الشركة",
      socialTitle: "وسائل التواصل",
      tehranOfficeTitle: "مكتب طهران:",
      tehranOfficeText:
        "شارع مطهري، شارع مير عماد، الزقاق الأول، رقم 5، الوحدة 5\nالرمز البريدي: 1587937518",
      zanjanOfficeTitle: "مكتب زنجان:",
      zanjanOfficeText:
        "طريق 22 بهمن السريع، مقابل محطة الوقود، مجمع بهاران التجاري",
      sharjahOfficeTitle: "المستودع المركزي / مكتب الشارقة:",
      sharjahOfficeText: "—",
      copyright: "© 2025 مجموعة بهاران.",
      services: [
        { label: "الشحن البحري", href: "/ocean-freight" },
        { label: "الشحن الجوي", href: "/air-freight" },
        { label: "التخليص الجمركي", href: "/customs-brokerage" },
        { label: "النقل الداخلي", href: "/domestic-trucking" },
        { label: "شحن المشاريع", href: "/project-cargo" },
        { label: "التخزين والتوزيع", href: "/warehousing-distribution" },
      ],
      company: [
        { label: "التكنولوجيا", href: "/technology" },
        { label: "حول مجموعة بهاران", href: "/about-tranzport" },
        { label: "حول هولدينغ بهاران", href: "/about-corpac-group" },
        { label: "دراسات الحالة والأخبار", href: "/case-studies-news" },
        { label: "اتصل بنا", href: "/contact" },
      ],
      social: [
        { label: "فيسبوك", href: "https://facebook.com" },
        { label: "لينكدإن", href: "https://linkedin.com" },
      ],
    },
  };

  return content[safeLang];
}

export default function FooterCTA({
  lang,
  titleLine1,
  titleLine2,
  description,
}: FooterCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const params = useParams();

  const currentLang = useMemo(() => {
    const routeLang =
      typeof params?.lang === "string"
        ? params.lang
        : Array.isArray(params?.lang)
          ? params.lang[0]
          : undefined;

    return normalizeLocale(routeLang || lang);
  }, [params, lang]);

  const content = useMemo(() => getFooterContent(currentLang), [currentLang]);
  const isRtlText = content.isRtlText;

  const finalTitleLine1 =
    titleLine1 !== undefined
      ? titleLine1
      : isRtlText
        ? "بیایید تجارت شما را"
        : "Let's Move Your";

  const finalTitleLine2 =
    titleLine2 !== undefined
      ? titleLine2
      : isRtlText
        ? "به جلو پیش ببریم"
        : "Business Forward";

  const finalDescription =
    description !== undefined
      ? description
      : isRtlText
        ? "چه به هماهنگی جهانی بار نیاز داشته باشید و چه به یک استراتژی جامع لجستیکی — تیم ما آماده ارائه خدمات است."
        : "Whether you need global freight coordination or a full logistics strategy — our team is ready to deliver.";

  const hasTitleLine1 = finalTitleLine1.trim().length > 0;
  const hasTitleLine2 = finalTitleLine2.trim().length > 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dynamicHeadings = gsap.utils.toArray(
        ".scroll-green-text-white",
      ) as HTMLElement[];

      dynamicHeadings.forEach((heading) => {
        const words = heading.querySelectorAll(".word");
        if (!words.length) return;

        const turnWhite = () => {
          gsap.to(words, { color: "#FFFFFF", duration: 0.3, overwrite: true });
        };

        const stopTimer = gsap.delayedCall(0.15, turnWhite).pause();

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
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentLang]);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors duration-300 will-change-[color] ${
          isRtlText ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
        }`}
        style={{ color: "#FFFFFF" }}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full overflow-hidden bg-[#0a0f1c] pb-12 pt-40"
      dir="ltr"
    >
      <style>{`
        @keyframes flowLight {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-flow-left { animation: flowLight 7s linear infinite; }
        .animate-flow-right { animation: flowLight 8s linear infinite; }
      `}</style>

      <div className="pointer-events-none absolute left-0 top-0 z-30 flex w-full justify-center">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="h-10 w-full text-white md:h-14"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 L450,0 C500,0 520,60 580,60 L860,60 C920,60 940,0 990,0 L1440,0 L1440,-10 L0,-10 Z" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 opacity-100">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 180 0 L 180 180 Q 180 230 230 230 L 330 230 Q 380 230 380 280 L 380 900"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M 180 0 L 180 180 Q 180 230 230 230 L 330 230 Q 380 230 380 280 L 380 900"
            fill="none"
            stroke="#00FF85"
            strokeWidth="2.5"
            strokeDasharray="120 1880"
            strokeLinecap="round"
            className="animate-flow-left"
          />

          <path
            d="M 1440 230 L 1300 230 Q 1250 230 1250 280 L 1250 900"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M 1440 230 L 1300 230 Q 1250 230 1250 280 L 1250 900"
            fill="none"
            stroke="#00FF85"
            strokeWidth="2.5"
            strokeDasharray="150 1850"
            strokeLinecap="round"
            className="animate-flow-right"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto mb-32 mt-12 flex flex-col items-center px-6 text-center md:px-16">
        <div dir={isRtlText ? "rtl" : "ltr"} className="w-full text-center">
          <h2 className={`${content.headingClassName} text-center`}>
            {hasTitleLine1 && (
              <span
                className={`block text-center ${hasTitleLine2 ? "mb-1 md:mb-3" : ""}`}
              >
                {splitText(finalTitleLine1)}
              </span>
            )}

            {hasTitleLine2 && (
              <span className="block text-center">
                {splitText(finalTitleLine2)}
              </span>
            )}
          </h2>

          <p
            className={`${content.descriptionClassName} text-center`}
            dir={isRtlText ? "rtl" : "ltr"}
          >
            {finalDescription}
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href={`/${currentLang}/contact`}
            className={`flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#0a0f1c] shadow-md transition-transform hover:scale-105 sm:w-auto ${
              isRtlText ? "font-sans" : "font-manrope"
            }`}
          >
            {content.primaryButtonText}
          </Link>

          <a
            href="tel:+982188745272"
            className={`flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-[#00FF85] hover:bg-white/10 hover:text-[#00FF85] sm:w-auto ${
              isRtlText ? "font-sans" : "font-manrope"
            }`}
          >
            {content.secondaryButtonText}
          </a>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-16">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            className={`flex flex-col ${
              isRtlText ? "font-sans text-right" : "text-left"
            }`}
            dir={isRtlText ? "rtl" : "ltr"}
          >
            <h3 className="mb-6 text-2xl font-black tracking-tighter text-white not-italic">
              {content.brandTitle}
            </h3>

            <div className="mb-4 space-y-4 text-sm leading-relaxed text-gray-400">
              <div>
                <strong className="text-white">
                  {content.tehranOfficeTitle}
                </strong>
                <br />
                {content.tehranOfficeText.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < content.tehranOfficeText.split("\n").length - 1 ? (
                      <br />
                    ) : null}
                  </React.Fragment>
                ))}
              </div>

              <div>
                <strong className="text-white">
                  {content.zanjanOfficeTitle}
                </strong>
                <br />
                {content.zanjanOfficeText}
              </div>

              <div>
                <strong className="text-white">
                  {content.sharjahOfficeTitle}
                </strong>
                <br />
                {content.sharjahOfficeText}
              </div>
            </div>

            <a
              href="tel:+982188745272"
              className="mb-1 text-sm text-gray-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#00FF85]"
              dir="ltr"
            >
              +98 21 8874 5272
            </a>

            <a
              href="mailto:info@baharan.com"
              className="text-sm text-gray-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#00FF85]"
              dir="ltr"
            >
              info@baharan.com
            </a>
          </div>

          <div
            className={`flex flex-col ${
              isRtlText ? "font-sans text-right" : "text-left"
            }`}
            dir={isRtlText ? "rtl" : "ltr"}
          >
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              {content.servicesTitle}
            </h4>

            <ul className="flex flex-col gap-3">
              {content.services.map((link, i) => (
                <li key={i}>
                  <Link
                    href={`/${currentLang}${link.href}`}
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-[#00FF85]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`flex flex-col ${
              isRtlText ? "font-sans text-right" : "text-left"
            }`}
            dir={isRtlText ? "rtl" : "ltr"}
          >
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              {content.companyTitle}
            </h4>

            <ul className="flex flex-col gap-3">
              {content.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={`/${currentLang}${link.href}`}
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-[#00FF85]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`flex flex-col ${
              isRtlText ? "font-sans text-right" : "text-left"
            }`}
            dir={isRtlText ? "rtl" : "ltr"}
          >
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              {content.socialTitle}
            </h4>

            <ul className="flex flex-col gap-3">
              {content.social.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-[#00FF85]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-white/5 pt-8">
          <p
            className={`text-[11px] font-medium tracking-wide text-white/40 ${
              isRtlText ? "font-sans" : ""
            }`}
          >
            {content.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}
