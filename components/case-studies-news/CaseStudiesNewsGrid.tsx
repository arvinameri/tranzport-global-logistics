"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppLocale, locales } from "@/i18nConfig";

type InternalCategory = "Case Studies" | "News";

export interface CaseItem {
  slug: string;
  title: string;
  date: string;
  category: InternalCategory;
  image: string;
  aspect: string;
}

type CaseStudiesNewsGridProps = {
  lang: string;
  initialItems: CaseItem[];
};

type FilterKey = "all" | "case-studies" | "news";

function getGridContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      isRtl: false,
      filters: {
        all: "View all",
        "case-studies": "Case Studies",
        news: "News",
      },
      placeholder: "Search...",
      noResults: "No results found.",
      imageAltPrefix: "Cover image for",
      categoryLabels: {
        "Case Studies": "Case Studies",
        News: "News",
      },
    },
    fa: {
      isRtl: true,
      filters: {
        all: "مشاهده همه",
        "case-studies": "مطالعات موردی",
        news: "اخبار",
      },
      placeholder: "جستجو...",
      noResults: "موردی یافت نشد.",
      imageAltPrefix: "تصویر شاخص",
      categoryLabels: {
        "Case Studies": "مطالعات موردی",
        News: "اخبار",
      },
    },
    ar: {
      isRtl: true,
      filters: {
        all: "عرض الكل",
        "case-studies": "دراسات الحالة",
        news: "الأخبار",
      },
      placeholder: "ابحث...",
      noResults: "لم يتم العثور على نتائج.",
      imageAltPrefix: "الصورة الرئيسية لـ",
      categoryLabels: {
        "Case Studies": "دراسات الحالة",
        News: "الأخبار",
      },
    },
  } satisfies Record<
    AppLocale,
    {
      isRtl: boolean;
      filters: Record<FilterKey, string>;
      placeholder: string;
      noResults: string;
      imageAltPrefix: string;
      categoryLabels: Record<InternalCategory, string>;
    }
  >;

  return content[safeLang];
}

const FILTER_KEYS = ["all", "case-studies", "news"] as const;
type Filter = (typeof FILTER_KEYS)[number];

export default function CaseStudiesNewsGrid({
  lang,
  initialItems,
}: CaseStudiesNewsGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const content = useMemo(() => getGridContent(lang), [lang]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();

    return initialItems.filter((it) => {
      const byFilter =
        filter === "all" ||
        (filter === "case-studies" && it.category === "Case Studies") ||
        (filter === "news" && it.category === "News");

      const byQuery = it.title.toLowerCase().includes(q);

      return byFilter && byQuery;
    });
  }, [filter, query, initialItems]);

  const basePath = (it: CaseItem) =>
    it.category === "News"
      ? `/${lang}/case-studies-news/news/${it.slug}`
      : `/${lang}/case-studies-news/case-studies/${it.slug}`;

  return (
    <section className="mx-auto max-w-350 px-6 pb-24 md:px-12 lg:px-20">
      <div
        dir={content.isRtl ? "rtl" : "ltr"}
        className={`mb-10 flex flex-col gap-5 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between ${
          content.isRtl ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-center gap-6 ${
            content.isRtl ? "justify-start" : ""
          }`}
        >
          {FILTER_KEYS.map((filterKey) => (
            <button
              key={filterKey}
              type="button"
              onClick={() => setFilter(filterKey)}
              className={`text-base transition-colors ${
                filter === filterKey
                  ? "font-semibold text-black"
                  : "text-black/50 hover:text-black"
              }`}
            >
              {content.filters[filterKey]}
            </button>
          ))}
        </div>

        <div
          className="relative w-full sm:w-72"
          dir={content.isRtl ? "rtl" : "ltr"}
        >
          <svg
            className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-black/50 ${
              content.isRtl ? "right-3 left-auto" : "left-3 right-auto"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.placeholder}
            dir={content.isRtl ? "rtl" : "ltr"}
            className={`w-full rounded-full border border-black/15 bg-white/50 py-2 text-sm text-black outline-none placeholder:text-black/40 focus:border-black/40 ${
              content.isRtl ? "pr-9 pl-4 text-right" : "pl-9 pr-4 text-left"
            }`}
          />
        </div>
      </div>

      {items.length > 0 ? (
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 lg:gap-8">
          {items.map((it) => (
            <Link
              key={`${it.category}-${it.slug}`}
              href={basePath(it)}
              className="group mb-8 block break-inside-avoid lg:mb-10"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className={`relative w-full ${it.aspect}`}>
                  <Image
                    src={it.image}
                    alt={`${content.imageAltPrefix} ${it.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {content.categoryLabels[it.category]}
                </span>
              </div>

              <div
                dir={content.isRtl ? "rtl" : "ltr"}
                className={content.isRtl ? "text-right" : "text-left"}
              >
                <h3 className="mt-4 text-xl font-medium leading-snug text-gray-900 md:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{it.date}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p
          dir={content.isRtl ? "rtl" : "ltr"}
          className="py-20 text-center text-gray-500"
        >
          {content.noResults}
        </p>
      )}
    </section>
  );
}
