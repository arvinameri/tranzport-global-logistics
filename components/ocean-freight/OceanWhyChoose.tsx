// client/components/ocean-freight/OceanWhyChoose.tsx
"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Zap, ShieldCheck } from "lucide-react";
import { AppLocale, normalizeLocale } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

const CELL_SIZE = 92;
const RADIUS = 3.15;
const LINE_GAP = 10;
const LINE_WIDTH = 1.15;

const getWhyChooseContent = (lang: AppLocale) => {
  const content = {
    en: {
      heading: "Why Choose Baharan Group for Ocean Freight",
      sub: "Backed by years of effective presence in domestic and international markets,\n delivering scalable solutions aligned with global standards.",
      features: [
        {
          icon: <Globe className="h-7 w-7" />,
          title: "Global Reach,\nLocal Expertise",
          desc: "Worldwide network backed by Baharan Group's extensive connections, paired with personalized support and continuous experience in international trade.",
        },
        {
          icon: <Zap className="h-7 w-7" />,
          title: "Proven Track\nRecord",
          desc: "Successful collaborations with reputable companies like P&G, Azarakhsh, and Zarsima Qeshm, optimizing supply chain and market development.",
        },
        {
          icon: <ShieldCheck className="h-7 w-7" />,
          title: "Commitment &\nTrust",
          desc: "Driven by organizational commitment and professional accountability, ensuring compliant, secure, and highly efficient cross-border trade.",
        },
      ],
      quoteBtn: "Request a Quote",
      contactBtn: "Contact us",
    },
    fa: {
      heading: "چرا گروه بهاران را برای حمل و نقل دریایی انتخاب کنید",
      sub: "با پشتوانه سال‌ها حضور موثر در بازارهای داخلی و بین‌المللی،\n ارائه راهکارهای مقیاس‌پذیر همسو با استانداردهای جهانی.",
      features: [
        {
          icon: <Globe className="h-7 w-7" />,
          title: "دسترسی جهانی،\nتخصص محلی",
          desc: "شبکه جهانی با پشتوانه ارتباطات گسترده گروه بهاران، همراه با پشتیبانی شخصی و تجربه مستمر در تجارت بین‌الملل.",
        },
        {
          icon: <Zap className="h-7 w-7" />,
          title: "سوابق\nدرخشان",
          desc: "همکاری‌های موفق با شرکت‌های معتبری مانند P&G، آذرخش و زرسیما قشم در بهینه‌سازی زنجیره تامین و توسعه بازار.",
        },
        {
          icon: <ShieldCheck className="h-7 w-7" />,
          title: "تعهد و\nاعتماد",
          desc: "مبتنی بر تعهد سازمانی و پاسخگویی حرفه‌ای، تضمین‌کننده تجارتی فرامرزی، منطبق بر قوانین، امن و بسیار کارآمد.",
        },
      ],
      quoteBtn: "درخواست استعلام",
      contactBtn: "تماس با ما",
    },
    ar: {
      heading: "لماذا تختار مجموعة بهاران للشحن البحري",
      sub: "مدعومة بسنوات من الحضور الفعال في الأسواق المحلية والدولية،\n لتقديم حلول قابلة للتطوير تتماشى مع المعايير العالمية.",
      features: [
        {
          icon: <Globe className="h-7 w-7" />,
          title: "نطاق عالمي،\nخبرة محلية",
          desc: "شبكة عالمية مدعومة باتصالات مجموعة بهاران الواسعة، مع دعم مخصص وخبرة مستمرة في التجارة الدولية.",
        },
        {
          icon: <Zap className="h-7 w-7" />,
          title: "سجل\nحافل",
          desc: "تعاون ناجح مع شركات مرموقة مثل P&G وآذرخش وزرسيما قشم، لتحسين سلسلة التوريد وتطوير السوق.",
        },
        {
          icon: <ShieldCheck className="h-7 w-7" />,
          title: "الالتزام\nوالثقة",
          desc: "مدفوعة بالالتزام التنظيمي والمساءلة المهنية، مما يضمن تجارة عبر الحدود آمنة وعالية الكفاءة ومطابقة للقوانين.",
        },
      ],
      quoteBtn: "اطلب عرض سعر",
      contactBtn: "اتصل بنا",
    },
  };
  return content[lang];
};

