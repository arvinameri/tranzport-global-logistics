"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { AppLocale, locales, getLocaleDirection } from "@/i18nConfig";

const CELL_SIZE = 92;
const RADIUS = 3.15;
const LINE_GAP = 10;
const LINE_WIDTH = 1.15;

function getHeroContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      titleLine1: "Technology That",
      titleLine2: "Strengthens Your Supply Chain",
      description:
        "Real-time visibility, connected systems, and data-driven execution — Baharan Group delivers the technology infrastructure required to improve control, coordination, and operational performance across modern logistics networks.",
      btnPrimary: "Request a Quote",
      btnSecondary: "Talk to a Logistics Expert",
    },
    fa: {
      titleLine1: "فناوری که",
      titleLine2: "زنجیره تامین شما را تقویت می‌کند",
      description:
        "دید لحظه‌ای، سیستم‌های متصل و اجرای مبتنی بر داده — گروه بهاران زیرساخت فناوری مورد نیاز برای بهبود کنترل، هماهنگی و عملکرد عملیاتی در شبکه‌های لجستیک مدرن را ارائه می‌دهد.",
      btnPrimary: "درخواست استعلام",
      btnSecondary: "گفت‌وگو با کارشناس لجستیک",
    },
    ar: {
      titleLine1: "تكنولوجيا",
      titleLine2: "تعزز سلسلة التوريد الخاصة بك",
      description:
        "الرؤية في الوقت الفعلي، والأنظمة المتصلة، والتنفيذ القائم على البيانات — تقدم مجموعة بهاران البنية التحتية التكنولوجية المطلوبة لتحسين التحكم والتنسيق والأداء التشغيلي في شبكات الخدمات اللوجستية الحديثة.",
      btnPrimary: "اطلب عرض سعر",
      btnSecondary: "تحدث مع خبير لوجستي",
    },
  };

  return content[safeLang];
}

export default function TechnologyHero({ lang }: { lang: string }) {
  const content = useMemo(() => getHeroContent(lang), [lang]);
  const dir = getLocaleDirection(lang);
  const isRtl = dir === "rtl";

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F9FAFB]"
      dir={dir}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      />

      <div
        className="relative flex max-w-5xl flex-col items-center px-6 text-center"
        style={{ zIndex: 2 }}
      >
        <h1
          className={`mb-6 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-tight text-[#07071C] md:text-5xl lg:text-[4.1rem] ${
            isRtl ? "font-sans leading-[1.3]" : "font-sans"
          }`}
        >
          {content.titleLine1}
          <br />
          {content.titleLine2}
        </h1>

        <p
          className={`max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg ${
            isRtl ? "font-sans leading-[1.8]" : ""
          }`}
        >
          {content.description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={`/${lang}/contact`}
            className={`inline-flex min-w-52.5 items-center justify-center rounded-full bg-[#00E37C] px-7 py-3.5 text-sm font-medium text-[#061019] transition hover:bg-[#00c96d] ${
              isRtl ? "font-sans font-bold" : ""
            }`}
          >
            {content.btnPrimary}
          </Link>

          <a
            href="tel:+982188745272"
            className={`inline-flex min-w-60 items-center justify-center rounded-full border border-[#D7DBE0] bg-white px-7 py-3.5 text-sm font-medium text-[#07071C] transition hover:border-[#bfc5cb] hover:bg-[#f5f7f8] ${
              isRtl ? "font-sans font-bold" : ""
            }`}
          >
            {content.btnSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
