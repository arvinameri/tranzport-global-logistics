"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { AppLocale, locales } from "@/i18nConfig";

const CELL_SIZE = 92;
const RADIUS = 3.15;
const LINE_GAP = 10;
const LINE_WIDTH = 1.15;

type CorpacIntroGridProps = {
  lang: string;
};

type IntroContent = {
  title: string;
  titleClassName: string;
  bodyWrapperClassName: string;
  paragraphClassName: string;
  textDir: "ltr" | "rtl";
  textAlignClassName: string;
  paragraphs: string[];
};

function getIntroContent(lang: string): IntroContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, IntroContent> = {
    en: {
      title: "About Baharan Holding",
      titleClassName:
        "mb-8 max-w-5xl font-manrope text-4xl font-semibold leading-[1.08] tracking-tight text-[#07071C] md:text-5xl lg:text-[4rem]",
      bodyWrapperClassName:
        "max-w-4xl space-y-6 text-left text-base leading-relaxed text-gray-600 md:text-center md:text-lg",
      paragraphClassName: "",
      textDir: "ltr",
      textAlignClassName: "text-left md:text-center",
      paragraphs: [
        "Established in 2010, Baharan Holding has evolved into a dynamic global organization with a proven track record across domestic and foreign trade, logistics, and retail distribution. Leveraging deep expertise and strategic collaborations with prominent brands—ranging from the Azarakhsh International Group and EEFA to international leaders like P&G and Zarsima Qeshm—we have built a robust, integrated supply chain network. Our operations seamlessly bridge construction contracting, household appliances, and personal care, allowing us to execute tailored strategies that drive market development and enhance efficiency.",
        "In today's highly competitive business ecosystem, our commitment is rooted in professional accountability, quality assurance, and sustainable value creation. By combining innovative management with specialized execution in sales optimization and distribution networks, Baharan Holding delivers reliable, scalable solutions aligned with global standards. We are dedicated to facilitating the flow of trade, building long-term trust, and serving our partners and customers at every stage with speed, integrity, and unmatched operational agility.",
      ],
    },
    fa: {
      title: "درباره هلدینگ بهاران",
      titleClassName:
        "mb-8 max-w-5xl font-vazirmatn text-[34px] font-semibold leading-[1.2] tracking-tight text-[#07071C] md:text-[44px] lg:text-[56px]",
      bodyWrapperClassName:
        "max-w-4xl space-y-6 text-[15px] leading-[2] text-gray-600 md:text-[17px]",
      paragraphClassName: "font-vazirmatn",
      textDir: "rtl",
      textAlignClassName: "text-right",
      paragraphs: [
        "هلدینگ بهاران که در سال 2010 تأسیس شد، در طول زمان به مجموعه‌ای پویا و بین‌المللی با سابقه‌ای اثبات‌شده در تجارت داخلی و خارجی، لجستیک و توزیع خرده‌فروشی تبدیل شده است. با اتکا به دانش عمیق تخصصی و همکاری‌های راهبردی با برندهای برجسته—از گروه بین‌المللی آذرخش و EEFA گرفته تا رهبران جهانی همچون P&G و زرسیما قشم—ما شبکه‌ای یکپارچه و قدرتمند در زنجیره تأمین ایجاد کرده‌ایم. عملیات ما حوزه‌های پیمانکاری ساخت‌وساز، لوازم خانگی و محصولات مراقبت شخصی را به‌صورت منسجم به یکدیگر متصل می‌کند و این امکان را فراهم می‌سازد که راهبردهایی متناسب با بازار طراحی و اجرا کنیم؛ راهبردهایی که به توسعه بازار و افزایش بهره‌وری منجر می‌شوند.",
        "در اکوسیستم بسیار رقابتی کسب‌وکار امروز، تعهد ما بر پایه مسئولیت‌پذیری حرفه‌ای، تضمین کیفیت و خلق ارزش پایدار شکل گرفته است. هلدینگ بهاران با ترکیب مدیریت نوآورانه و اجرای تخصصی در بهینه‌سازی فروش و شبکه‌های توزیع، راهکارهایی قابل اعتماد، مقیاس‌پذیر و هماهنگ با استانداردهای جهانی ارائه می‌دهد. ما متعهد هستیم جریان تجارت را تسهیل کنیم، اعتماد بلندمدت بسازیم و در تمام مراحل با سرعت، صداقت و چابکی عملیاتی ممتاز در کنار شرکا و مشتریان خود باشیم.",
      ],
    },
    ar: {
      title: "حول هولدينغ بهاران",
      titleClassName:
        "mb-8 max-w-5xl font-vazirmatn text-[33px] font-semibold leading-[1.22] tracking-tight text-[#07071C] md:text-[43px] lg:text-[54px]",
      bodyWrapperClassName:
        "max-w-4xl space-y-6 text-[15px] leading-[2] text-gray-600 md:text-[17px]",
      paragraphClassName: "font-vazirmatn",
      textDir: "rtl",
      textAlignClassName: "text-right",
      paragraphs: [
        "تأسس هولدينغ بهاران عام 2010، ومنذ ذلك الحين تطور ليصبح مؤسسة عالمية ديناميكية ذات سجل مثبت في التجارة المحلية والخارجية والخدمات اللوجستية والتوزيع. ومن خلال الاستفادة من خبرات عميقة وشراكات استراتيجية مع علامات بارزة—بدءًا من مجموعة آذرخش الدولية وEEFA وصولًا إلى قادة عالميين مثل P&G وزرسيما قشم—تمكنا من بناء شبكة قوية ومتكاملة لسلسلة الإمداد. وتربط عملياتنا بسلاسة بين المقاولات الإنشائية والأجهزة المنزلية ومنتجات العناية الشخصية، بما يتيح لنا تنفيذ استراتيجيات مصممة خصيصًا لدفع نمو السوق وتعزيز الكفاءة.",
        "وفي بيئة الأعمال شديدة التنافس اليوم، يرتكز التزامنا على المسؤولية المهنية وضمان الجودة وخلق قيمة مستدامة. ومن خلال الجمع بين الإدارة المبتكرة والتنفيذ المتخصص في تحسين المبيعات وشبكات التوزيع، يقدم هولدينغ بهاران حلولًا موثوقة وقابلة للتوسع ومتوافقة مع المعايير العالمية. ونحن ملتزمون بتسهيل تدفق التجارة، وبناء الثقة طويلة الأمد، وخدمة شركائنا وعملائنا في كل مرحلة بسرعة ونزاهة ومرونة تشغيلية استثنائية.",
      ],
    },
  };

  return content[safeLang];
}

