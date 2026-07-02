"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      services: [
        {
          id: "dry-van",
          title: "Dry Van",
          description:
            "Reliable enclosed transport for palletized goods, household products, and commercial cargo, supported by Baharan Group’s experience in domestic trade and direct distribution across diverse market channels.",
          image: "/assets/images/domestic-trucking/dry-van.jpg",
        },
        {
          id: "reefer",
          title: "Refrigerated (Reefer)",
          description:
            "Temperature-controlled trucking for sensitive freight, designed to support product integrity, efficient supply chain execution, and consistent regional service performance.",
          image: "/assets/images/domestic-trucking/reefer.jpg",
        },
        {
          id: "flatbed",
          title: "Flatbed",
          description:
            "Specialized flatbed capacity for construction materials, industrial cargo, and irregular loads, aligned with extensive experience in the construction contracting sector and execution-focused coordination.",
          image: "/assets/images/domestic-trucking/flatbed.jpg",
        },
        {
          id: "ltl",
          title: "LTL (Less-Than-Truckload)",
          description:
            "Cost-efficient transport for partial loads, helping businesses optimize routing, manage shipping spend, and maintain flexibility across distribution and sales operations.",
          image: "/assets/images/domestic-trucking/ltl.jpg",
        },
        {
          id: "over-dimensional",
          title: "Over-Dimensional",
          description:
            "Managed transport for oversized freight with close attention to route planning, permits, safety, and execution, reflecting our strength in coordinating complex operational requirements.",
          image: "/assets/images/domestic-trucking/over-dimensional.jpg",
        },
        {
          id: "sensitive-cargo",
          title: "Sensitive Cargo",
          description:
            "Secure handling for fragile, high-value, or priority shipments, supported by disciplined logistics coordination, visibility, and a long-term commitment to quality assurance and customer experience.",
          image: "/assets/images/domestic-trucking/sensitive-cargo.jpg",
        },
      ] satisfies ServiceItem[],
    },
    fa: {
      dir: "rtl" as const,
      services: [
        {
          id: "dry-van",
          title: "تریلی چادری (Dry Van)",
          description:
            "حمل‌ونقل محصور و مطمئن برای کالاهای پالت‌شده، محصولات خانگی و بارهای تجاری، با پشتوانه تجربه گروه بهاران در تجارت داخلی و توزیع مستقیم در کانال‌های متنوع بازار.",
          image: "/assets/images/domestic-trucking/dry-van.jpg",
        },
        {
          id: "reefer",
          title: "یخچالی (Reefer)",
          description:
            "حمل‌ونقل با کنترل دما برای محموله‌های حساس، طراحی‌شده برای حفظ سلامت محصولات، اجرای کارآمد زنجیره تأمین و عملکرد ثابت خدمات در سطح منطقه‌ای.",
          image: "/assets/images/domestic-trucking/reefer.jpg",
        },
        {
          id: "flatbed",
          title: "کفی (Flatbed)",
          description:
            "ظرفیت تخصصی کفی برای مصالح ساختمانی، بارهای صنعتی و محموله‌های نامتعارف، همسو با تجربه گسترده در بخش پیمانکاری ساخت‌وساز و هماهنگی‌های مبتنی بر اجرای دقیق.",
          image: "/assets/images/domestic-trucking/flatbed.jpg",
        },
        {
          id: "ltl",
          title: "خرده‌بار (LTL)",
          description:
            "حمل‌ونقل مقرون‌به‌صرفه برای بارهای جزئی، که به کسب‌وکارها کمک می‌کند مسیرها را بهینه‌سازی کنند، هزینه‌های ارسال را مدیریت نمایند و انعطاف‌پذیری عملیات توزیع و فروش را حفظ کنند.",
          image: "/assets/images/domestic-trucking/ltl.jpg",
        },
        {
          id: "over-dimensional",
          title: "محموله‌های فوق‌سنگین",
          description:
            "مدیریت حمل‌ونقل محموله‌های ترافیکی با توجه ویژه به مسیریابی، مجوزها، ایمنی و اجرا، که نشان‌دهنده توانمندی ما در هماهنگ‌سازی الزامات پیچیده عملیاتی است.",
          image: "/assets/images/domestic-trucking/over-dimensional.jpg",
        },
        {
          id: "sensitive-cargo",
          title: "محموله‌های حساس",
          description:
            "جابه‌جایی ایمن محموله‌های شکننده، باارزش یا دارای اولویت، با پشتیبانی هماهنگی‌های منسجم لجستیکی، شفافیت و تعهد بلندمدت به تضمین کیفیت و تجربه مشتری.",
          image: "/assets/images/domestic-trucking/sensitive-cargo.jpg",
        },
      ] satisfies ServiceItem[],
    },
    ar: {
      dir: "rtl" as const,
      services: [
        {
          id: "dry-van",
          title: "الشاحنات المغلقة",
          description:
            "نقل آمن ومغلق للبضائع المعبأة والمنتجات المنزلية والشحنات التجارية، بدعم من خبرة مجموعة بهاران في التجارة الداخلية والتوزيع المباشر عبر قنوات السوق المختلفة.",
          image: "/assets/images/domestic-trucking/dry-van.jpg",
        },
        {
          id: "reefer",
          title: "الشاحنات المبردة",
          description:
            "نقل بدرجات حرارة يمكن التحكم بها للشحنات الحساسة، مصمم للحفاظ على سلامة المنتجات وتنفيذ سلسلة التوريد بكفاءة وضمان أداء خدمات إقليمي ثابت.",
          image: "/assets/images/domestic-trucking/reefer.jpg",
        },
        {
          id: "flatbed",
          title: "الشاحنات المسطحة",
          description:
            "قدرات مسطحة متخصصة لمواد البناء والشحنات الصناعية والأحمال غير المنتظمة، تتوافق مع الخبرة الواسعة في قطاع المقاولات الإنشائية والتنسيق المركز على التنفيذ.",
          image: "/assets/images/domestic-trucking/flatbed.jpg",
        },
        {
          id: "ltl",
          title: "حمولات جزئية (LTL)",
          description:
            "نقل فعال من حيث التكلفة للشحنات الجزئية، يساعد الشركات على تحسين مساراتها وإدارة تكاليف الشحن والحفاظ على المرونة عبر عمليات التوزيع والمبيعات.",
          image: "/assets/images/domestic-trucking/ltl.jpg",
        },
        {
          id: "over-dimensional",
          title: "الحمولات ذات الأبعاد الفائقة",
          description:
            "إدارة نقل الشحنات كبيرة الحجم مع الاهتمام الوثيق بتخطيط المسارات والتصاريح والسلامة والتنفيذ، مما يعكس قدراتنا في تنسيق المتطلبات التشغيلية المعقدة.",
          image: "/assets/images/domestic-trucking/over-dimensional.jpg",
        },
        {
          id: "sensitive-cargo",
          title: "الشحنات الحساسة",
          description:
            "مداولة آمنة للشحنات القابلة للكسر أو عالية القيمة أو ذات الأولوية، بدعم من تنسيق لوجستي منضبط وشفافية والتزام طويل الأمد بضمان الجودة وتجربة العملاء.",
          image: "/assets/images/domestic-trucking/sensitive-cargo.jpg",
        },
      ] satisfies ServiceItem[],
    },
  };

  return content[safeLang];
}

