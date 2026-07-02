"use client";

import React, { useEffect, useMemo, useRef } from "react";
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

type AirScrollStackProps = {
  lang: string;
};

function getServices(lang: string): ServiceItem[] {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, ServiceItem[]> = {
    en: [
      {
        id: "international",
        title: "International Air Freight",
        description:
          "Seamless global shipping solutions connecting your business to major markets. Backed by our proven track record with international companies like P&G and Zarsima Qeshm, we ensure your cargo arrives on time, every time.",
        image: "/assets/images/air-freight/international.jpg",
      },
      {
        id: "domestic",
        title: "Domestic Air Freight",
        description:
          "Reliable solutions for internal shipping. Leveraging our extensive network of local connections and expertise with brands like Azarakhsh, our domestic services ensure fast transit and optimal supply chain efficiency.",
        image: "/assets/images/air-freight/domestic.jpg",
      },
      {
        id: "charters",
        title: "Charters & Hand-Carry",
        description:
          "Urgent shipments demand special attention. Our charter services provide dedicated capacity and expert coordination, aligned with Baharan Group’s commitment to quality assurance, speed, and sustainable value creation.",
        image: "/assets/images/air-freight/charters.jpg",
      },
    ],
    fa: [
      {
        id: "international",
        title: "حمل‌ونقل هوایی بین‌المللی",
        description:
          "راهکارهای یکپارچه حمل جهانی که کسب‌وکار شما را به بازارهای اصلی متصل می‌کند. با پشتوانه سابقه موفق همکاری با شرکت‌های بین‌المللی، محموله‌های شما را همیشه به‌موقع و با اطمینان به مقصد می‌رسانیم.",
        image: "/assets/images/air-freight/international.jpg",
      },
      {
        id: "domestic",
        title: "حمل‌ونقل هوایی داخلی",
        description:
          "راهکارهای مطمئن برای جابه‌جایی داخلی. با اتکا به شبکه گسترده ارتباطات محلی و تجربه عملیاتی ما، خدمات داخلی ما ترانزیت سریع‌تر و کارایی بهتر زنجیره تأمین را تضمین می‌کند.",
        image: "/assets/images/air-freight/domestic.jpg",
      },
      {
        id: "charters",
        title: "چارتر و حمل فوری همراه",
        description:
          "محموله‌های فوری نیازمند توجهی ویژه هستند. خدمات چارتر ما ظرفیت اختصاصی و هماهنگی حرفه‌ای فراهم می‌کند؛ کاملاً همسو با تعهد گروه بهاران به کیفیت، سرعت و خلق ارزش پایدار.",
        image: "/assets/images/air-freight/charters.jpg",
      },
    ],
    ar: [
      {
        id: "international",
        title: "الشحن الجوي الدولي",
        description:
          "حلول شحن عالمية سلسة تربط أعمالكم بالأسواق الرئيسية. وبالاستناد إلى سجلنا المهني الناجح، نضمن وصول شحناتكم في الوقت المحدد في كل مرة.",
        image: "/assets/images/air-freight/international.jpg",
      },
      {
        id: "domestic",
        title: "الشحن الجوي المحلي",
        description:
          "حلول موثوقة للشحن الداخلي. من خلال شبكتنا الواسعة من العلاقات المحلية وخبرتنا التشغيلية، تضمن خدماتنا المحلية سرعة العبور وكفاءة أفضل لسلسلة الإمداد.",
        image: "/assets/images/air-freight/domestic.jpg",
      },
      {
        id: "charters",
        title: "الرحلات المستأجرة والحمل اليدوي",
        description:
          "الشحنات العاجلة تحتاج إلى عناية خاصة. توفر خدماتنا المستأجرة سعة مخصصة وتنسيقاً احترافياً، بما ينسجم مع التزام مجموعة بهاران بالجودة والسرعة وخلق القيمة المستدامة.",
        image: "/assets/images/air-freight/charters.jpg",
      },
    ],
  };

  return content[safeLang];
}

function getDirectionalConfig(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  if (safeLang === "fa" || safeLang === "ar") {
    return {
      dir: "rtl" as const,
      textAlignClass: "text-right",
      rightPanelAlign: "items-end text-right",
      descMaxWidthClass: "max-w-[26ch]",
    };
  }

  return {
    dir: "ltr" as const,
    textAlignClass: "text-left",
    rightPanelAlign: "items-start text-left",
    descMaxWidthClass: "max-w-[24ch]",
  };
}