export default function CorpacIntroGrid({ lang }: CorpacIntroGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

  const content = useMemo(() => getIntroContent(lang), [lang]);

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
      ctx.strokeStyle = `rgba(32, 230, 170, ${alpha * 0.6})`;
      ctx.shadowColor = `rgba(20, 220, 170, ${alpha * 0.5})`;
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

        const left = x;
        const right = x + CELL_SIZE;
        const top = y;
        const bottom = y + CELL_SIZE;

        drawLine(ctx, left + LINE_GAP, top, right - LINE_GAP, top, alpha);
        drawLine(
          ctx,
          left + LINE_GAP,
          bottom,
          right - LINE_GAP,
          bottom,
          alpha * 0.86,
        );
        drawLine(ctx, left, top + LINE_GAP, left, bottom - LINE_GAP, alpha);
        drawLine(
          ctx,
          right,
          top + LINE_GAP,
          right,
          bottom - LINE_GAP,
          alpha * 0.86,
        );
      }
    }
  }, [drawLine]);

  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

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
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

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
    const container = containerRef.current;
    if (!container) return;

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas, onMouseMove, onMouseLeave]);

  return (
    <section
      ref={containerRef}
      dir="ltr"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB]"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      />

      <div
        className="relative flex flex-col items-center px-6 py-24 text-center"
        style={{ zIndex: 2 }}
      >
        <h1 className={content.titleClassName}>{content.title}</h1>

        <div
          dir={content.textDir}
          className={`${content.bodyWrapperClassName} ${content.textAlignClassName}`}
        >
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className={content.paragraphClassName}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
