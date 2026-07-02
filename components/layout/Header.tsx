"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import FullScreenMenu from "./FullScreenMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { normalizeLocale } from "@/i18nConfig";

export default function Header({ lang }: { lang?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || "";
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

  const lightBackgroundPages = [
    "/domestic-trucking",
    "/technology",
    "/about-corpac-group",
    "/case-studies-news",
  ];

  const isDarkTheme = lightBackgroundPages.some((page) => {
    // اصلاح بسیار مهم برای کیس‌استادی:
    // فقط در صورتی هدر روشن شود که دقیقاً در خود صفحه لیست کیس استادی باشیم، نه داخل جزئیات آن
    if (page === "/case-studies-news") {
      return pathname.endsWith("/case-studies-news");
    }
    return pathname.includes(page);
  });

  return (
    <>
      <header
        dir="ltr"
        className="absolute left-0 top-0 z-50 w-full bg-transparent py-5 md:py-6"
      >
        <div className="container mx-auto flex items-center justify-between gap-3 px-6">
          <Link
            href={`/${currentLang}`}
            className="relative flex h-20 shrink-0 items-center overflow-visible md:h-28"
            aria-label="Go to homepage"
          >
            <Image
              src={
                isDarkTheme
                  ? "/assets/logos/logo-dark.png"
                  : "/assets/logos/brand-logo.png"
              }
              alt="Brand Logo"
              width={500}
              height={150}
              className="h-full w-auto origin-left scale-200 object-contain md:scale-[1.8]"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-2.5">
            <div className="origin-right scale-[0.9] md:scale-[0.92]">
              <LanguageSwitcher
                currentLang={currentLang}
                variant="header"
                isDarkText={isDarkTheme}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-site-menu"
              className={`group flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs backdrop-blur-md transition-all duration-300 hover:border-[#00FF85] hover:bg-[#00FF85] hover:text-[#0a0f1c] md:min-h-11 md:gap-2 md:px-4 md:py-2 ${
                isDarkTheme
                  ? "border-black/20 bg-white/70 text-black"
                  : "border-white/20 bg-white/10 text-white"
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs md:tracking-widest">
                Menu
              </span>

              <Menu className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 md:h-4.5 md:w-4.5" />
            </button>
          </div>
        </div>
      </header>

      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lang={currentLang}
      />
    </>
  );
}
