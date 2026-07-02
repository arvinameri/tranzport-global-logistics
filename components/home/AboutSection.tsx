"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

function extractSlugFromUrl(url: string) {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  return fileName.split(".")[0];
}

const FALLBACK_LOGOS = [
  "/assets/logos/pg.jpg",
  "/assets/logos/victorinox.jpg",
  "/assets/logos/brabantia.jpg",
  "/assets/logos/gastroback.jpg",
  "/assets/logos/durex.jpg",
  "/assets/logos/veet.jpg",
  "/assets/logos/always.jpg",
  "/assets/logos/tampax.jpg",
  "/assets/logos/philips.jpg",
  "/assets/logos/pantene.jpg",
  "/assets/logos/oralb.jpg",
  "/assets/logos/oldspice.jpg",
  "/assets/logos/olay.jpg",
  "/assets/logos/miele.jpg",
  "/assets/logos/galanz.jpg",
  "/assets/logos/fissler.jpg",
  "/assets/logos/kuhn.jpg",
  "/assets/logos/ola.jpg",
  "/assets/logos/vornado.jpg",
  "/assets/logos/gillette.jpg",
  "/assets/logos/fixodent.jpg",
  "/assets/logos/braun.jpg",
  "/assets/logos/greenworks.jpg",
];

interface Brand {
  id: number;
  slug: string;
  logo_url: string;
}

interface MarqueeItem {
  key: string;
  slug: string;
  href: string;
  title: string;
  src: string;
  alt: string;
}

function getContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      dir: "ltr" as const,
      aboutTitle: "About Us",
      description:
        "The Baharan Group began its activities in 2010 with a focus on domestic trade and, by leveraging innovative management, specialized expertise, and an extensive network of local business connections, has established a path of sustainable growth. By expanding its scope of operations into domestic trade within distribution and sales industries, foreign trade, and logistics, the Group today stands as an experienced holding with an effective presence in both domestic and international markets.",
      cta: "More About Us",
      highlightText:
        "Baharan Group is committed to facilitating the flow of trade, creating sustainable value, and delivering efficient solutions across the supply chain.",
    },
    fa: {
      dir: "rtl" as const,
      aboutTitle: "درباره ما",
      description:
        "گروه بهاران فعالیت خود را در سال ۱۳۸۹ با تمرکز بر تجارت داخلی آغاز کرد و با بهره‌گیری از مدیریت نوآورانه، تخصص ویژه و شبکه‌ای گسترده از ارتباطات تجاری محلی، مسیر رشد پایدار خود را بنا نهاد. با گسترش دامنه فعالیت‌ها به تجارت داخلی در صنایع توزیع و فروش، بازرگانی خارجی و لجستیک، این گروه امروز به عنوان هلدینگی مجرب با حضوری موثر در بازارهای داخلی و بین‌المللی شناخته می‌شود.",
      cta: "بیشتر درباره ما",
      highlightText:
        "گروه بهاران متعهد به تسهیل جریان تجارت، خلق ارزش پایدار و ارائه راهکارهای کارآمد در سراسر زنجیره تأمین است.",
    },
    ar: {
      dir: "rtl" as const,
      aboutTitle: "معلومات عنا",
      description:
        "بدأت مجموعة بهاران نشاطها في عام 2010 بالتركيز على التجارة الداخلية، ومن خلال الاستفادة من الإدارة المبتكرة والخبرة المتخصصة وشبكة واسعة من العلاقات التجارية المحلية، أسست مساراً للنمو المستدام. ومن خلال توسيع نطاق عملياتها لتشمل التجارة الداخلية في صناعات التوزيع والمبيعات، والتجارة الخارجية، والخدمات اللوجستية، تقف المجموعة اليوم كشركة قابضة ذات خبرة وتواجد فعال في الأسواق المحلية والدولية.",
      cta: "المزيد عنا",
      highlightText:
        "تلتزم مجموعة بهاران بتسهيل حركة التجارة، وخلق قيمة مستدامة، وتقديم حلول فعالة عبر سلسلة التوريد.",
    },
  };

  return content[safeLang];
}

function buildFallbackItems(lang: string): MarqueeItem[] {
  return FALLBACK_LOGOS.map((src, index) => {
    const slug = extractSlugFromUrl(src);

    return {
      key: `fallback-${index}-${slug}`,
      slug,
      href: `/${lang}/brands/${slug}`,
      title: `View ${slug} profile`,
      src,
      alt: `${slug} Partner Logo`,
    };
  });
}

