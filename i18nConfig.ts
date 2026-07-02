export const locales = ["en", "fa", "ar"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const localeMeta: Record<
  AppLocale,
  {
    code: AppLocale;
    label: string;
    nativeLabel: string;
    shortLabel: string;
    dir: "ltr" | "rtl";
    fontFamily: "manrope" | "vazirmatn";
  }
> = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    shortLabel: "EN",
    dir: "ltr",
    fontFamily: "manrope",
  },
  fa: {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    shortLabel: "FA",
    dir: "rtl",
    fontFamily: "vazirmatn",
  },
  ar: {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    shortLabel: "AR",
    dir: "rtl",
    fontFamily: "vazirmatn",
  },
};

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function normalizeLocale(value?: string | null): AppLocale {
  if (!value) return defaultLocale;
  return isValidLocale(value) ? value : defaultLocale;
}

export function getLocaleDirection(locale: string): "ltr" | "rtl" {
  return localeMeta[normalizeLocale(locale)].dir;
}

export function getLocaleFontFamily(locale: string): "manrope" | "vazirmatn" {
  return localeMeta[normalizeLocale(locale)].fontFamily;
}
