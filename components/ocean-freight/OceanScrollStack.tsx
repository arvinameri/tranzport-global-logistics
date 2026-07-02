// client/components/ocean-freight/OceanScrollStack.tsx
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from "next/navigation";
import { AppLocale, normalizeLocale } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

const icons = {
  fcl: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  lcl: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  specialized: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  breakbulk: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  domestic: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  charter: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 17l2-4h14l2 4" />
      <path d="M5 13V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6" />
      <path d="M3 17h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z" />
    </svg>
  ),
};

const getServicesContent = (lang: AppLocale) => {
  const content = {
    en: [
      {
        id: "FCL",
        title: "Full Container Load",
        shortTitle: "FCL",
        desc: "Maximize efficiency with dedicated containers. FCL provides exclusive use, ensuring faster transit and increased security to optimize your supply chain management.",
        image: "/assets/images/ocean-freight/fcl.jpg",
        icon: icons.fcl,
      },
      {
        id: "LCL",
        title: "Less than Container Load",
        shortTitle: "LCL",
        desc: "Flexible and cost-effective shipping for smaller volumes. Share container space efficiently, backed by our extensive experience in distribution networks and commercial sales.",
        image: "/assets/images/ocean-freight/lcl.jpg",
        icon: icons.lcl,
      },
      {
        id: "Specialized",
        title: "Specialized Containers",
        shortTitle: "Specialized",
        desc: "Tailored solutions for unique cargo. Ideal for diverse industries, from retail personal care products to construction materials like Kohan Ceram and EEFA.",
        image: "/assets/images/ocean-freight/specialized.jpg",
        icon: icons.specialized,
      },
      {
        id: "Breakbulk",
        title: "Break Bulk Cargo",
        shortTitle: "Breakbulk",
        desc: "Efficient handling of non-containerized cargo. Perfect for oversized, heavy, or irregularly shaped goods, supporting large-scale construction contracting.",
        image: "/assets/images/ocean-freight/breakbulk.jpg",
        icon: icons.breakbulk,
      },
      {
        id: "Domestic",
        title: "Domestic Shipping",
        shortTitle: "Domestic",
        desc: "Reliable shipping solutions for domestic trade. Leveraging our extensive local business connections to provide seamless, cost-effective transportation for your distribution needs.",
        image: "/assets/images/ocean-freight/domestic.jpg",
        icon: icons.domestic,
      },
      {
        id: "Charter",
        title: "Charter Services",
        shortTitle: "Charter",
        desc: "Customized vessel charters for urgent cargo. Full flexibility and expert coordination backed by Baharan Group's proven track record with major international companies.",
        image: "/assets/images/ocean-freight/charter.jpg",
        icon: icons.charter,
      },
    ],
    fa: [
      {
        id: "FCL",
        title: "بار کامل کانتینر",
        shortTitle: "FCL (کامل)",
        desc: "بهره‌وری را با کانتینرهای اختصاصی به حداکثر برسانید. FCL استفاده انحصاری را فراهم کرده و انتقال سریع‌تر و امنیت بیشتر را برای بهینه‌سازی زنجیره تامین شما تضمین می‌کند.",
        image: "/assets/images/ocean-freight/fcl.jpg",
        icon: icons.fcl,
      },
      {
        id: "LCL",
        title: "خرده بار کانتینری",
        shortTitle: "LCL (خرده‌بار)",
        desc: "حمل و نقل انعطاف‌پذیر و مقرون‌به‌صرفه برای حجم‌های کمتر. با تکیه بر تجربه گسترده ما در شبکه‌های توزیع و فروش تجاری، فضای کانتینر را به طور کارآمد به اشتراک بگذارید.",
        image: "/assets/images/ocean-freight/lcl.jpg",
        icon: icons.lcl,
      },
      {
        id: "Specialized",
        title: "کانتینرهای تخصصی",
        shortTitle: "تخصصی",
        desc: "راهکارهای سفارشی برای بارهای خاص. ایده‌آل برای صنایع مختلف، از محصولات مراقبت شخصی خرده‌فروشی تا مصالح ساختمانی مانند کهن سرام و ایفا.",
        image: "/assets/images/ocean-freight/specialized.jpg",
        icon: icons.specialized,
      },
      {
        id: "Breakbulk",
        title: "فله و کالاهای متفرقه",
        shortTitle: "فله/متفرقه",
        desc: "مدیریت کارآمد بارهای غیر کانتینری. عالی برای کالاهای فوق‌سنگین، بزرگ یا با اشکال نامنظم، با پشتیبانی از پیمانکاری‌های ساختمانی در مقیاس بزرگ.",
        image: "/assets/images/ocean-freight/breakbulk.jpg",
        icon: icons.breakbulk,
      },
      {
        id: "Domestic",
        title: "حمل و نقل داخلی",
        shortTitle: "داخلی",
        desc: "راهکارهای مطمئن حمل و نقل برای تجارت داخلی. با بهره‌گیری از ارتباطات گسترده تجاری محلی، حمل و نقلی یکپارچه و مقرون‌به‌صرفه برای نیازهای توزیع شما فراهم می‌کنیم.",
        image: "/assets/images/ocean-freight/domestic.jpg",
        icon: icons.domestic,
      },
      {
        id: "Charter",
        title: "خدمات چارتر",
        shortTitle: "چارتر",
        desc: "چارتر کشتی سفارشی برای بارهای فوری. انعطاف‌پذیری کامل و هماهنگی تخصصی با پشتوانه سوابق درخشان گروه بهاران با شرکت‌های معتبر بین‌المللی.",
        image: "/assets/images/ocean-freight/charter.jpg",
        icon: icons.charter,
      },
    ],
    ar: [
      {
        id: "FCL",
        title: "حمولة حاوية كاملة",
        shortTitle: "FCL (كامل)",
        desc: "حقق أقصى قدر من الكفاءة باستخدام حاويات مخصصة. يوفر الشحن الكامل الاستخدام الحصري، مما يضمن عبوراً أسرع وزيادة في الأمان لتحسين إدارة سلسلة التوريد الخاصة بك.",
        image: "/assets/images/ocean-freight/fcl.jpg",
        icon: icons.fcl,
      },
      {
        id: "LCL",
        title: "أقل من حمولة حاوية",
        shortTitle: "LCL (جزئي)",
        desc: "شحن مرن وفعال من حيث التكلفة للأحجام الصغيرة. شارك مساحة الحاوية بكفاءة، مدعوماً بخبرتنا الواسعة في شبكات التوزيع والمبيعات التجارية.",
        image: "/assets/images/ocean-freight/lcl.jpg",
        icon: icons.lcl,
      },
      {
        id: "Specialized",
        title: "حاويات متخصصة",
        shortTitle: "متخصصة",
        desc: "حلول مخصصة للبضائع الفريدة. مثالية للصناعات المتنوعة، بدءاً من منتجات العناية الشخصية بالتجزئة إلى مواد البناء مثل كوهن سيرام وإيفا.",
        image: "/assets/images/ocean-freight/specialized.jpg",
        icon: icons.specialized,
      },
      {
        id: "Breakbulk",
        title: "بضائع البضائع السائبة",
        shortTitle: "سائبة/متفرقة",
        desc: "التعامل الفعال مع البضائع غير المعبأة في حاويات. مثالية للبضائع ذات الحجم الزائد أو الثقيلة أو غير المنتظمة الشكل، مع دعم مقاولات البناء واسعة النطاق.",
        image: "/assets/images/ocean-freight/breakbulk.jpg",
        icon: icons.breakbulk,
      },
      {
        id: "Domestic",
        title: "الشحن المحلي",
        shortTitle: "محلي",
        desc: "حلول شحن موثوقة للتجارة المحلية. بالاستفادة من شبكة علاقاتنا التجارية المحلية الواسعة، نوفر نقلاً سلساً وفعالاً من حيث التكلفة لاحتياجات التوزيع الخاصة بك.",
        image: "/assets/images/ocean-freight/domestic.jpg",
        icon: icons.domestic,
      },
      {
        id: "Charter",
        title: "خدمات التأجير",
        shortTitle: "تأجير",
        desc: "تأجير سفن مخصص للبضائع العاجلة. مرونة كاملة وتنسيق خبير مدعوم بالسجل الحافل لمجموعة بهاران مع الشركات الدولية الكبرى.",
        image: "/assets/images/ocean-freight/charter.jpg",
        icon: icons.charter,
      },
    ],
  };
  return content[lang];
};

