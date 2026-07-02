"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales, getLocaleDirection } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] bg-[#06061C] text-white ${className}`}
    >
      {children}
    </div>
  );
}

function EdgeNotches({ leftBottom, rightTop, rightMiddle, topMiddle }: any) {
  return (
    <>
      {leftBottom && (
        <div className="absolute bottom-24 left-0 z-20 h-14 w-14 -translate-x-1/2 rounded-full bg-[#f5f4f1] md:h-16 md:w-16" />
      )}
      {rightTop && (
        <div className="absolute right-0 top-20 z-20 h-14 w-14 translate-x-1/2 rounded-full bg-[#f5f4f1] md:top-24 md:h-16 md:w-16" />
      )}
      {rightMiddle && (
        <div className="absolute right-0 top-1/2 z-20 h-14 w-14 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#f5f4f1] md:h-16 md:w-16" />
      )}
      {topMiddle && (
        <div className="absolute left-1/2 top-0 z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f4f1] md:h-16 md:w-16" />
      )}
    </>
  );
}

function getPlatformGridContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";
  return {
    en: {
      card1Title: "ERP / EDI / API Integrations",
      card1Desc:
        "Seamlessly connect BaharanGroup with your ERP, TMS, and internal operating systems. Information moves accurately across workflows, reducing manual intervention, improving coordination, and supporting more reliable execution.",
      card2Title: "Real-Time Shipment Tracking",
      card2Desc:
        "Monitor shipments across ocean, air, and road in real time. Our technology captures operational data, highlights exceptions early, and keeps every shipment visible from origin to final delivery.",
      card3Title: "Powered by CargoWise NEO",
      card3Desc:
        "Core capabilities operate on the industry-recognized CargoWise NEO platform, supporting accuracy, scalability, compliance, and stronger operational consistency across complex supply chain environments.",
      card4Title: "Dashboard & Reporting Tools",
      card4Desc:
        "Custom dashboards provide a centralized view of KPIs, milestones, shipment status, and compliance checkpoints, helping teams respond faster and make better operational decisions before delays escalate.",
    },
    fa: {
      card1Title: "ادغام با ERP / EDI / API",
      card1Desc:
        "سیستم‌های داخلی، TMS و ERP خود را به‌طور یکپارچه به گروه بهاران متصل کنید. اطلاعات به‌دقت منتقل می‌شود و دخالت دستی کاهش می‌یابد.",
      card2Title: "رهگیری محموله در لحظه",
      card2Desc:
        "محموله‌های خود را در مسیرهای دریایی، هوایی و جاده‌ای به‌صورت زنده مانیتور کنید. فناوری ما استثنائات را زودتر شناسایی می‌کند و شفافیت کامل را تا مقصد حفظ می‌کند.",
      card3Title: "پشتیبانی شده توسط CargoWise NEO",
      card3Desc:
        "قابلیت‌های اصلی ما بر بستر قدرتمند و شناخته‌شده CargoWise NEO عمل می‌کنند، که از دقت، مقیاس‌پذیری، انطباق‌پذیری و ثبات عملیاتی بالاتر در محیط‌های پیچیده زنجیره تامین پشتیبانی می‌کند.",
      card4Title: "داشبورد و ابزارهای گزارش‌گیری",
      card4Desc:
        "داشبوردهای سفارشی نمایی متمرکز از شاخص‌های کلیدی (KPI)، وضعیت محموله‌ها و وضعیت گمرکی ارائه می‌دهند و به تیم‌ها کمک می‌کنند تصمیمات بهتری بگیرند.",
    },
    ar: {
      card1Title: "تكامل ERP / EDI / API",
      card1Desc:
        "اربط أنظمة التشغيل الداخلية لديك بسلاسة مع مجموعة بهاران. تتحرك المعلومات بدقة، مما يقلل من التدخل اليدوي ويحسن التنسيق.",
      card2Title: "تتبع الشحنات في الوقت الفعلي",
      card2Desc:
        "راقب الشحنات عبر البحر والجو والطرق البرية. تلتقط تقنيتنا البيانات التشغيلية وتحافظ على رؤية كل شحنة حتى التسليم النهائي.",
      card3Title: "مدعوم من CargoWise NEO",
      card3Desc:
        "تعمل القدرات الأساسية على منصة CargoWise NEO الرائدة، مما يدعم الدقة وقابلية التوسع والاتساق التشغيلي في بيئات سلسلة التوريد المعقدة.",
      card4Title: "أدوات لوحة القيادة وإعداد التقارير",
      card4Desc:
        "توفر لوحات القيادة المخصصة عرضًا مركزيًا لمؤشرات الأداء الرئيسية وحالة الشحنات، مما يساعد الفرق على الاستجابة بشكل أسرع.",
    },
  }[safeLang];
}

