import type { Metadata } from "next";
import { Manrope, Vazirmatn } from "next/font/google";
import "../globals.css";
import {
  getLocaleDirection,
  getLocaleFontFamily,
  normalizeLocale,
} from "@/i18nConfig";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tranzport | Global Logistics",
  description: "Global Freight Forwarding & Customs Brokerage",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: rawLang } = await params;
  const lang = normalizeLocale(rawLang);

  const direction = getLocaleDirection(lang);
  const activeFontFamily = getLocaleFontFamily(lang);
  const isVazirmatnLocale = activeFontFamily === "vazirmatn";

  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      <body
        className={[
          manrope.variable,
          vazirmatn.variable,
          "bg-brand-dark",
          "text-white",
          "antialiased",
          "selection:bg-[#00FF7F]",
          "selection:text-black",
          isVazirmatnLocale ? "font-vazirmatn" : "font-manrope",
        ].join(" ")}
      >
        <main className="relative flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
