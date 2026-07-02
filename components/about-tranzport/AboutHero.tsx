"use client";

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { AppLocale, locales } from "@/i18nConfig";

const CELL_SIZE = 92;
const RADIUS = 3.15;
const LINE_GAP = 10;
const LINE_WIDTH = 1.15;

type AboutHeroProps = {
  lang: string;
};

type HeroContent = {
  isRtl: boolean;
  tabGroup: string;
  tabHolding: string;
  title: string;
  description: string;
  titleClassName: string;
  descClassName: string;
  wrapperClassName: string;
};

function getHeroContent(lang: string): HeroContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, HeroContent> = {
    en: {
      isRtl: false,
      tabGroup: "Baharan Group",
      tabHolding: "Baharan Holding",
      title: "About Baharan Group",
      description:
        "The Baharan Group began its activities in 2010 with a focus on domestic trade and, by leveraging innovative management, specialized expertise, and an extensive network of local business connections, has established a path of sustainable growth. By expanding its scope of operations into domestic trade within distribution and sales industries, foreign trade, and logistics, the Group today stands as an experienced holding with an effective presence in both domestic and international markets.",
      titleClassName:
        "mb-6 max-w-4xl font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[4rem]",
      descClassName:
        "max-w-2xl text-base leading-relaxed text-white/55 md:text-lg",
      wrapperClassName: "text-center",
    },
    fa: {
      isRtl: true,
      tabGroup: "گروه بهاران",
      tabHolding: "هلدینگ بهاران",
      title: "درباره گروه بهاران",
      description:
        "گروه بهاران فعالیت‌های خود را در سال 2010 با تمرکز بر تجارت داخلی آغاز کرد و با بهره‌گیری از مدیریت نوآورانه، تخصص حرفه‌ای و شبکه گسترده‌ای از ارتباطات تجاری محلی، مسیر رشد پایدار خود را پایه‌گذاری کرد. با توسعه دامنه عملیات به تجارت داخلی در صنایع توزیع و فروش، تجارت خارجی و لجستیک، این گروه امروز به‌عنوان یک هلدینگ باتجربه با حضوری مؤثر در بازارهای داخلی و بین‌المللی شناخته می‌شود.",
      titleClassName:
        "mb-6 max-w-4xl font-vazirmatn text-[32px] font-bold leading-[1.2] tracking-tight text-white md:text-[44px] lg:text-[54px]",
      descClassName:
        "max-w-2xl font-vazirmatn text-[15px] leading-[2] text-white/60 md:text-[17px]",
      wrapperClassName: "text-center md:text-right",
    },
    ar: {
      isRtl: true,
      tabGroup: "مجموعة بهاران",
      tabHolding: "هولدينغ بهاران",
      title: "حول مجموعة بهاران",
      description:
        "بدأت مجموعة بهاران أعمالها في عام 2010 مع التركيز على التجارة المحلية، ومن خلال الاستفادة من الإدارة المبتكرة والخبرة المتخصصة وشبكة واسعة من الاتصالات التجارية المحلية، أسست مسارًا للنمو المستدام. ومن خلال توسيع نطاق عملياتها ليشمل التجارة المحلية في صناعات التوزيع والمبيعات والتجارة الخارجية والخدمات اللوجستية، تقف المجموعة اليوم ككيان قابض ذي خبرة وحضور فعّال في الأسواق المحلية والدولية.",
      titleClassName:
        "mb-6 max-w-4xl font-vazirmatn text-[31px] font-bold leading-[1.22] tracking-tight text-white md:text-[42px] lg:text-[52px]",
      descClassName:
        "max-w-2xl font-vazirmatn text-[15px] leading-[2] text-white/60 md:text-[17px]",
      wrapperClassName: "text-center md:text-right",
    },
  };
  return content[safeLang];
}

export default function AboutHero({ lang }: AboutHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dprRef = useRef<number>(1);
  const router = useRouter();

  const [tab, setTab] = useState<"tranzport" | "corpac">("tranzport");
  const content = useMemo(() => getHeroContent(lang), [lang]);

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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07071C]"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      />

      <div
        className="relative flex flex-col items-center px-6"
        style={{ zIndex: 2 }}
      >
        <div
          dir={content.isRtl ? "rtl" : "ltr"}
          className={`mb-12 inline-flex items-center rounded-full border border-white/10 bg-white/4 p-1.5 backdrop-blur-md ${
            content.isRtl ? "font-vazirmatn" : "font-sans"
          }`}
        >
          <button
            onClick={() => setTab("tranzport")}
            className={`rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-200 ${
              tab === "tranzport"
                ? "bg-white/12 text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                : "text-white/55 hover:text-white/80"
            }`}
          >
            {content.tabGroup}
          </button>
          <button
            onClick={() => {
              setTab("corpac");
              router.push(`/${lang}/about-corpac-group`);
            }}
            className={`rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-200 ${
              tab === "corpac"
                ? "bg-white/12 text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                : "text-white/55 hover:text-white/80"
            }`}
          >
            {content.tabHolding}
          </button>
        </div>

        <div
          dir={content.isRtl ? "rtl" : "ltr"}
          className={`flex flex-col items-center md:items-start ${content.wrapperClassName}`}
        >
          <h1 className={content.titleClassName}>{content.title}</h1>
          <p className={content.descClassName}>{content.description}</p>
        </div>
      </div>
    </section>
  );
}