export default function OceanWhyChoose({ lang }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
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

  const t = useMemo(() => getWhyChooseContent(currentLang), [currentLang]);
  const isRtl = currentLang === "fa" || currentLang === "ar";

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors duration-300 will-change-[color] ${
          isRtl ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
        }`}
        style={{ color: "#F5F7FB" }}
      >
        {word}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-heading-wrap",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".why-heading-wrap", start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".why-sub",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: { trigger: ".why-sub", start: "top 88%" },
        },
      );

      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".why-cards-container", start: "top 82%" },
        },
      );

      gsap.fromTo(
        ".why-btns",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: { trigger: ".why-btns", start: "top 92%" },
        },
      );

      const dynamicHeadings = gsap.utils.toArray(
        ".why-scroll-green-text",
      ) as HTMLElement[];

      dynamicHeadings.forEach((heading) => {
        const words = heading.querySelectorAll(".word");
        if (!words.length) return;

        const turnWhite = () => {
          gsap.to(words, {
            color: "#F5F7FB",
            duration: 0.28,
            overwrite: true,
          });
        };

        const stopTimer = gsap.delayedCall(0.15, turnWhite).pause();

        ScrollTrigger.create({
          trigger: heading,
          start: "top 95%",
          end: "bottom 5%",
          onUpdate: (self) => {
            stopTimer.restart(true);

            gsap.to(words, {
              color: "#20E6AA",
              duration: 0.1,
              stagger: {
                amount: 0.22,
                from: self.direction === 1 ? "start" : "end",
              },
              overwrite: "auto",
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

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

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#0A0733] py-28 md:py-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* notch بالا */}
      <div className="absolute left-1/2 top-0 z-2 h-8 w-[34vw] min-w-60 max-w-160 -translate-x-1/2 rounded-b-[28px] bg-[#0A0733] shadow-[0_10px_30px_rgba(0,0,0,0.18)]" />
      <div className="absolute left-[calc(50%-17vw)] top-0 z-2 hidden h-8 w-10 rounded-br-3xl bg-[#0A0733] md:block" />
      <div className="absolute left-[calc(50%+17vw-2.5rem)] top-0 z-2 hidden h-8 w-10 rounded-bl-3xl bg-[#0A0733] md:block" />

      {/* notch پایین */}
      <div className="absolute bottom-0 left-1/2 z-2 h-10 w-[34vw] min-w-60 max-w-160 -translate-x-1/2 rounded-t-[28px] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-0 left-[calc(50%-17vw)] z-2 hidden h-10 w-10 rounded-tr-3xl bg-white md:block" />
      <div className="absolute bottom-0 left-[calc(50%+17vw-2.5rem)] z-2 hidden h-10 w-10 rounded-tl-3xl bg-white md:block" />

      {/* canvas موزاییک */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-1"
      />

      {/* glow خیلی ظریف پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_35%,rgba(32,230,170,0.05),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 text-center md:mb-20">
          <div className="why-heading-wrap opacity-0">
            <h2
              className={`why-scroll-green-text mx-auto flex max-w-4xl flex-wrap justify-center gap-x-3 gap-y-1 font-semibold leading-[1.1] text-white md:gap-x-4 md:gap-y-2 md:text-[4rem] lg:text-[4.5rem] ${
                isRtl
                  ? "font-vazirmatn tracking-normal text-[2.4rem]"
                  : "font-sans tracking-[-0.045em] text-[2.7rem]"
              }`}
            >
              {splitText(t.heading)}
            </h2>
          </div>

          <p
            className={`why-sub mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/48 opacity-0 md:mt-6 md:text-lg ${
              isRtl ? "font-vazirmatn" : ""
            }`}
          >
            {t.sub.split("\n")[0]}
            <br className="hidden md:block" />
            {t.sub.split("\n")[1]}
          </p>
        </div>

        <div className="why-cards-container mb-14 grid grid-cols-1 gap-5 md:mb-16 md:grid-cols-3">
          {t.features.map((f, i) => (
            <div
              key={i}
              className={`why-card group relative z-10 overflow-hidden rounded-[28px] border border-white/8 p-8 opacity-0 transition-all duration-300 hover:border-white/12 hover:shadow-[0_10px_40px_rgba(0,0,0,0.28)] ${
                isRtl ? "text-right" : "text-left"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,16,55,0.98) 0%, rgba(10,14,47,0.98) 100%)",
              }}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  isRtl
                    ? "bg-[radial-gradient(circle_at_top_right,rgba(32,230,170,0.08),transparent_35%)]"
                    : "bg-[radial-gradient(circle_at_top_left,rgba(32,230,170,0.08),transparent_35%)]"
                }`}
              />

              <div className="relative z-10 mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#20E6AA]/30 bg-[#20E6AA]/10 text-[#20E6AA]">
                {f.icon}
              </div>

              <h3
                className={`relative z-10 mb-4 whitespace-pre-line font-semibold leading-[1.3] text-white ${
                  isRtl
                    ? "font-vazirmatn tracking-normal text-[1.4rem]"
                    : "font-sans tracking-[-0.03em] text-[1.65rem] leading-[1.08]"
                }`}
              >
                {f.title}
              </h3>

              <p
                className={`relative z-10 text-sm leading-[1.75] text-white/56 ${
                  isRtl ? "font-vazirmatn" : ""
                }`}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="why-btns flex flex-wrap items-center justify-center gap-4 pb-6 opacity-0">
          <Link
            href={`/${currentLang}/contact`}
            className={`rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#11152A] transition-all duration-300 hover:scale-[1.02] hover:bg-[#20E6AA] ${
              isRtl ? "font-vazirmatn" : "tracking-[-0.01em]"
            }`}
          >
            {t.quoteBtn}
          </Link>

          <Link
            href={`/${currentLang}/contact`}
            className={`rounded-full border border-white/16 bg-white/4 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/28 hover:bg-white/8 ${
              isRtl ? "font-vazirmatn" : "tracking-[-0.01em]"
            }`}
          >
            {t.contactBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
