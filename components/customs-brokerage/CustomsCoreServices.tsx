"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

// ─── Mosaic Grid Config ───────────────────────────────────────────────
const CELL_SIZE = 92;
const RADIUS = 3.15;
const LINE_GAP = 10;
const LINE_WIDTH = 1.15;

type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      heading: "Core Services",
      intro:
        "Drawing on Baharan Group's long-term experience in domestic trade, foreign trade, and logistics, our customs brokerage services are designed to support sustainable growth, protect your supply chain from disruption, and align every clearance step with your wider commercial objectives.",
      services: [
        {
          id: "formal-entries",
          icon: "document",
          title: "Formal Entries",
          description:
            "Formal customs entries managed with the same discipline Baharan Group applies in construction contracting and commercial sales, ensuring regulated imports meet all applicable requirements with clear documentation and controlled risk.",
        },
        {
          id: "informal-entries",
          icon: "bolt",
          title: "Informal Entries",
          description:
            "Informal entries structured for lower-value shipments, designed to keep everyday trade moving smoothly and to support the continuity of domestic and international flows across your distribution and sales network.",
        },
        {
          id: "duty-drawbacks",
          icon: "money",
          title: "Duty Drawbacks",
          description:
            "Duty drawback services aligned with our broader focus on supply chain optimization and cost efficiency, helping you recover eligible duties and taxes on re-exports through a clear, end-to-end managed process.",
        },
        {
          id: "compliance-classification",
          icon: "shield",
          title: "Compliance & Classification Advisory",
          description:
            "Classification and compliance advisory informed by hands-on experience with brands such as Azarakhsh International Group, Kohan Ceram, EEFA, P&G and other leading companies, supporting accurate tariff decisions and stronger regulatory alignment.",
        },
        {
          id: "ftz-bonded-cargo",
          icon: "briefcase",
          title: "FTZs & Bonded Cargo Expertise",
          description:
            "Support for FTZ and bonded cargo built on Baharan Group’s integrated view of domestic trade, foreign trade, and logistics, enabling duty deferral, controlled transfers, and efficient coordination within complex supply chains.",
        },
      ] satisfies ServiceItem[],
    },
    fa: {
      dir: "rtl" as const,
      heading: "خدمات اصلی",
      intro:
        "با تکیه بر تجربه بلندمدت گروه بهاران در تجارت داخلی، تجارت خارجی و لجستیک، خدمات ترخیص و امور گمرکی ما برای پشتیبانی از رشد پایدار، محافظت از زنجیره تأمین شما در برابر اختلال، و هم‌راستا کردن هر مرحله از ترخیص با اهداف تجاری کلان شما طراحی شده‌اند.",
      services: [
        {
          id: "formal-entries",
          icon: "document",
          title: "اظهارنامه‌های رسمی",
          description:
            "مدیریت اظهارنامه‌های رسمی گمرکی با همان انضباطی که گروه بهاران در قراردادهای عمرانی و فروش تجاری به کار می‌گیرد، تا واردات مشمول مقررات با مستندات شفاف و ریسک کنترل‌شده انجام شود.",
        },
        {
          id: "informal-entries",
          icon: "bolt",
          title: "اظهارنامه‌های غیررسمی",
          description:
            "ساختاربندی اظهارنامه‌های غیررسمی برای محموله‌های کم‌ارزش، با هدف روان نگه داشتن جریان روزمره تجارت و پشتیبانی از تداوم جریان‌های داخلی و بین‌المللی در شبکه توزیع و فروش شما.",
        },
        {
          id: "duty-drawbacks",
          icon: "money",
          title: "استرداد حقوق و عوارض",
          description:
            "خدمات استرداد حقوق و عوارض در راستای تمرکز گسترده‌تر ما بر بهینه‌سازی زنجیره تأمین و بهره‌وری هزینه، تا بتوانید عوارض و مالیات‌های قابل بازیافت صادرات مجدد را از طریق یک فرایند شفاف و یکپارچه بازپس بگیرید.",
        },
        {
          id: "compliance-classification",
          icon: "shield",
          title: "مشاوره انطباق و طبقه‌بندی",
          description:
            "مشاوره طبقه‌بندی و انطباق بر پایه تجربه عملی با برندها و شرکت‌هایی مانند گروه بین‌المللی آذرخش، کهن سرام، EEFA، P&G و دیگر مجموعه‌های پیشرو، برای پشتیبانی از تصمیم‌گیری دقیق تعرفه‌ای و همسویی بهتر با الزامات مقرراتی.",
        },
        {
          id: "ftz-bonded-cargo",
          icon: "briefcase",
          title: "تخصص در FTZ و محموله‌های bonded",
          description:
            "پشتیبانی از مناطق آزاد تجاری و محموله‌های bonded بر پایه نگاه یکپارچه گروه بهاران به تجارت داخلی، تجارت خارجی و لجستیک، برای ایجاد امکان تعویق حقوق و عوارض، انتقال‌های کنترل‌شده و هماهنگی کارآمد.",
        },
      ] satisfies ServiceItem[],
    },
    ar: {
      dir: "rtl" as const,
      heading: "الخدمات الأساسية",
      intro:
        "استنادًا إلى الخبرة طويلة الأمد لمجموعة بهاران في التجارة الداخلية والتجارة الخارجية والخدمات اللوجستية، تم تصميم خدمات التخليص الجمركي لدينا لدعم النمو المستدام، وحماية سلسلة التوريد من التعطل، ومواءمة كل خطوة من خطوات التخليص مع أهدافكم التجارية الأوسع.",
      services: [
        {
          id: "formal-entries",
          icon: "document",
          title: "البيانات الرسمية",
          description:
            "إدارة البيانات الجمركية الرسمية بنفس الانضباط الذي تطبقه مجموعة بهاران في التعاقدات الإنشائية والمبيعات التجارية، بما يضمن امتثال الواردات المنظمة لجميع المتطلبات مع وثائق واضحة ومخاطر مضبوطة.",
        },
        {
          id: "informal-entries",
          icon: "bolt",
          title: "البيانات غير الرسمية",
          description:
            "تنظيم البيانات غير الرسمية للشحنات منخفضة القيمة بما يحافظ على سلاسة الحركة التجارية اليومية ويدعم استمرارية التدفقات المحلية والدولية عبر شبكة التوزيع والمبيعات الخاصة بكم.",
        },
        {
          id: "duty-drawbacks",
          icon: "money",
          title: "استرداد الرسوم الجمركية",
          description:
            "خدمات استرداد الرسوم منسجمة مع تركيزنا الأوسع على تحسين سلسلة التوريد وكفاءة التكلفة، بما يساعدكم على استعادة الرسوم والضرائب المؤهلة على إعادة التصدير من خلال عملية واضحة ومتكاملة الإدارة.",
        },
        {
          id: "compliance-classification",
          icon: "shield",
          title: "استشارات الامتثال والتصنيف",
          description:
            "استشارات التصنيف والامتثال مدعومة بخبرة عملية مع علامات وشركات مثل مجموعة أذرخش الدولية وكوهان سيرام وEEFA وP&G وغيرها من المؤسسات الرائدة، لدعم قرارات التعرفة الدقيقة وتعزيز المواءمة التنظيمية.",
        },
        {
          id: "ftz-bonded-cargo",
          icon: "briefcase",
          title: "خبرة في FTZ والشحنات المربوطة جمركياً",
          description:
            "دعم للمناطق الحرة والشحنات المربوطة جمركياً قائم على الرؤية المتكاملة لمجموعة بهاران في التجارة الداخلية والخارجية والخدمات اللوجستية، بما يتيح تأجيل الرسوم والتحويلات المنظمة والتنسيق الفعال داخل سلاسل التوريد المعقدة.",
        },
      ] satisfies ServiceItem[],
    },
  };

  return content[safeLang];
}

