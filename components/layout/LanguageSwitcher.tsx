"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AppLocale, localeMeta, locales, normalizeLocale } from "@/i18nConfig";

interface LanguageSwitcherProps {
  currentLang?: string;
  variant?: "header" | "menu";
  onNavigate?: () => void;
  isDarkText?: boolean;
}

function replaceLocaleInPathname(pathname: string, nextLocale: AppLocale) {
  if (!pathname || pathname === "/") {
    return `/${nextLocale}`;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (locales.includes(segments[0] as AppLocale)) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export default function LanguageSwitcher({
  currentLang,
  variant = "header",
  onNavigate,
  isDarkText = false,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const safeCurrentLang = useMemo<AppLocale>(() => {
    const routeLang =
      typeof params?.lang === "string"
        ? params.lang
        : Array.isArray(params?.lang)
          ? params.lang[0]
          : undefined;

    return normalizeLocale(routeLang || currentLang);
  }, [params, currentLang]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsPending(false);
  }, [pathname]);

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === safeCurrentLang || isPending) {
      setIsOpen(false);
      return;
    }

    setIsPending(true);

    const nextPath = replaceLocaleInPathname(pathname || "/", nextLocale);

    setIsOpen(false);
    onNavigate?.();
    router.push(nextPath);
  };

  const currentLocaleMeta = localeMeta[safeCurrentLang];

  const headerButtonClass = isDarkText
    ? "group inline-flex min-h-11 items-center gap-3 rounded-full border border-black/20 bg-white/70 px-3.5 py-2 text-sm font-medium text-black backdrop-blur-md transition-all duration-300 hover:border-[#00FF85] hover:bg-white hover:text-black"
    : "group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#00FF85] hover:bg-white/15";

  const menuButtonClass =
    "group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-[#00FF85]/60 hover:bg-white/12 hover:text-white";

  const baseButtonClass =
    variant === "menu" ? menuButtonClass : headerButtonClass;

  const panelClass =
    variant === "menu"
      ? "absolute top-[calc(100%+12px)] right-0 z-[120] min-w-[240px] overflow-hidden rounded-3xl border border-white/15 bg-[#0f1728]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl"
      : "absolute top-[calc(100%+12px)] right-0 z-[120] min-w-[220px] overflow-hidden rounded-3xl border border-white/15 bg-[#08111f]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl";

  const iconWrapperClass =
    variant === "menu"
      ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition-all duration-300 group-hover:border-[#00FF85]/50 group-hover:text-[#00FF85]"
      : isDarkText
        ? "flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/80 transition-all duration-300 group-hover:border-[#00FF85]/50 group-hover:text-[#00FF85]"
        : "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition-all duration-300 group-hover:border-[#00FF85]/50 group-hover:text-[#00FF85]";

  const labelTopClass =
    variant === "menu"
      ? "text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45"
      : isDarkText
        ? "text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45"
        : "text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45";

  const currentLangClass =
    variant === "menu"
      ? "mt-1 flex items-center gap-2 text-sm font-semibold text-white"
      : isDarkText
        ? "mt-1 flex items-center gap-2 text-sm font-semibold text-black"
        : "mt-1 flex items-center gap-2 text-sm font-semibold text-white";

  const slashClass =
    variant === "menu"
      ? "text-white/45"
      : isDarkText
        ? "text-black/45"
        : "text-white/45";

  const nativeClass =
    variant === "menu"
      ? "text-white/80"
      : isDarkText
        ? "text-black/75"
        : "text-white/80";

  const chevronClass =
    variant === "menu"
      ? "text-white/65"
      : isDarkText
        ? "text-black/65"
        : "text-white/65";

  return (
    <div ref={wrapperRef} className="relative" dir="ltr">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change site language"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={baseButtonClass}
      >
        <span className={iconWrapperClass}>
          <Globe2 className="h-4 w-4" />
        </span>

        <span className="flex flex-col items-start leading-none text-left">
          <span className={labelTopClass}>Language</span>
          <span className={currentLangClass}>
            <span>{currentLocaleMeta.shortLabel}</span>
            <span className={slashClass}>/</span>
            <span className={nativeClass}>{currentLocaleMeta.nativeLabel}</span>
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${chevronClass} ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`${panelClass} transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="mb-2 px-3 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
            Select language
          </p>
        </div>

        <div className="space-y-1">
          {locales.map((locale) => {
            const item = localeMeta[locale];
            const active = locale === safeCurrentLang;

            return (
              <button
                key={locale}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                dir="ltr"
                onClick={() => handleLocaleChange(locale)}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition-all duration-200 ${
                  active
                    ? "bg-[#00FF85]/12 text-white ring-1 ring-[#00FF85]/35"
                    : "text-white/80 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold uppercase tracking-wider ${
                      active
                        ? "border-[#00FF85]/40 bg-[#00FF85]/12 text-[#00FF85]"
                        : "border-white/10 bg-white/5 text-white/70"
                    }`}
                  >
                    {item.shortLabel}
                  </span>

                  <span className="flex min-w-0 flex-col items-start text-left">
                    <span className="truncate text-sm font-semibold">
                      {item.nativeLabel}
                    </span>
                    <span className="truncate text-xs text-white/45">
                      {item.label}
                    </span>
                  </span>
                </span>

                <span className="ml-3 flex h-5 w-5 items-center justify-center">
                  {active ? <Check className="h-4 w-4 text-[#00FF85]" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
