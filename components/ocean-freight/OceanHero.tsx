// client/components/ocean-freight/OceanHero.tsx
"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppLocale, normalizeLocale } from "@/i18nConfig";

const CELL_SIZE = 92;
const RADIUS = 3.15;
const LINE_GAP = 10;
const LINE_WIDTH = 1.15;

export default function OceanHero({ lang }: { lang?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

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

  const isRtl = currentLang === "fa" || currentLang === "ar";

  const content: Record<AppLocale, any> = {
    en: {
      title1: "Ocean Freight That",
      title2: "Empowers Global Trade",
      desc1:
        "Leveraging Baharan Group's specialized expertise and extensive network",
      desc2: "to deliver reliable, efficient shipping — safely and on time.",
      quoteBtn: "Request a Quote",
      expertBtn: "Talk to a Logistics Expert",
    },
    fa: {
      title1: "حمل و نقل دریایی که",
      title2: "تجارت جهانی را توسعه می‌دهد",
      desc1: "با بهره‌گیری از تخصص ویژه و شبکه گسترده گروه بهاران",
      desc2: "برای ارائه حمل و نقلی مطمئن و کارآمد — ایمن و در زمان مقرر.",
      quoteBtn: "درخواست استعلام",
      expertBtn: "گفت‌وگو با کارشناس لجستیک",
    },
    ar: {
      title1: "الشحن البحري الذي",
      title2: "يعزز التجارة العالمية",
      desc1: "بالاستفادة من خبرة مجموعة بهاران المتخصصة وشبكتها الواسعة",
      desc2: "لتقديم شحن موثوق وفعال — بأمان وفي الوقت المحدد.",
      quoteBtn: "اطلب عرض سعر",
      expertBtn: "تحدث مع خبير لوجستي",
    },
  };

  const t = content[currentLang];

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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050519]"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      />

      <div
        className="relative flex flex-col items-center px-6 text-center"
        style={{ zIndex: 2 }}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <h1
          className={`mb-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[4rem] ${
            isRtl ? "font-vazirmatn leading-[1.3]" : "font-sans"
          }`}
        >
          {t.title1}
          <br />
          {t.title2}
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
          {t.desc1}
          <br className="hidden md:block" />
          {t.desc2}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${currentLang}/contact`}
            className={`rounded-full bg-brand-green px-8 py-4 text-sm font-bold tracking-wide text-[#0a0f1a] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_28px_rgba(0,210,106,0.45)] ${
              isRtl ? "font-vazirmatn tracking-normal" : ""
            }`}
          >
            {t.quoteBtn}
          </Link>

          <Link
            href={`/${currentLang}/contact`}
            className={`rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/10 ${
              isRtl ? "font-vazirmatn tracking-normal" : ""
            }`}
          >
            {t.expertBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
