"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, defaultLocale, isValidLocale } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

const icons = {
  standard: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      <path d="M9 12h6" />
    </svg>
  ),
  bonded: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      <circle cx="12" cy="15" r="1.5" />
    </svg>
  ),
  ftz: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4a12 12 0 0 1 0 16" />
      <path d="M12 4a12 12 0 0 0 0 16" />
    </svg>
  ),
  pickpack: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
      <path d="M12 12L4 7.5" />
    </svg>
  ),
  jit: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

function normalizeLocale(value?: string): AppLocale {
  if (value && isValidLocale(value)) return value;
  return defaultLocale;
}

export default function WarehousingScrollStack() {
  const outerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const params = useParams();
  const lang = useMemo(() => {
    const rawLang =
      typeof params?.lang === "string"
        ? params.lang
        : Array.isArray(params?.lang)
          ? params.lang[0]
          : undefined;

    return normalizeLocale(rawLang);
  }, [params]);

  const isRtl = lang === "fa" || lang === "ar";

  const SERVICES = useMemo(() => {
    const byLocale: Record<
      AppLocale,
      {
        sectionLabel: string;
        items: {
          id: string;
          title: string;
          shortTitle: string;
          desc: string;
          image: string;
          icon: React.ReactNode;
        }[];
      }
    > = {
      en: {
        sectionLabel: "Core Services",
        items: [
          {
            id: "Standard",
            title: "Standard Warehousing",
            shortTitle: "Standard",
            desc: "Secure facilities with scalable capacity for short- and long-term storage, integrated with nationwide distribution.",
            image:
              "/assets/images/warehousing-distribution/standard-warehousing.jpg",
            icon: icons.standard,
          },
          {
            id: "Bonded",
            title: "Bonded Warehousing",
            shortTitle: "Bonded",
            desc: "Duty-deferred storage solutions allowing you to optimize cash flow until goods are released for consumption.",
            image:
              "/assets/images/warehousing-distribution/bonded-warehousing.jpg",
            icon: icons.bonded,
          },
          {
            id: "FTZ",
            title: "Foreign Trade Zone",
            shortTitle: "FTZ",
            desc: "Full FTZ capabilities for international shippers — duty management, re-export options, and streamlined compliance.",
            image:
              "/assets/images/warehousing-distribution/foreign-trade-zone.jpg",
            icon: icons.ftz,
          },
          {
            id: "PickPack",
            title: "Pick & Pack",
            shortTitle: "PickPack",
            desc: "Value-added services including palletizing, labeling, and order fulfillment tailored to your business.",
            image: "/assets/images/warehousing-distribution/pick-pack.jpg",
            icon: icons.pickpack,
          },
          {
            id: "JIT",
            title: "Just-in-Time Delivery",
            shortTitle: "JIT",
            desc: "Flexible distribution ensuring your products arrive exactly when needed — reducing inventory costs and improving efficiency.",
            image:
              "/assets/images/warehousing-distribution/just-in-time-delivery.jpg",
            icon: icons.jit,
          },
        ],
      },
      fa: {
        sectionLabel: "خدمات اصلی",
        items: [
          {
            id: "Standard",
            title: "انبارداری استاندارد",
            shortTitle: "استاندارد",
            desc: "تاسیسات ایمن با ظرفیت مقیاس‌پذیر برای نگهداری کوتاه‌مدت و بلندمدت، یکپارچه با شبکه توزیع سراسری.",
            image:
              "/assets/images/warehousing-distribution/standard-warehousing.jpg",
            icon: icons.standard,
          },
          {
            id: "Bonded",
            title: "انبارداری bonded",
            shortTitle: "Bonded",
            desc: "راهکارهای نگهداری با تعویق پرداخت عوارض که به شما کمک می‌کند جریان نقدی خود را تا زمان ترخیص کالا بهینه کنید.",
            image:
              "/assets/images/warehousing-distribution/bonded-warehousing.jpg",
            icon: icons.bonded,
          },
          {
            id: "FTZ",
            title: "منطقه تجارت آزاد",
            shortTitle: "FTZ",
            desc: "قابلیت‌های کامل مناطق آزاد تجاری برای صاحبان کالا در حمل‌ونقل بین‌المللی — مدیریت عوارض، امکان صادرات مجدد و انطباق ساده‌تر.",
            image:
              "/assets/images/warehousing-distribution/foreign-trade-zone.jpg",
            icon: icons.ftz,
          },
          {
            id: "PickPack",
            title: "جمع‌آوری و بسته‌بندی",
            shortTitle: "Pick & Pack",
            desc: "خدمات ارزش‌افزوده شامل پالت‌بندی، لیبل‌گذاری و انجام سفارش‌ها متناسب با نیاز کسب‌وکار شما.",
            image: "/assets/images/warehousing-distribution/pick-pack.jpg",
            icon: icons.pickpack,
          },
          {
            id: "JIT",
            title: "تحویل به‌موقع",
            shortTitle: "JIT",
            desc: "توزیع منعطف که تضمین می‌کند محصولات شما دقیقاً در زمان موردنیاز برسند — با کاهش هزینه‌های موجودی و افزایش بهره‌وری.",
            image:
              "/assets/images/warehousing-distribution/just-in-time-delivery.jpg",
            icon: icons.jit,
          },
        ],
      },
      ar: {
        sectionLabel: "الخدمات الأساسية",
        items: [
          {
            id: "Standard",
            title: "التخزين القياسي",
            shortTitle: "قياسي",
            desc: "مرافق آمنة بسعة قابلة للتوسع للتخزين قصير وطويل الأجل، ومتكاملة مع التوزيع على مستوى الدولة.",
            image:
              "/assets/images/warehousing-distribution/standard-warehousing.jpg",
            icon: icons.standard,
          },
          {
            id: "Bonded",
            title: "التخزين الجمركي",
            shortTitle: "جمركي",
            desc: "حلول تخزين مؤجلة الرسوم تتيح لك تحسين التدفق النقدي حتى يتم الإفراج عن البضائع للاستهلاك.",
            image:
              "/assets/images/warehousing-distribution/bonded-warehousing.jpg",
            icon: icons.bonded,
          },
          {
            id: "FTZ",
            title: "منطقة التجارة الحرة",
            shortTitle: "FTZ",
            desc: "قدرات كاملة لمناطق التجارة الحرة للشاحنين الدوليين — إدارة الرسوم، وخيارات إعادة التصدير، والامتثال المبسط.",
            image:
              "/assets/images/warehousing-distribution/foreign-trade-zone.jpg",
            icon: icons.ftz,
          },
          {
            id: "PickPack",
            title: "الالتقاط والتعبئة",
            shortTitle: "التعبئة",
            desc: "خدمات ذات قيمة مضافة تشمل الترصيص، ووضع الملصقات، وتنفيذ الطلبات بما يتناسب مع أعمالك.",
            image: "/assets/images/warehousing-distribution/pick-pack.jpg",
            icon: icons.pickpack,
          },
          {
            id: "JIT",
            title: "التسليم في الوقت المناسب",
            shortTitle: "JIT",
            desc: "توزيع مرن يضمن وصول منتجاتك في الوقت المطلوب تماماً — مما يقلل تكاليف المخزون ويحسن الكفاءة.",
            image:
              "/assets/images/warehousing-distribution/just-in-time-delivery.jpg",
            icon: icons.jit,
          },
        ],
      },
    };

    return byLocale[lang];
  }, [lang]);

  const N = SERVICES.items.length;

  useEffect(() => {
    imageRefs.current.forEach((img, i) => {
      if (!img || i === 0) return;
      gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });
    });

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * (N - 1)}`,
      scrub: 0.55,
      onUpdate: (self) => {
        const rawIndex = self.progress * (N - 1);
        const newIndex = Math.round(rawIndex);

        if (newIndex !== activeIndexRef.current) {
          const prev = activeIndexRef.current;
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);

          if (newIndex > prev) {
            gsap.to(imageRefs.current[newIndex], {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.7,
              ease: "power2.inOut",
            });
          } else {
            gsap.to(imageRefs.current[prev], {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 0.6,
              ease: "power2.inOut",
            });
          }
        }
      },
    });

    return () => st.kill();
  }, [N]);

  const scrollToIndex = (index: number) => {
    if (!outerRef.current) return;
    const outerTop =
      outerRef.current.getBoundingClientRect().top + window.scrollY;
    const target = outerTop + window.innerHeight * index;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#07071C] py-4 md:py-5">
      <div
        ref={outerRef}
        className="relative w-full"
        style={{ height: `${100 * N}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            dir={isRtl ? "rtl" : "ltr"}
            className="flex h-full w-full gap-4 px-4 py-4 md:gap-5 md:px-5 md:py-5"
          >
            <div className="relative hidden h-full md:block md:w-[47.5%]">
              <div className="h-full w-full rounded-[30px] bg-[#F5F3EF]">
                <div className="flex h-full flex-col justify-between px-8 pb-8 pt-9 lg:px-12 lg:pb-10 lg:pt-10">
                  <div className="flex justify-center">
                    <span
                      className={`text-[12px] font-light text-[#B7B1AC] md:text-[13px] ${
                        isRtl
                          ? "font-vazirmatn tracking-normal"
                          : "tracking-[-0.01em]"
                      }`}
                    >
                      {SERVICES.sectionLabel}
                    </span>
                  </div>

                  <div className="flex flex-1 items-center">
                    <div className="w-full ps-4 lg:ps-8">
                      <div className="flex flex-col">
                        {SERVICES.items.map((s, i) => {
                          const distance = i - activeIndex;
                          const isActive = distance === 0;
                          const isVisible = Math.abs(distance) <= 1;

                          return (
                            <div
                              key={s.id}
                              className={`transition-all duration-500 ease-out ${
                                isRtl ? "font-vazirmatn" : ""
                              }`}
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible
                                  ? "translateY(0px)"
                                  : "translateY(18px)",
                                maxHeight: isVisible ? "120px" : "0px",
                                overflow: "hidden",
                                marginBottom: isActive ? "12px" : "8px",
                                color: isActive ? "#0A0A1E" : "#B8B4B1",
                                fontWeight: isActive ? 400 : 300,
                                fontSize: isActive
                                  ? "clamp(2.4rem, 4vw, 3.7rem)"
                                  : "clamp(1.8rem, 3vw, 2.8rem)",
                                lineHeight: isRtl
                                  ? 1.18
                                  : isActive
                                    ? 0.98
                                    : 1.04,
                                letterSpacing: isRtl ? "0" : "-0.05em",
                              }}
                            >
                              {s.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 ps-4 lg:ps-8">
                    {SERVICES.items.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToIndex(i)}
                        className={`text-[13px] transition-colors duration-300 md:text-[14px] ${
                          isRtl
                            ? "font-vazirmatn tracking-normal"
                            : "tracking-[-0.02em]"
                        }`}
                        style={{
                          color: i === activeIndex ? "#0A0A1E" : "#B7B1AC",
                          fontWeight: i === activeIndex ? 400 : 300,
                        }}
                      >
                        {s.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full w-full md:w-[52.5%]">
              <div className="relative h-full w-full overflow-hidden rounded-[30px]">
                {SERVICES.items.map((s, i) => (
                  <div
                    key={s.id}
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    className="absolute inset-0 h-full w-full"
                    style={{ zIndex: i }}
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      priority={i === 0}
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10" />

                    <div
                      className={`absolute bottom-5 w-[min(420px,calc(100%-2.5rem))] rounded-[26px] p-5 text-white backdrop-blur-[18px] md:bottom-6 md:p-6 lg:bottom-7 ${
                        isRtl
                          ? "left-5 md:left-6 lg:left-7"
                          : "right-5 md:right-6 lg:right-7"
                      }`}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(126,103,84,0.34) 0%, rgba(98,74,58,0.44) 100%)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow:
                          "0 20px 50px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
                        opacity: i === activeIndex ? 1 : 0,
                        transform:
                          i === activeIndex
                            ? "translateY(0px)"
                            : "translateY(18px)",
                        transition:
                          "opacity 0.42s ease, transform 0.42s ease, filter 0.42s ease",
                        transitionDelay: i === activeIndex ? "0.2s" : "0s",
                        pointerEvents: i === activeIndex ? "auto" : "none",
                        filter: i === activeIndex ? "blur(0px)" : "blur(6px)",
                      }}
                    >
                      <div className="mb-4 text-white/95">{s.icon}</div>
                      <p
                        className={`max-w-[28ch] text-[14px] text-white/92 md:text-[15px] lg:text-[16px] ${
                          isRtl
                            ? "font-vazirmatn leading-[1.9]"
                            : "leading-[1.6] tracking-[-0.01em]"
                        }`}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            dir={isRtl ? "rtl" : "ltr"}
            className="pointer-events-none absolute inset-x-0 bottom-0 block px-5 pb-5 md:hidden"
          >
            <div className="rounded-3xl bg-black/45 p-4 text-white backdrop-blur-md">
              <div className="mb-2 text-white/90">
                {SERVICES.items[activeIndex].icon}
              </div>
              <h3
                className={`mb-2 text-[22px] font-medium leading-tight ${
                  isRtl ? "font-vazirmatn" : "tracking-[-0.03em]"
                }`}
              >
                {SERVICES.items[activeIndex].title}
              </h3>
              <p
                className={`text-[13px] text-white/78 ${
                  isRtl ? "font-vazirmatn leading-[1.9]" : "leading-relaxed"
                }`}
              >
                {SERVICES.items[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