export default function TruckingScrollStack({ lang }: { lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const content = useMemo(() => getContent(lang), [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
        },
      });

      for (let i = 0; i < content.services.length - 1; i++) {
        tl.addLabel(`step${i + 1}`)
          .to(
            `.title-${i}`,
            { color: "rgba(255,255,255,0.75)", duration: 1 },
            `step${i + 1}`,
          )
          .to(
            `.title-${i + 1}`,
            { color: "rgba(255,255,255,1)", duration: 1 },
            `step${i + 1}`,
          )
          .to(
            `.accordion-${i}`,
            {
              maxHeight: 0,
              opacity: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 1,
            },
            `step${i + 1}`,
          )
          .to(
            `.accordion-${i + 1}`,
            {
              maxHeight: 300,
              opacity: 1,
              paddingTop: 16,
              paddingBottom: 12,
              duration: 1,
            },
            `step${i + 1}`,
          )
          .fromTo(
            `.image-${i + 1}`,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
            `step${i + 1}`,
          )
          .to(
            `.desc-${i}`,
            { autoAlpha: 0, y: -20, duration: 0.5 },
            `step${i + 1}`,
          )
          .to(
            `.desc-${i + 1}`,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            `step${i + 1}+=0.5`,
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [content.services.length]);

  const longestService = content.services.reduce((a, b) =>
    a.description.length > b.description.length ? a : b,
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden bg-[#06061A]"
      dir={content.dir}
    >
      <div className="relative h-full w-full">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/assets/videos/domestic-trucking-loop.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 z-1 bg-[#08101c]/35" />
        <div className="absolute inset-0 z-2 bg-linear-to-b from-[#07071c] via-transparent to-[#07071c]/20" />

        <div className="relative z-10 flex h-full items-center px-5 md:px-10 lg:px-16">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[0.92fr_0.88fr] lg:items-center">
            {/* LEFT PANEL */}
            <div
              className={`mx-auto w-full max-w-155 rounded-[34px] border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-[18px] md:p-8 ${
                content.dir === "rtl" ? "lg:mr-8" : "lg:ml-8"
              }`}
            >
              <div className="space-y-1">
                {content.services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`block w-full rounded-[18px] ${
                      content.dir === "rtl" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`title-${index} border-b border-white/10 px-4 py-4 text-[20px] leading-none tracking-[-0.04em] md:text-[24px] lg:text-[26px] font-medium`}
                      style={{
                        color:
                          index === 0
                            ? "rgba(255,255,255,1)"
                            : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {service.title}
                    </div>

                    <div
                      className={`accordion-${index} overflow-hidden`}
                      style={{
                        maxHeight: index === 0 ? "300px" : "0px",
                        opacity: index === 0 ? 1 : 0,
                        paddingTop: index === 0 ? "16px" : "0px",
                        paddingBottom: index === 0 ? "12px" : "0px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                      }}
                    >
                      <div className="overflow-hidden rounded-[20px] bg-black/20">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={900}
                          height={600}
                          className={`image-${index} h-32 w-full object-cover md:h-40 lg:h-44`}
                          style={{
                            clipPath:
                              index === 0
                                ? "inset(0% 0% 0% 0%)"
                                : "inset(100% 0% 0% 0%)",
                          }}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              className={`mx-auto flex w-full max-w-145 justify-center ${
                content.dir === "rtl" ? "lg:justify-start" : "lg:justify-end"
              }`}
            >
              <div
                className="relative w-full rounded-[34px] border border-white/10 p-6 text-white backdrop-blur-[18px] md:p-8 lg:p-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.10) 100%)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div className="opacity-0 pointer-events-none select-none">
                  <h2 className="mb-3 text-[26px] font-semibold leading-[1.15] tracking-tight md:text-[32px] lg:text-[36px]">
                    {longestService.title}
                  </h2>
                  <p className="max-w-[48ch] text-[14px] leading-[1.65] text-white/80 md:text-[15px] lg:text-[16px]">
                    {longestService.description}
                  </p>
                </div>

                {content.services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`desc-${index} absolute inset-0 flex flex-col justify-start p-6 md:p-8 lg:p-10`}
                    style={{
                      visibility: index === 0 ? "inherit" : "hidden",
                      opacity: index === 0 ? 1 : 0,
                      transform:
                        index === 0 ? "translateY(0px)" : "translateY(20px)",
                    }}
                  >
                    <h2 className="mb-3 text-[26px] font-semibold leading-[1.15] tracking-tight md:text-[32px] lg:text-[36px]">
                      {service.title}
                    </h2>
                    <p className="max-w-[48ch] text-[14px] leading-[1.65] text-white/80 md:text-[15px] lg:text-[16px]">
                      {service.description}
                    </p>
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