export default function AirScrollStack({ lang }: AirScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const services = useMemo(() => getServices(lang), [lang]);
  const directional = useMemo(() => getDirectionalConfig(lang), [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      tl.addLabel("step1")
        .to(
          ".title-0",
          { color: "rgba(255,255,255,0.75)", duration: 1 },
          "step1",
        )
        .to(".title-1", { color: "rgba(255,255,255,1)", duration: 1 }, "step1")
        .to(
          ".accordion-0",
          {
            maxHeight: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 1,
          },
          "step1",
        )
        .to(
          ".accordion-1",
          {
            maxHeight: 500,
            opacity: 1,
            paddingTop: 20,
            paddingBottom: 12,
            duration: 1,
          },
          "step1",
        )
        .fromTo(
          ".image-1",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          "step1",
        )
        .to(".desc-0", { autoAlpha: 0, y: -20, duration: 0.5 }, "step1")
        .to(".desc-1", { autoAlpha: 1, y: 0, duration: 0.5 }, "step1+=0.5");

      tl.addLabel("step2")
        .to(
          ".title-1",
          { color: "rgba(255,255,255,0.75)", duration: 1 },
          "step2",
        )
        .to(".title-2", { color: "rgba(255,255,255,1)", duration: 1 }, "step2")
        .to(
          ".accordion-1",
          {
            maxHeight: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 1,
          },
          "step2",
        )
        .to(
          ".accordion-2",
          {
            maxHeight: 500,
            opacity: 1,
            paddingTop: 20,
            paddingBottom: 12,
            duration: 1,
          },
          "step2",
        )
        .fromTo(
          ".image-2",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          "step2",
        )
        .to(".desc-1", { autoAlpha: 0, y: -20, duration: 0.5 }, "step2")
        .to(".desc-2", { autoAlpha: 1, y: 0, duration: 0.5 }, "step2+=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const longestService = services.reduce((a, b) =>
    a.description.length > b.description.length ? a : b,
  );

  return (
    <section
      ref={containerRef}
      className="relative h-dvh w-full overflow-hidden bg-[#06061A]"
    >
      <div className="relative h-full w-full">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/videos/air-freight-loop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-1 bg-[#08101c]/35" />
        <div className="absolute inset-0 z-2 bg-linear-to-b from-[#07071c] via-transparent to-[#07071c]/20" />

        <div className="absolute left-0 top-0 z-5 h-8 w-full bg-[#07071c] md:h-10">
          <div className="absolute left-1/2 top-full h-5 w-[18%] min-w-45 -translate-x-1/2 rounded-b-[22px] bg-[#07071c]" />
        </div>

        <div className="relative z-10 flex h-full items-center px-5 md:px-10 lg:px-16">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[0.92fr_0.88fr] lg:items-center">
            <div className="mx-auto w-full max-w-155 rounded-[34px] border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-[18px] md:p-8 lg:ml-8">
              <div className="space-y-1">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`block w-full rounded-[18px] ${directional.textAlignClass}`}
                    dir={directional.dir}
                  >
                    <div
                      className={`title-${index} border-b border-white/10 px-4 py-5 text-[26px] font-medium leading-none tracking-[-0.04em] md:text-[34px]`}
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
                        maxHeight: index === 0 ? "500px" : "0px",
                        opacity: index === 0 ? 1 : 0,
                        paddingTop: index === 0 ? "20px" : "0px",
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
                          className={`image-${index} h-57.5 w-full object-cover md:h-67.5`}
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

            <div className="mx-auto flex w-full max-w-145 justify-center lg:justify-end">
              <div
                dir={directional.dir}
                className="relative w-full rounded-[34px] border border-white/10 p-6 text-white backdrop-blur-[18px] md:p-8 lg:p-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.10) 100%)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <div className="pointer-events-none select-none opacity-0">
                  <div
                    className={`flex flex-col justify-start ${directional.rightPanelAlign}`}
                  >
                    <h2 className="mb-5 text-[48px] font-medium leading-[0.94] tracking-[-0.05em] md:text-[64px] lg:text-[78px]">
                      {longestService.title}
                    </h2>
                    <p
                      className={`${directional.descMaxWidthClass} text-[18px] leading-[1.2] tracking-[-0.03em] text-white/72 md:text-[22px] lg:text-[24px]`}
                    >
                      {longestService.description}
                    </p>
                  </div>
                </div>

                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`desc-${index} absolute inset-0 flex flex-col justify-start p-6 md:p-8 lg:p-10 ${directional.rightPanelAlign}`}
                    style={{
                      visibility: index === 0 ? "inherit" : "hidden",
                      opacity: index === 0 ? 1 : 0,
                      transform:
                        index === 0 ? "translateY(0px)" : "translateY(20px)",
                    }}
                  >
                    <h2 className="mb-5 text-[48px] font-medium leading-[0.94] tracking-[-0.05em] md:text-[64px] lg:text-[78px]">
                      {service.title}
                    </h2>
                    <p
                      className={`${directional.descMaxWidthClass} text-[18px] leading-[1.2] tracking-[-0.03em] text-white/72 md:text-[22px] lg:text-[24px]`}
                    >
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-5 h-8 w-full bg-white md:h-10">
          <div className="absolute bottom-full left-1/2 h-5 w-[18%] min-w-45 -translate-x-1/2 rounded-t-[22px] bg-white" />
        </div>
      </div>
    </section>
  );
}
