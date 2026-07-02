// client/app/[lang]/brands/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import pool from "@/lib/db";
import { AppLocale, locales } from "@/i18nConfig";
import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";

async function getBrandPage(slug: string) {
  try {
    const query = `
      SELECT *
      FROM brands
      WHERE slug = $1
      LIMIT 1;
    `;
    const result = await pool.query(query, [slug]);

    if (result.rowCount === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("[BRAND_PAGE_ERROR]", error);
    return null;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const brand = await getBrandPage(params.slug);

  if (!brand) {
    return {
      title: "Brand Not Found",
    };
  }

  const safeLang: AppLocale = locales.includes(params.lang as AppLocale)
    ? (params.lang as AppLocale)
    : "en";

  const title = brand[`meta_title_${safeLang}`] || `${brand.slug} Partner`;
  const description = brand[`meta_desc_${safeLang}`] || "";

  return {
    title: `${title} | Tranzport Global Logistics`,
    description,
  };
}

export default async function BrandProfilePage(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const params = await props.params;

  const safeLang: AppLocale = locales.includes(params.lang as AppLocale)
    ? (params.lang as AppLocale)
    : "en";

  const brand = await getBrandPage(params.slug);

  if (!brand) {
    notFound();
  }

  const isRtl = safeLang === "fa" || safeLang === "ar";
  const title = brand[`meta_title_${safeLang}`] || brand.slug.toUpperCase();
  const content = brand[`content_${safeLang}`] || "";

  const breadcrumbText = {
    en: { home: "Home", partners: "Partners" },
    fa: { home: "خانه", partners: "شرکا" },
    ar: { home: "الرئيسية", partners: "الشركاء" },
  };

  const partnerLabel = {
    en: "Official Partner",
    fa: "شریک رسمی",
    ar: "شريك رسمي",
  };

  const contactLabel = {
    en: "Learn More",
    fa: "اطلاعات بیشتر",
    ar: "معرفة المزيد",
  };

  return (
    <>
      <Header lang={safeLang} />

      <main
        className="min-h-screen bg-linear-to-b from-brand-dark via-brand-dark to-[#0a0f0d] pt-24"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 pb-4 pt-8 md:px-16 lg:px-24">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <a
              href={`/${safeLang}`}
              className="transition-colors hover:text-[#00FF85]"
            >
              {breadcrumbText[safeLang].home}
            </a>
            <span>/</span>
            <a
              href={`/${safeLang}/brands`}
              className="transition-colors hover:text-[#00FF85]"
            >
              {breadcrumbText[safeLang].partners}
            </a>
            <span>/</span>
            <span className="text-white/40">{title}</span>
          </nav>
        </div>

        {/* Hero Section with Logo */}
        <section className="relative overflow-hidden border-b border-white/5 bg-linear-to-br from-white/8 via-white/3 to-transparent py-16 md:py-28">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,133,0.06),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,133,0.04),transparent_60%)]" />

          <div className="container relative mx-auto px-6 md:px-16 lg:px-24">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-16">
              {/* Logo Card */}
              <div className="group relative shrink-0">
                <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-[#00FF85]/20 via-[#00FF85]/5 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white p-10 shadow-2xl shadow-black/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20 group-hover:shadow-[#00FF85]/10 md:h-72 md:w-72 md:p-12">
                  <img
                    src={brand.logo_url}
                    alt={`${title} Logo`}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Brand Info */}
              <div className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF85]/20 bg-[#00FF85]/5 px-4 py-2 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-[#00FF85]" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#00FF85]">
                    {partnerLabel[safeLang]}
                  </span>
                </div>

                <h1 className="mb-6 bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl">
                  {title}
                </h1>

                <p className="mb-8 text-lg leading-relaxed text-white/70 md:text-xl">
                  {safeLang === "fa"
                    ? "یکی از شرکای استراتژیک و معتبر گروه بهاران در زنجیره تامین جهانی"
                    : safeLang === "ar"
                      ? "أحد الشركاء الاستراتيجيين الموثوقين لمجموعة بهاران في سلسلة التوريد العالمية"
                      : "One of Baharan Group's trusted strategic partners in global supply chain"}
                </p>

                <a
                  href={`/${safeLang}/#contact`}
                  className="group/btn inline-flex items-center gap-3 rounded-full border border-[#00FF85]/20 bg-[#00FF85]/10 px-8 py-4 font-semibold text-[#00FF85] backdrop-blur-sm transition-all duration-300 hover:border-[#00FF85]/40 hover:bg-[#00FF85]/20 hover:shadow-lg hover:shadow-[#00FF85]/20"
                >
                  <span>{contactLabel[safeLang]}</span>
                  <svg
                    className={`h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1 ${isRtl ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-16 lg:px-24">
            <div className="mx-auto max-w-5xl">
              {content.trim() ? (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 p-8 shadow-2xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[#00FF85]/5 md:p-16">
                  <div className="absolute -inset-1 -z-10 rounded-3xl bg-linear-to-r from-[#00FF85]/0 via-[#00FF85]/5 to-[#00FF85]/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div
                    className={`prose prose-invert prose-lg max-w-none ${
                      isRtl ? "text-right" : "text-left"
                    } prose-headings:mb-4 prose-headings:mt-8 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white first:prose-headings:mt-0 prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-white/80 prose-a:font-medium prose-a:text-[#00FF85] prose-a:no-underline prose-a:transition-colors hover:prose-a:text-[#00cc6a] hover:prose-a:underline prose-strong:font-semibold prose-strong:text-white prose-ul:my-6 prose-ol:my-6 marker:text-[#00FF85]`}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              ) : (
                <div className="flex min-h-100 flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 p-12 text-center backdrop-blur-md">
                  <div className="rounded-full border border-white/10 bg-white/5 p-8">
                    <svg
                      className="h-16 w-16 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-xl font-semibold text-white/60">
                      {safeLang === "fa"
                        ? "محتوای تکمیلی در راه است"
                        : safeLang === "ar"
                          ? "المحتوى الإضافي قادم قريبًا"
                          : "Additional content coming soon"}
                    </p>
                    <p className="text-white/40">
                      {safeLang === "fa"
                        ? "اطلاعات کامل این شریک به زودی منتشر خواهد شد."
                        : safeLang === "ar"
                          ? "سيتم نشر معلومات كاملة عن هذا الشريك قريبًا."
                          : "Complete partner information will be published soon."}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Accent */}
              <div className="mt-12 flex justify-center">
                <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-[#00FF85]/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterCTA lang={safeLang} />
    </>
  );
}
