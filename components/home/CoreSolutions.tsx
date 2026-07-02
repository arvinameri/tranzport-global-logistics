"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type SolutionItem = {
  id: string;
  title: string;
  desc: string;
  video: string;
  link: string;
};

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      mainHeading: "Our Core Solutions for Complex Logistics Demands",
      seeMore: "SEE MORE",
      solutions: [
        {
          id: "01",
          title: "Ocean Freight",
          desc: "Full-container, partial, and specialized ocean freight solutions with global port coverage and regulatory compliance.",
          video: "/assets/videos/ocean-freight.mp4",
          link: "/ocean-freight",
        },
        {
          id: "02",
          title: "Air Freight",
          desc: "Fast, priority air cargo for urgent shipments including consolidated, direct, and hand-carry options.",
          video: "/assets/videos/air-freight.mp4",
          link: "/air-freight",
        },
        {
          id: "03",
          title: "Customs Brokerage",
          desc: "Licensed U.S. customs brokerage with expert handling of entries, duty drawbacks, and compliance advisory.",
          video: "/assets/videos/customs-brokerage.mp4",
          link: "/customs-brokerage",
        },
        {
          id: "04",
          title: "Domestic Trucking",
          desc: "Nationwide freight transport across the U.S. with FTL, LTL, bonded trucking, and last-mile delivery options.",
          video: "/assets/videos/domestic-trucking.mp4",
          link: "/domestic-trucking",
        },
        {
          id: "05",
          title: "Project Cargo",
          desc: "End-to-end logistics for oversized, heavy, or sensitive cargo from site planning to secure delivery.",
          video: "/assets/videos/project-cargo.mp4",
          link: "/project-cargo",
        },
        {
          id: "06",
          title: "Warehousing & Distribution",
          desc: "Secure storage, pick & pack, cross-docking, and just-in-time delivery across 9 U.S. warehouse facilities.",
          video: "/assets/videos/warehousing.mp4",
          link: "/warehousing-distribution",
        },
      ] satisfies SolutionItem[],
    },
    fa: {
      dir: "rtl" as const,
      mainHeading: "راهکارهای اصلی ما برای نیازهای پیچیده لجستیکی",
      seeMore: "مشاهده بیشتر",
      solutions: [
        {
          id: "۰۱",
          title: "حمل‌ونقل دریایی",
          desc: "راهکارهای حمل‌ونقل دریایی کانتینر کامل، خرده‌بار و محموله‌های خاص با پوشش جهانی بنادر و رعایت مقررات بین‌المللی.",
          video: "/assets/videos/ocean-freight.mp4",
          link: "/ocean-freight",
        },
        {
          id: "۰۲",
          title: "حمل‌ونقل هوایی",
          desc: "ارسال سریع و اولویت‌دار بارهای هوایی برای محموله‌های فوری شامل گزینه‌های تلفیقی، مستقیم و همراه مسافر.",
          video: "/assets/videos/air-freight.mp4",
          link: "/air-freight",
        },
        {
          id: "۰۳",
          title: "امور گمرکی",
          desc: "ترخیص‌کار رسمی با تخصص در مدیریت اظهارنامه‌ها، استرداد حقوق گمرکی و مشاوره‌های انطباق با قوانین.",
          video: "/assets/videos/customs-brokerage.mp4",
          link: "/customs-brokerage",
        },
        {
          id: "۰۴",
          title: "حمل جاده‌ای داخلی",
          desc: "حمل‌ونقل سراسری بار شامل بارهای کامل، خرده‌بار، حمل تحت اوراق قرضه و تحویل مایل آخر.",
          video: "/assets/videos/domestic-trucking.mp4",
          link: "/domestic-trucking",
        },
        {
          id: "۰۵",
          title: "پروژه کارگو",
          desc: "لجستیک صفر تا صد برای محموله‌های فوق‌سنگین، حجیم یا حساس، از برنامه‌ریزی سایت تا تحویل امن.",
          video: "/assets/videos/project-cargo.mp4",
          link: "/project-cargo",
        },
        {
          id: "۰۶",
          title: "انبارداری و توزیع",
          desc: "ذخیره‌سازی ایمن، بسته‌بندی، کراس‌داکینگ و تحویل به‌موقع (JIT) از طریق شبکه‌ای از تأسیسات انبارداری.",
          video: "/assets/videos/warehousing.mp4",
          link: "/warehousing-distribution",
        },
      ] satisfies SolutionItem[],
    },
    ar: {
      dir: "rtl" as const,
      mainHeading: "حلولنا الأساسية للمتطلبات اللوجستية المعقدة",
      seeMore: "رؤية المزيد",
      solutions: [
        {
          id: "٠١",
          title: "الشحن البحري",
          desc: "حلول الشحن البحري للحاويات الكاملة والجزئية والمتخصصة مع تغطية شاملة للموانئ العالمية والامتثال التنظيمي.",
          video: "/assets/videos/ocean-freight.mp4",
          link: "/ocean-freight",
        },
        {
          id: "٠٢",
          title: "الشحن الجوي",
          desc: "شحن جوي سريع وذو أولوية للشحنات العاجلة بما في ذلك خيارات الشحن الموحد والمباشر والمحمول باليد.",
          video: "/assets/videos/air-freight.mp4",
          link: "/air-freight",
        },
        {
          id: "٠٣",
          title: "التخليص الجمركي",
          desc: "تخليص جمركي معتمد مع إدارة متخصصة للبيانات الجمركية واسترداد الرسوم والاستشارات التنظيمية.",
          video: "/assets/videos/customs-brokerage.mp4",
          link: "/customs-brokerage",
        },
        {
          id: "٠٤",
          title: "النقل الداخلي",
          desc: "نقل البضائع عبر البلاد بخيارات حمولة كاملة وجزئية ونقل تحت الكفالة وتسليم الميل الأخير.",
          video: "/assets/videos/domestic-trucking.mp4",
          link: "/domestic-trucking",
        },
        {
          id: "٠٥",
          title: "شحن المشاريع",
          desc: "لوجستيات شاملة للشحنات الضخمة أو الثقيلة أو الحساسة من التخطيط الميداني إلى التسليم الآمن.",
          video: "/assets/videos/project-cargo.mp4",
          link: "/project-cargo",
        },
        {
          id: "٠٦",
          title: "التخزين والتوزيع",
          desc: "تخزين آمن، تعبئة وتغليف، وتوصيل في الوقت المحدد عبر شبكة من مرافق التخزين.",
          video: "/assets/videos/warehousing.mp4",
          link: "/warehousing-distribution",
        },
      ] satisfies SolutionItem[],
    },
  };

  return content[safeLang];
}