// ─── Icons ────────────────────────────────────────────────────────────
function ServiceIcon({ type }: { type: string }) {
  const common = "h-10 w-10 text-[#2BC56C]";

  if (type === "document")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <rect x="5" y="3" width="14" height="18" rx="3" fill="currentColor" />
        <rect x="8" y="7" width="8" height="1.8" rx="0.9" fill="#0E102A" />
        <rect x="8" y="11" width="8" height="1.8" rx="0.9" fill="#0E102A" />
        <rect x="8" y="15" width="8" height="1.8" rx="0.9" fill="#0E102A" />
      </svg>
    );

  if (type === "bolt")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <path
          d="M13.5 2L5.7 13.1C5.2 13.8 5.7 14.7 6.6 14.7H11L10.4 22L18.3 10.9C18.8 10.2 18.3 9.3 17.4 9.3H13L13.5 2Z"
          fill="currentColor"
        />
      </svg>
    );

  if (type === "money")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <rect x="3" y="6" width="18" height="12" rx="3" fill="currentColor" />
        <circle cx="12" cy="12" r="2.8" fill="#0E102A" />
        <circle cx="6.5" cy="12" r="1.1" fill="#0E102A" />
        <circle cx="17.5" cy="12" r="1.1" fill="#0E102A" />
      </svg>
    );

  if (type === "shield")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={common}
        aria-hidden="true"
      >
        <path
          d="M12 2L19 5V10.8C19 15.4 16.2 19.5 12 21.5C7.8 19.5 5 15.4 5 10.8V5L12 2Z"
          fill="currentColor"
        />
      </svg>
    );

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path
        d="M5 7.5C5 6.1 6.1 5 7.5 5H10L11.2 6.5H16.5C17.9 6.5 19 7.6 19 9V16.5C19 17.9 17.9 19 16.5 19H7.5C6.1 19 5 17.9 5 16.5V7.5Z"
        fill="currentColor"
      />
      <rect x="5" y="9" width="14" height="2" fill="#0E102A" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function CustomsCoreServices({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const isRtl = content.dir === "rtl";

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number,
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "butt";
      ctx.strokeStyle = `rgba(32, 230, 170, ${alpha * 0.46})`;
      ctx.shadowColor = `rgba(20, 220, 170, ${alpha * 0.42})`;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    },
    [],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);

    const mouse = mouseRef.current;
    if (!mouse) return;

    const mouseCol = Math.floor(mouse.x / CELL_SIZE);
    const mouseRow = Math.floor(mouse.y / CELL_SIZE);
    const radiusCeil = Math.ceil(RADIUS);
    const maxCols = Math.ceil(width / CELL_SIZE) + 2;
    const maxRows = Math.ceil(height / CELL_SIZE) + 2;

    for (let row = mouseRow - radiusCeil; row <= mouseRow + radiusCeil; row++) {
      for (
        let col = mouseCol - radiusCeil;
        col <= mouseCol + radiusCeil;
        col++
      ) {
        if (row < 0 || col < 0 || row >= maxRows || col >= maxCols) continue;

        const centerX = col * CELL_SIZE + CELL_SIZE / 2;
        const centerY = row * CELL_SIZE + CELL_SIZE / 2;
        const dx = (centerX - mouse.x) / CELL_SIZE;
        const dy = (centerY - mouse.y) / CELL_SIZE;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > RADIUS) continue;

        const fade = 1 - dist / RADIUS;
        const alpha = Math.pow(fade, 1.75);

        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;

        drawLine(ctx, x + LINE_GAP, y, x + CELL_SIZE - LINE_GAP, y, alpha);
        drawLine(
          ctx,
          x + LINE_GAP,
          y + CELL_SIZE,
          x + CELL_SIZE - LINE_GAP,
          y + CELL_SIZE,
          alpha * 0.86,
        );
        drawLine(ctx, x, y + LINE_GAP, x, y + CELL_SIZE - LINE_GAP, alpha);
        drawLine(
          ctx,
          x + CELL_SIZE,
          y + LINE_GAP,
          x + CELL_SIZE,
          y + CELL_SIZE - LINE_GAP,
          alpha * 0.86,
        );
      }
    }
  }, [drawLine]);

  const resizeCanvas = useCallback(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const width = section.offsetWidth;
    const height = section.offsetHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    },
    [draw],
  );

  const onMouseLeave = useCallback(() => {
    mouseRef.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas, onMouseMove, onMouseLeave]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current;
      const section = sectionRef.current;
      const heading = headingRef.current;
      const words = heading?.querySelectorAll(".word");

      if (row && section) {
        const getMoveDistance = () => {
          const totalOverflow = row.scrollWidth - window.innerWidth;
          return totalOverflow > 0 ? -totalOverflow : 0;
        };

        gsap.to(row, {
          x: () => getMoveDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${row.scrollWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      if (words && words.length) {
        const turnBase = () => {
          gsap.to(words, { color: "#F3F4F6", duration: 0.22, overwrite: true });
        };
        const stopTimer = gsap.delayedCall(0.12, turnBase).pause();

        ScrollTrigger.create({
          trigger: heading,
          start: "top 80%",
          end: "bottom 10%",
          onUpdate: (self) => {
            stopTimer.restart(true);
            gsap.to(words, {
              color: "#00FF85",
              duration: 0.1,
              stagger: {
                amount: 0.22,
                from: self.direction === 1 ? "start" : "end",
              },
              overwrite: "auto",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const splitText = (text: string) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        dir={content.dir}
        className={`word inline-block transition-colors will-change-[color] ${
          isRtl ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
        }`}
        style={{ color: "#F3F4F6" }}
      >
        {word}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#07071C] py-24"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 1 }}
      />

      <div ref={containerRef} className="relative w-full" style={{ zIndex: 2 }}>
        <div dir={content.dir} className="mx-auto max-w-5xl px-6 text-center">
          <h2
            ref={headingRef}
            className="mx-auto flex max-w-fit flex-wrap justify-center text-[52px] font-medium leading-tight tracking-[-0.03em] md:text-[64px]"
          >
            {splitText(content.heading)}
          </h2>

          <p className="mx-auto mt-4 max-w-[65ch] text-[18px] leading-[1.6] tracking-[-0.01em] text-[#9CA3AF] md:text-[20px]">
            {content.intro}
          </p>
        </div>

        <div className="mt-20 w-full overflow-hidden">
          <div
            ref={rowRef}
            dir="ltr"
            className="flex w-max gap-6 px-[5vw] md:gap-8 md:px-[10vw]"
          >
            {content.services.map((service, index) => (
              <article
                key={`${service.id}-${index}`}
                dir={content.dir}
                className="flex h-80 w-[85vw] max-w-90 flex-none flex-col justify-start rounded-2xl bg-[#101026] p-8 transition-colors hover:bg-[#151532] md:max-w-100 md:p-10"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
              >
                <div className="mb-6">
                  <ServiceIcon type={service.icon} />
                </div>

                <h3 className="mb-4 text-[26px] font-normal leading-[1.1] tracking-[-0.02em] text-[#F3F4F6] md:text-[28px]">
                  {service.title}
                </h3>

                <p className="text-[16px] leading-normal tracking-[-0.01em] text-[#9CA3AF] md:text-[17px]">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
