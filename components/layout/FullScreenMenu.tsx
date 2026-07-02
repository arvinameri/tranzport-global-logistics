"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  X,
  User,
  Linkedin,
  Facebook,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { AppLocale, locales, normalizeLocale } from "@/i18nConfig";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
}

type NavItem = {
  label: string;
  href: string;
};

type PublicPageItem = {
  slug: string;
  menu_title_en?: string;
  menu_title_fa?: string;
  menu_title_ar?: string;
  meta_title_en?: string;
  meta_title_fa?: string;
  meta_title_ar?: string;
  created_at?: string;
};

function getMenuContent(lang: string) {
  const currentLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      companyTitle: "Company",
      servicesTitle: "Services",
      otherPagesTitle: "Other Pages",
      allPages: "View all pages",
      ctaQuote: "Request a Quote",
      login: "Login",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
      brandTitle: "BAHARAN GROUP",
      companyLinks: [
        { label: "About Baharan Group", href: "/about-tranzport" },
        { label: "About Baharan Holding", href: "/about-corpac-group" },
        { label: "Technology", href: "/technology" },
        { label: "Case Studies and News", href: "/case-studies-news" },
        { label: "Contact", href: "/contact" },
      ] satisfies NavItem[],
      serviceLinks: [
        { label: "Ocean Freight", href: "/ocean-freight" },
        { label: "Air Freight", href: "/air-freight" },
        { label: "Customs Brokerage", href: "/customs-brokerage" },
        { label: "Domestic Trucking", href: "/domestic-trucking" },
        { label: "Project Cargo", href: "/project-cargo" },
        {
          label: "Warehousing & Distribution",
          href: "/warehousing-distribution",
        },
      ] satisfies NavItem[],
    },
    fa: {
      companyTitle: "شرکت",
      servicesTitle: "خدمات",
      otherPagesTitle: "سایر صفحات",
      allPages: "مشاهده همه صفحات",
      ctaQuote: "درخواست استعلام",
      login: "ورود",
      terms: "قوانین",
      privacy: "حریم خصوصی",
      cookies: "کوکی‌ها",
      brandTitle: "گروه بهاران",
      companyLinks: [
        { label: "درباره بهاران گروپ", href: "/about-tranzport" },
        { label: "درباره بهاران هولدینگ", href: "/about-corpac-group" },
        { label: "فناوری", href: "/technology" },
        { label: "مطالعات موردی و اخبار", href: "/case-studies-news" },
        { label: "تماس با ما", href: "/contact" },
      ] satisfies NavItem[],
      serviceLinks: [
        { label: "حمل‌ونقل دریایی", href: "/ocean-freight" },
        { label: "حمل‌ونقل هوایی", href: "/air-freight" },
        { label: "ترخیص و امور گمرکی", href: "/customs-brokerage" },
        { label: "حمل داخلی", href: "/domestic-trucking" },
        { label: "پروژه کارگو", href: "/project-cargo" },
        { label: "انبارداری و توزیع", href: "/warehousing-distribution" },
      ] satisfies NavItem[],
    },
    ar: {
      companyTitle: "الشركة",
      servicesTitle: "الخدمات",
      otherPagesTitle: "صفحات أخرى",
      allPages: "عرض كل الصفحات",
      ctaQuote: "اطلب عرض سعر",
      login: "تسجيل الدخول",
      terms: "الشروط",
      privacy: "الخصوصية",
      cookies: "ملفات تعريف الارتباط",
      brandTitle: "مجموعة بهاران",
      companyLinks: [
        { label: "حول بهاران جروب", href: "/about-tranzport" },
        { label: "حول بهاران هولدينغ", href: "/about-corpac-group" },
        { label: "التكنولوجيا", href: "/technology" },
        { label: "دراسات الحالة والأخبار", href: "/case-studies-news" },
        { label: "اتصل بنا", href: "/contact" },
      ] satisfies NavItem[],
      serviceLinks: [
        { label: "الشحن البحري", href: "/ocean-freight" },
        { label: "الشحن الجوي", href: "/air-freight" },
        { label: "التخليص الجمركي", href: "/customs-brokerage" },
        { label: "النقل الداخلي", href: "/domestic-trucking" },
        { label: "شحن المشاريع", href: "/project-cargo" },
        { label: "التخزين والتوزيع", href: "/warehousing-distribution" },
      ] satisfies NavItem[],
    },
  };

  return content[currentLang];
}