export default function CoreSolutions({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const router = useRouter();
  const isRtl = content.dir === "rtl";

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const tryPlay = () => {
        video.play().catch(() => {});
      };

      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener("loadeddata", tryPlay, { once: true });
      }
    });

    const ctx = gsap.context(() => {
      const dynamicHeadings = gsap.utils.toArray(
        ".scroll-green-text",
      ) as HTMLElement[];

      dynamicHeadings.forEach((heading) => {
        const words = heading.querySelectorAll(".word");
        if (!words.length) return;

        const turnBlack = () => {
          gsap.to(words, {
            color: "#020408",
            duration: 0.3,
            overwrite: true,
          });
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
      });

      const sections = gsap.utils.toArray(".solution-item") as HTMLElement[];
      const videos = gsap.utils.toArray(
        ".solution-video",
      ) as HTMLVideoElement[];

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          toggleClass: { targets: section, className: "is-active" },
        });

        if (index > 0 && videos[index]) {
          gsap.fromTo(
            videos[index],
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 60%",
                end: "top 20%",
                scrub: 1,
              },
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors duration-300 will-change-[color] ${
          isRtl ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
        }`}
        style={{ color: "#020408" }}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full bg-white pb-10 pt-32"
      dir={content.dir}
    >
      <div className="container mx-auto mb-24 flex justify-center px-6 text-center md:px-16 lg:px-24">
        <h2 className="scroll-green-text flex max-w-5xl flex-wrap justify-center font-manrope text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[4rem]">
          {splitText(content.mainHeading)}
        </h2>
      </div>

      <div className="container relative mx-auto px-6 pb-[20vh] md:px-16 lg:px-24">
        <div className="relative flex flex-col items-start gap-10 lg:flex-row">
          <div className="relative z-10 w-full lg:w-5/12">
            {content.solutions.map((item, index) => (
              <div
                key={item.id}
                className="solution-item flex h-[60vh] flex-col justify-center opacity-40 transition-opacity duration-500 [&.is-active]:opacity-100"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-1 font-manrope text-xl text-gray-400">
                    {item.id}
                  </span>

                  <div>
                    <h3 className="scroll-green-text mb-6 flex flex-wrap font-manrope text-4xl font-semibold lg:text-5xl">
                      {splitText(item.title)}
                    </h3>

                    <p className="mb-6 max-w-sm text-base leading-relaxed text-gray-500">
                      {item.desc}
                    </p>

                    <button
                      onClick={() => router.push(`/${lang}${item.link}`)}
                      className="border-b border-brand-dark/20 pb-1 text-xs font-bold uppercase tracking-widest text-brand-dark transition-all hover:border-[#00FF85] hover:text-[#00FF85]"
                    >
                      {content.seeMore}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-[20vh] z-0 hidden h-[60vh] w-full items-center justify-end lg:flex lg:w-7/12">
            <div
              className="relative aspect-4/3 w-full max-w-200 overflow-hidden rounded-[2.5rem] shadow-2xl"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 65%, 4% 60%, 4% 40%, 0 35%)",
              }}
            >
              {content.solutions.map((item, index) => (
                <video
                  key={item.id}
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    zIndex: index + 1,
                    clipPath:
                      index === 0
                        ? "inset(0% 0% 0% 0%)"
                        : "inset(100% 0% 0% 0%)",
                  }}
                  className="solution-video absolute left-0 top-0 h-full w-full object-cover"
                />
              ))}
              <div className="pointer-events-none absolute inset-0 z-50 bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