export default function TechnologyPlatformGrid({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const content = useMemo(() => getPlatformGridContent(lang), [lang]);
  const dir = getLocaleDirection(lang);
  const isRtl = dir === "rtl";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dynamicHeadings = gsap.utils.toArray(
        ".scroll-green-text",
      ) as HTMLElement[];

      dynamicHeadings.forEach((heading) => {
        const words = heading.querySelectorAll(".word");
        if (!words.length) return;

        const turnWhite = () =>
          gsap.to(words, { color: "#F8FAFC", duration: 0.28, overwrite: true });

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
                amount: 0.18,
                from: self.direction === 1 ? "start" : "end",
              },
              overwrite: "auto",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  // حذف کامل کلاس‌های مخرب (inline-block و margins)
  // با این روش مرورگر ذاتاً کلمات ترکیبی انگلیسی/فارسی را درست می‌چیند
  const splitText = (text: string) => {
    return text.split(" ").map((word, i, arr) => (
      <React.Fragment key={i}>
        <span
          className="word transition-colors duration-300 will-change-[color]"
          style={{ color: "#F8FAFC" }}
        >
          {word}
        </span>
        {i < arr.length - 1 && " "}
      </React.Fragment>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f5f4f1] pb-24 pt-8 md:pb-28 lg:pb-32"
      dir={dir}
    >
      <div className="mx-auto w-full max-w-387.5 px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.28fr] xl:gap-10">
          {/* Card 1 */}
          <CardShell className="min-h-135 lg:min-h-160">
            <EdgeNotches leftBottom={!isRtl} rightBottom={isRtl} />
            <div className="relative z-10 p-8 md:p-10 lg:p-11">
              <h2
                className={`scroll-green-text block max-w-120 text-[28px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[34px] lg:text-[42px] ${
                  isRtl ? "font-sans leading-[1.4]" : "font-manrope"
                }`}
              >
                {splitText(content.card1Title)}
              </h2>
              <p
                className={`mt-5 max-w-140 text-[14px] leading-[1.65] tracking-[-0.01em] text-white/68 md:text-[15px] lg:text-[16px] ${
                  isRtl ? "font-sans leading-[1.8]" : ""
                }`}
              >
                {content.card1Desc}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[42%] md:h-[44%]">
              <img
                src="/assets/images/technology/erp-edi-api.jpg"
                alt="Integrations"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#06061C]/15 via-[#06061C]/25 to-transparent" />
            </div>
          </CardShell>

          <div className="grid grid-cols-1 gap-8 xl:gap-10">
            {/* Card 2 */}
            <CardShell className="min-h-75 md:min-h-85 lg:min-h-92.5">
              <EdgeNotches
                rightTop={!isRtl}
                rightMiddle={!isRtl}
                leftTop={isRtl}
                leftMiddle={isRtl}
              />
              <div className="absolute inset-x-0 top-0 h-[38%] overflow-hidden md:h-[40%]">
                <img
                  src="/assets/images/technology/tracking-grid-pattern.jpg"
                  alt="Tracking"
                  className="h-full w-full object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#06061C]/8 via-[#06061C]/22 to-[#06061C]/72" />
              </div>
              <div className="relative z-10 flex h-full items-end p-8 md:p-10 lg:p-11">
                <div className="max-w-175 pt-22 md:pt-25 lg:pt-27.5">
                  <h2
                    className={`scroll-green-text block max-w-130 text-[27px] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[33px] lg:text-[40px] ${
                      isRtl ? "font-sans leading-[1.4]" : "font-manrope"
                    }`}
                  >
                    {splitText(content.card2Title)}
                  </h2>
                  <p
                    className={`mt-4 max-w-180 text-[14px] leading-[1.65] tracking-[-0.01em] text-white/68 md:text-[15px] lg:text-[16px] ${
                      isRtl ? "font-sans leading-[1.8]" : ""
                    }`}
                  >
                    {content.card2Desc}
                  </p>
                </div>
              </div>
            </CardShell>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1fr] xl:gap-10">
              {/* Card 3 */}
              <CardShell className="min-h-70 md:min-h-80 lg:min-h-87.5">
                <div className="p-8 md:p-10 lg:p-11">
                  <h3
                    className={`scroll-green-text block max-w-65 text-[25px] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[31px] lg:text-[37px] ${
                      isRtl ? "font-sans leading-[1.4]" : "font-manrope"
                    }`}
                  >
                    {splitText(content.card3Title)}
                  </h3>
                  <p
                    className={`mt-4 max-w-[320px] text-[13.5px] leading-[1.65] tracking-[-0.01em] text-white/68 md:text-[14.5px] lg:text-[15.5px] ${
                      isRtl ? "font-sans leading-[1.8]" : ""
                    }`}
                  >
                    {content.card3Desc}
                  </p>
                </div>
              </CardShell>

              {/* Card 4 */}
              <CardShell className="min-h-70 md:min-h-80 lg:min-h-87.5">
                <EdgeNotches topMiddle />
                <div
                  className={`absolute bottom-0 h-24 w-24 md:h-32 md:w-32 lg:h-36 lg:w-36 ${
                    isRtl ? "left-0" : "right-0"
                  }`}
                >
                  <img
                    src="/assets/images/technology/dashboard-reporting-pattern.jpg"
                    alt="Dashboard"
                    className="h-full w-full object-cover opacity-95"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#06061C]/15 to-transparent" />
                </div>
                <div
                  className={`relative z-10 p-8 md:p-10 lg:p-11 ${
                    isRtl
                      ? "pl-14 md:pl-18 lg:pl-22"
                      : "pr-14 md:pr-18 lg:pr-22"
                  }`}
                >
                  <h3
                    className={`scroll-green-text block max-w-85 text-[25px] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[31px] lg:text-[37px] ${
                      isRtl ? "font-sans leading-[1.4]" : "font-manrope"
                    }`}
                  >
                    {splitText(content.card4Title)}
                  </h3>
                  <p
                    className={`mt-4 max-w-97.5 text-[13.5px] leading-[1.65] tracking-[-0.01em] text-white/68 md:text-[14.5px] lg:text-[15.5px] ${
                      isRtl ? "font-sans leading-[1.8]" : ""
                    }`}
                  >
                    {content.card4Desc}
                  </p>
                </div>
              </CardShell>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
