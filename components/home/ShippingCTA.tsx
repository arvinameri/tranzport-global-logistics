"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      eyebrow: "Quick access to essential tools",
      line1: "Already Shipping",
      line2: "with Baharan Group?",
      btnTrack: "Track a Shipment",
      btnPayment: "Make a Payment",
    },
    fa: {
      dir: "rtl" as const,
      eyebrow: "دسترسی سریع به ابزارهای ضروری",
      line1: "در حال ارسال بار با",
      line2: "گروه بهاران هستید؟",
      btnTrack: "پیگیری مرسوله",
      btnPayment: "پرداخت فاکتور",
    },
    ar: {
      dir: "rtl" as const,
      eyebrow: "وصول سريع للأدوات الأساسية",
      line1: "هل تقوم بالشحن مع",
      line2: "مجموعة بهاران بالفعل؟",
      btnTrack: "تتبع الشحنة",
      btnPayment: "الدفع",
    },
  };

  return content[safeLang];
}

export default function ShippingCTA({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isRtl = content.dir === "rtl";

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
  }, [lang]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gridRef.current.style.setProperty("--mouse-x", `${x}px`);
      gridRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors duration-300 will-change-[color] ${
          isRtl ? "ml-2 md:ml-4" : "mr-2 md:mr-4"
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-brand-dark py-40 md:py-56 z-20 cursor-default"
      dir={content.dir}
    >
      <div className="absolute top-0 left-0 w-full flex justify-center z-30 pointer-events-none">
        <svg
          viewBox="0 0 800 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-200 h-8 md:h-12 text-white"
        >
          <path
            d="M0 0 C 30 0, 30 48, 60 48 L 740 48 C 770 48, 770 0, 800 0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex justify-center z-30 pointer-events-none">
        <svg
          viewBox="0 0 800 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-200 h-8 md:h-12 text-white"
        >
          <path
            d="M0 48 C 30 48, 30 0, 60 0 L 740 0 C 770 0, 770 48, 800 48 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        ref={gridRef}
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 133, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 133, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, rgba(0,0,0,0.7) 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, rgba(0,0,0,0.7) 40%, transparent 100%)`,
        }}
      />

      <div className="container relative z-20 mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-center text-center">
        <span className="text-brand-gray text-sm md:text-base mb-8 font-medium tracking-wide">
          {content.eyebrow}
        </span>

        <h2 className="scroll-green-text-white flex flex-col justify-center items-center font-manrope text-5xl md:text-6xl lg:text-[5.5rem] font-semibold leading-[1.3] tracking-tight mb-16">
          <span className="block flex-wrap justify-center md:mb-2">
            {splitText(content.line1)}
          </span>
          <span className="block flex-wrap justify-center">
            {splitText(content.line2)}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-dark transition-transform hover:scale-105 shadow-md">
            {content.btnTrack}
          </button>
          <button className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40">
            {content.btnPayment}
          </button>
        </div>
      </div>
    </section>
  );
}