function buildDynamicItems(brands: Brand[], lang: string): MarqueeItem[] {
  return brands
    .filter((brand) => Boolean(brand?.slug) && Boolean(brand?.logo_url))
    .map((brand) => ({
      key: `dynamic-${brand.id}-${brand.slug}`,
      slug: brand.slug,
      href: `/${lang}/brands/${brand.slug}`,
      title: `View ${brand.slug} profile`,
      src: brand.logo_url,
      alt: `${brand.slug} Partner Logo`,
    }));
}

function mergeBrandItems(
  fallbackItems: MarqueeItem[],
  dynamicItems: MarqueeItem[],
): MarqueeItem[] {
  const merged = [...dynamicItems, ...fallbackItems];
  const seen = new Set<string>();

  return merged.filter((item) => {
    const normalizedSlug = item.slug.trim().toLowerCase();
    if (seen.has(normalizedSlug)) return false;
    seen.add(normalizedSlug);
    return true;
  });
}

function BrandLogo({
  item,
  fallbackSrc,
}: {
  item: MarqueeItem;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(item.src);

  useEffect(() => {
    setImgSrc(item.src);
  }, [item.src]);

  return (
    <img
      src={imgSrc}
      alt={item.alt}
      className="h-full w-full object-contain opacity-100 brightness-150 contrast-125 mix-blend-screen transition-all duration-500 hover:scale-110 hover:brightness-200"
      onError={() => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

export default function AboutSection({ lang }: { lang: string }) {
  const content = useMemo(() => getContent(lang), [lang]);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const isRtl = content.dir === "rtl";

  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/admin/brands", { cache: "no-store" });
        const data = await res.json();

        if (data?.ok && Array.isArray(data?.data)) {
          setBrands(data.data);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Failed to load brands:", error);
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textContainerRef.current?.querySelectorAll(".word");

      if (words && words.length > 0) {
        const turnAllWhite = () => {
          gsap.to(words, { color: "#FFFFFF", duration: 0.2, overwrite: true });
        };

        const stopTimer = gsap.delayedCall(0.1, turnAllWhite).pause();

        ScrollTrigger.create({
          trigger: textContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            stopTimer.restart(true);
            gsap.to(words, {
              color: "#00FF85",
              duration: 0.1,
              stagger: {
                amount: 0.3,
                from: self.direction === 1 ? "start" : "end",
              },
              overwrite: "auto",
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang, content.highlightText]);

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`word inline-block transition-colors will-change-[color] ${
          isRtl ? "ml-2 md:ml-3 lg:ml-4" : "mr-2 md:mr-3 lg:mr-4"
        }`}
      >
        {word}
      </span>
    ));
  };

  const marqueeItems = useMemo(() => {
    const fallbackItems = buildFallbackItems(lang);
    const dynamicItems = buildDynamicItems(brands, lang);
    return mergeBrandItems(fallbackItems, dynamicItems);
  }, [brands, lang]);

  const repeatedMarqueeItems = useMemo(() => {
    if (marqueeItems.length === 0) return [];
    return [...marqueeItems, ...marqueeItems];
  }, [marqueeItems]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full overflow-hidden bg-brand-dark py-24 md:py-32"
      dir={content.dir}
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="flex h-full flex-col justify-between pt-2 lg:col-span-5">
            <div>
              <h3 className="mb-8 text-lg font-bold tracking-wide text-white/90">
                {content.aboutTitle}
              </h3>
            </div>

            <div className="flex flex-col gap-10">
              <p className="max-w-md text-sm font-medium leading-relaxed text-brand-gray md:text-base">
                {content.description}
              </p>

              <Link
                href={`/${lang}/about-tranzport`}
                className="group w-fit rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-brand-dark"
              >
                {content.cta}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2
              ref={textContainerRef}
              className="cursor-default font-manrope text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.5rem]"
            >
              {splitText(content.highlightText)}
            </h2>
          </div>
        </div>

        {!isLoading && marqueeItems.length > 0 && (
          <div className="mt-40 w-full border-t border-white/10 pt-16">
            <div
              className="relative w-full overflow-hidden"
              dir="ltr"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
                {repeatedMarqueeItems.map((item, index) => {
                  const fallbackSrc =
                    FALLBACK_LOGOS.find(
                      (logo) =>
                        extractSlugFromUrl(logo).toLowerCase() ===
                        item.slug.toLowerCase(),
                    ) || FALLBACK_LOGOS[0];

                  return (
                    <Link
                      key={`${item.key}-${index}`}
                      href={item.href}
                      className="relative flex h-28 w-40 shrink-0 items-center justify-center px-2"
                      title={item.title}
                    >
                      <BrandLogo item={item} fallbackSrc={fallbackSrc} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