export default function FullScreenMenu({
  isOpen,
  onClose,
  lang,
}: FullScreenMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
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

  const content = useMemo(() => getMenuContent(currentLang), [currentLang]);

  const [dynamicLinks, setDynamicLinks] = useState<NavItem[]>([]);
  const [allDynamicLinks, setAllDynamicLinks] = useState<NavItem[]>([]);

  const MAX_DYNAMIC_LINKS_IN_MENU = 6;

  useEffect(() => {
    if (!isOpen) return;

    fetch("/api/public-pages", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.ok && Array.isArray(data.data)) {
          const links: NavItem[] = (data.data as PublicPageItem[]).map(
            (page) => {
              const localizedMenuTitle =
                page[`menu_title_${currentLang}` as keyof PublicPageItem];
              const localizedMetaTitle =
                page[`meta_title_${currentLang}` as keyof PublicPageItem];

              const label =
                (typeof localizedMenuTitle === "string" &&
                  localizedMenuTitle.trim()) ||
                (typeof localizedMetaTitle === "string" &&
                  localizedMetaTitle.trim()) ||
                page.slug;

              return {
                label,
                href: `/${page.slug}`,
              };
            },
          );

          setAllDynamicLinks(links);
          setDynamicLinks(links.slice(0, MAX_DYNAMIC_LINKS_IN_MENU));
        } else {
          setAllDynamicLinks([]);
          setDynamicLinks([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load menu pages", err);
        setAllDynamicLinks([]);
        setDynamicLinks([]);
      });
  }, [isOpen, currentLang]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const hasMoreDynamicPages =
    allDynamicLinks.length > MAX_DYNAMIC_LINKS_IN_MENU;
  const morePagesHref = `/${currentLang}/pages`;

  return (
    <div
      id="fullscreen-site-menu"
      className={`fixed inset-0 z-100 transition-opacity duration-500 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      style={{ backgroundColor: "rgba(11, 18, 33, 0.97)" }}
      aria-hidden={!isOpen}
      dir="ltr"
    >
      <div
        ref={menuRef}
        className={`relative flex h-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 md:px-12 md:py-7">
          <Link
            href={`/${currentLang}`}
            onClick={onClose}
            className="text-2xl font-bold italic tracking-tighter text-white"
          >
            {content.brandTitle}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              currentLang={currentLang}
              variant="menu"
              onNavigate={onClose}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-white/50 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-8 pb-6 md:flex-row md:px-12 md:pb-0">
          <div className="flex flex-col justify-center md:w-[55%] md:border-r md:border-white/10 md:pr-16 lg:pr-24">
            <span
              className={`mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/40 transition-all duration-700 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
            >
              {content.companyTitle}
            </span>

            <nav aria-label="Company navigation">
              <ul className="space-y-2">
                {content.companyLinks.map((link, i) => (
                  <li
                    key={link.href}
                    className={`transition-all duration-700 ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${200 + i * 60}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={`/${currentLang}${link.href}`}
                      onClick={onClose}
                      className="group flex items-center gap-2 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white md:text-lg"
                    >
                      <span className="h-px w-0 bg-[#00FF85] transition-all duration-300 group-hover:w-4" />
                      <span className="line-clamp-1">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-10 md:mt-0 md:w-[45%] md:pl-14 lg:pl-20">
            <div>
              <span
                className={`mb-5 block text-xs font-medium uppercase tracking-[0.2em] text-white/40 transition-all duration-700 ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
              >
                {content.servicesTitle}
              </span>

              <nav aria-label="Services navigation">
                <ul className="space-y-2">
                  {content.serviceLinks.map((link, i) => (
                    <li
                      key={link.href}
                      className={`transition-all duration-700 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOpen ? `${360 + i * 60}ms` : "0ms",
                      }}
                    >
                      <Link
                        href={`/${currentLang}${link.href}`}
                        onClick={onClose}
                        className="group flex items-center gap-2 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white md:text-lg"
                      >
                        <span className="h-px w-0 bg-[#00FF85] transition-all duration-300 group-hover:w-4" />
                        <span className="line-clamp-1">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {dynamicLinks.length > 0 && (
              <div>
                <span
                  className={`mb-5 block text-xs font-medium uppercase tracking-[0.2em] text-[#00FF85]/70 transition-all duration-700 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isOpen ? "450ms" : "0ms" }}
                >
                  {content.otherPagesTitle}
                </span>

                <nav aria-label="Other pages">
                  <ul className="space-y-2">
                    {dynamicLinks.map((link, i) => (
                      <li
                        key={link.href}
                        className={`transition-all duration-700 ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isOpen ? `${500 + i * 60}ms` : "0ms",
                        }}
                      >
                        <Link
                          href={`/${currentLang}${link.href}`}
                          onClick={onClose}
                          className="group flex items-center gap-2 text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00FF85] md:text-lg"
                        >
                          <span className="h-px w-0 bg-[#00FF85] transition-all duration-300 group-hover:w-4" />
                          <span className="line-clamp-1">{link.label}</span>
                        </Link>
                      </li>
                    ))}

                    {hasMoreDynamicPages && (
                      <li
                        className={`pt-2 transition-all duration-700 ${
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isOpen
                            ? `${500 + dynamicLinks.length * 60}ms`
                            : "0ms",
                        }}
                      >
                        <Link
                          href={morePagesHref}
                          onClick={onClose}
                          className="group inline-flex items-center gap-2 rounded-full border border-[#00FF85]/30 bg-[#00FF85]/10 px-4 py-2 text-sm font-semibold text-[#00FF85] transition-all duration-200 hover:border-[#00FF85] hover:bg-[#00FF85]/15"
                        >
                          {content.allPages}
                          {currentLang === "fa" ? (
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                          ) : (
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          )}
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}

            <div
              className={`transition-all duration-700 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? "700ms" : "0ms" }}
            >
              <div className="mt-4 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Link
                  href={`/${currentLang}/contact`}
                  onClick={onClose}
                  className="flex min-h-12 items-center justify-center rounded-full border-2 border-[#00FF85] bg-[#00FF85] px-6 py-3 text-sm font-semibold text-[#0a0f1c] transition-all duration-200 hover:bg-transparent hover:text-[#00FF85]"
                >
                  {content.ctaQuote}
                </Link>

                <button
                  type="button"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15"
                >
                  <User className="h-4 w-4" />
                  {content.login}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-4 border-t border-white/10 px-8 py-4 transition-all duration-700 md:flex-row md:items-center md:justify-between md:px-12 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: isOpen ? "800ms" : "0ms" }}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/30">
            <Link
              href={`/${currentLang}/terms`}
              onClick={onClose}
              className="transition-colors hover:text-white/60"
            >
              {content.terms}
            </Link>

            <span className="mx-1">|</span>

            <Link
              href={`/${currentLang}/privacy`}
              onClick={onClose}
              className="transition-colors hover:text-white/60"
            >
              {content.privacy}
            </Link>

            <span className="mx-1">|</span>

            <Link
              href={`/${currentLang}/cookies`}
              onClick={onClose}
              className="transition-colors hover:text-white/60"
            >
              {content.cookies}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/50 transition-all hover:border-white/50 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/50 transition-all hover:border-white/50 hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
