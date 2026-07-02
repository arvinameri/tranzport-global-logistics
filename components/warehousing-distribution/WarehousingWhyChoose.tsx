"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, defaultLocale, isValidLocale } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

function normalizeLocale(value?: string): AppLocale {
  if (value && isValidLocale(value)) return value;
  return defaultLocale;
}

export default function WarehousingWhyChoose() {
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  const content: Record<
    AppLocale,
    {
      heading: string;
      subheading: string;
      features: {
        title: string;
        description: string;
      }[];
    }
  > = {
    en: {
      heading: "Why Choose Baharan Group",
      subheading:
        "Warehousing and distribution services designed to improve supply chain efficiency, support market expansion, and strengthen operational coordination across key trade routes.",
      features: [
        {
          title: "Strategic\nNetwork",
          description:
            "Warehouse capacity positioned to support domestic trade, distribution efficiency, and stronger access to key regional and international logistics flows.",
        },
        {
          title: "Integrated\nExecution",
          description:
            "Seamless coordination between warehousing, transportation, and supply chain operations, aligned with Baharan Group’s broader logistics and trade capabilities.",
        },
        {
          title: "Operational\nPerformance",
          description:
            "A practical warehousing approach focused on visibility, process optimization, and long-term value creation across distribution and sales networks.",
        },
      ],
    },
    fa: {
      heading: "چرا گروه بهاران",
      subheading:
        "خدمات انبارداری و توزیع طراحی‌شده برای بهبود بهره‌وری زنجیره تامین، پشتیبانی از توسعه بازار و تقویت هماهنگی عملیاتی در مسیرهای کلیدی تجارت.",
      features: [
        {
          title: "شبکه\nاستراتژیک",
          description:
            "ظرفیت انبارداری در موقعیت‌هایی قرار گرفته که از تجارت داخلی، بهره‌وری توزیع و دسترسی بهتر به جریان‌های کلیدی لجستیکی منطقه‌ای و بین‌المللی پشتیبانی می‌کند.",
        },
        {
          title: "اجرای\nیکپارچه",
          description:
            "هماهنگی روان میان انبارداری، حمل‌ونقل و عملیات زنجیره تامین، همسو با توانمندی‌های گسترده‌تر لجستیکی و تجاری گروه بهاران.",
        },
        {
          title: "عملکرد\nعملیاتی",
          description:
            "رویکردی کاربردی در انبارداری با تمرکز بر شفافیت، بهینه‌سازی فرایندها و خلق ارزش بلندمدت در شبکه‌های توزیع و فروش.",
        },
      ],
    },
    ar: {
      heading: "لماذا مجموعة بهاران",
      subheading:
        "خدمات التخزين والتوزيع المصممة لتحسين كفاءة سلسلة التوريد، ودعم التوسع في السوق، وتعزيز التنسيق التشغيلي عبر مسارات التجارة الرئيسية.",
      features: [
        {
          title: "شبكة\nاستراتيجية",
          description:
            "طاقة تخزينية متموضعة لدعم التجارة المحلية، وكفاءة التوزيع، وتعزيز الوصول إلى التدفقات اللوجستية الإقليمية والدولية الرئيسية.",
        },
        {
          title: "تنفيذ\nمتكامل",
          description:
            "تنسيق سلس بين التخزين، والنقل، وعمليات سلسلة التوريد، بما يتماشى مع القدرات اللوجستية والتجارية الأوسع لمجموعة بهاران.",
        },
        {
          title: "أداء\nتشغيلي",
          description:
            "نهج عملي في التخزين يركز على الوضوح، وتحسين العمليات، وخلق قيمة طويلة الأمد عبر شبكات التوزيع والمبيعات.",
        },
      ],
    },
  };

  const t = content[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;

      const words = heading.querySelectorAll(".word");
      if (!words.length) return;

      const turnBlack = () => {
        gsap.to(words, { color: "#06062a", duration: 0.3, overwrite: true });
      };

      const stopTimer = gsap.delayedCall(0.15, turnBlack).pause();

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
    }, headingRef);

    return () => ctx.revert();
  }, [lang]);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors duration-300 will-change-[color] ${
          isRtl ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
        }`}
        style={{ color: "#06062a" }}
      >
        {word}
      </span>
    ));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4f1] py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-350 px-6 md:px-10 lg:px-16">
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="mx-auto mb-20 max-w-245 text-center"
        >
          <h2
            ref={headingRef}
            className={`mx-auto flex max-w-225 flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2 ${
              isRtl
                ? "font-vazirmatn text-[34px] font-medium leading-[1.28] tracking-normal md:text-[56px] lg:text-[68px]"
                : "text-[36px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[60px] lg:text-[72px]"
            }`}
          >
            {splitText(t.heading)}
          </h2>

          <p
            className={`mx-auto mt-6 max-w-190 text-[#8E8E96] md:text-[24px] ${
              isRtl
                ? "font-vazirmatn text-[17px] leading-[1.9] tracking-normal"
                : "text-[18px] leading-[1.2] tracking-[-0.03em]"
            }`}
          >
            {t.subheading}
          </p>
        </div>

        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="grid grid-cols-1 border border-[#d9d8d3] md:grid-cols-3"
        >
          {t.features.map((item, index) => {
            const notLast = index !== t.features.length - 1;
            const sideBorder = notLast
              ? isRtl
                ? "md:border-l md:border-[#d9d8d3]"
                : "md:border-r md:border-[#d9d8d3]"
              : "";

            return (
              <div
                key={item.title}
                className={`relative min-h-77.5 bg-transparent px-8 py-12 md:px-10 md:py-14 lg:px-14 ${sideBorder}`}
              >
                <span
                  className={`absolute -top-4 text-[26px] font-light text-[#a8a7a2] ${
                    isRtl ? "-right-1.5" : "-left-1.5"
                  }`}
                >
                  +
                </span>
                <span
                  className={`absolute -bottom-4 text-[26px] font-light text-[#a8a7a2] ${
                    isRtl ? "-right-1.5" : "-left-1.5"
                  }`}
                >
                  +
                </span>

                {index === t.features.length - 1 ? (
                  <>
                    <span
                      className={`absolute -top-4 text-[26px] font-light text-[#a8a7a2] ${
                        isRtl ? "-left-1.5" : "-right-1.5"
                      }`}
                    >
                      +
                    </span>
                    <span
                      className={`absolute -bottom-4 text-[26px] font-light text-[#a8a7a2] ${
                        isRtl ? "-left-1.5" : "-right-1.5"
                      }`}
                    >
                      +
                    </span>
                  </>
                ) : null}

                <h3
                  className={`whitespace-pre-line text-[#06062a] ${
                    isRtl
                      ? "font-vazirmatn text-[24px] font-medium leading-[1.35] tracking-normal md:text-[32px] lg:text-[40px]"
                      : "text-[26px] font-normal leading-[1.02] tracking-[-0.05em] md:text-[36px] lg:text-[44px]"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`mt-6 max-w-97.5 text-[#55555f] ${
                    isRtl
                      ? "font-vazirmatn text-[15px] leading-[1.95] tracking-normal md:text-[17px]"
                      : "text-[16px] leading-[1.35] tracking-[-0.02em] md:text-[18px]"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