export default function OceanScrollStack({ lang }: { lang?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

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

  const SERVICES = useMemo(
    () => getServicesContent(currentLang),
    [currentLang],
  );
  const isRtl = currentLang === "fa" || currentLang === "ar";
  const sectionLabel =
    currentLang === "fa"
      ? "خدمات حمل و نقل دریایی ما"
      : currentLang === "ar"
        ? "خدمات الشحن البحري لدينا"
        : "Our Ocean Freight Services";

  const N = SERVICES.length;

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
            className="flex h-full w-full gap-4 px-4 py-4 md:gap-5 md:px-5 md:py-5"
            dir={isRtl ? "rtl" : "ltr"}
          >
            {/* LEFT PANEL */}
            <div className="relative hidden h-full md:block md:w-[47.5%]">
              <div className="h-full w-full rounded-[30px] bg-[#F5F3EF]">
                <div className="flex h-full flex-col justify-between px-8 pb-8 pt-9 lg:px-12 lg:pb-10 lg:pt-10">
                  {/* top label */}
                  <div className="flex justify-center">
                    <span
                      className={`text-[12px] font-light text-[#B7B1AC] md:text-[13px] ${
                        !isRtl ? "tracking-[-0.01em]" : ""
                      }`}
                    >
                      {sectionLabel}
                    </span>
                  </div>

                  {/* titles */}
                  <div className="flex flex-1 items-center">
                    <div className="w-full ps-4 lg:ps-8">
                      <div className="flex flex-col">
                        {SERVICES.map((s, i) => {
                          const distance = i - activeIndex;
                          const isActive = distance === 0;
                          const isVisible = Math.abs(distance) <= 1;

                          return (
                            <div
                              key={s.id}
                              className={`transition-all duration-500 ease-out ${
                                isRtl ? "font-vazirmatn" : "font-sans"
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
                                fontWeight: isActive
                                  ? isRtl
                                    ? 500
                                    : 400
                                  : 300,
                                fontSize: isActive
                                  ? "clamp(2.4rem, 4vw, 3.7rem)"
                                  : "clamp(1.8rem, 3vw, 2.8rem)",
                                lineHeight: isActive ? 1.05 : 1.15,
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

                  {/* bottom nav */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 ps-4 lg:ps-8">
                    {SERVICES.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToIndex(i)}
                        className={`text-[13px] transition-colors duration-300 md:text-[14px] ${
                          !isRtl ? "tracking-[-0.02em]" : ""
                        } ${isRtl ? "font-vazirmatn" : "font-sans"}`}
                        style={{
                          color: i === activeIndex ? "#0A0A1E" : "#B7B1AC",
                          fontWeight:
                            i === activeIndex ? (isRtl ? 500 : 400) : 300,
                        }}
                      >
                        {s.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative h-full w-full md:w-[52.5%]">
              <div className="relative h-full w-full overflow-hidden rounded-[30px]">
                {SERVICES.map((s, i) => (
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
                        className={`max-w-[28ch] text-[14px] leading-[1.6] text-white/92 md:text-[15px] lg:text-[16px] ${
                          isRtl ? "font-vazirmatn" : "tracking-[-0.01em]"
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

          {/* MOBILE INFO */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 block px-5 pb-5 md:hidden"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="rounded-3xl bg-black/45 p-4 text-white backdrop-blur-md">
              <div className="mb-2 text-white/90">
                {SERVICES[activeIndex].icon}
              </div>
              <h3
                className={`mb-2 text-[22px] font-medium leading-tight ${
                  isRtl ? "font-vazirmatn" : "tracking-[-0.03em]"
                }`}
              >
                {SERVICES[activeIndex].title}
              </h3>
              <p
                className={`text-[13px] leading-relaxed text-white/78 ${
                  isRtl ? "font-vazirmatn" : ""
                }`}
              >
                {SERVICES[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
