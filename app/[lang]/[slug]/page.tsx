// client/app/[lang]/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import pool from "@/lib/db";
import { AppLocale, locales } from "@/i18nConfig";
import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";

async function getDynamicPage(slug: string) {
  try {
    const query = `
      SELECT *
      FROM dynamic_pages
      WHERE slug = $1 AND is_published = true
      LIMIT 1;
    `;
    const result = await pool.query(query, [slug]);

    if (result.rowCount === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("[DYNAMIC_PAGE_ERROR]", error);
    return null;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getDynamicPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const safeLang: AppLocale = locales.includes(params.lang as AppLocale)
    ? (params.lang as AppLocale)
    : "en";

  const title = page[`meta_title_${safeLang}`] || page.slug;
  const description = page[`meta_desc_${safeLang}`] || "";

  return {
    title: `${title} | Tranzport Global Logistics`,
    description,
  };
}

export default async function DynamicPageRenderer(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const params = await props.params;

  const safeLang: AppLocale = locales.includes(params.lang as AppLocale)
    ? (params.lang as AppLocale)
    : "en";

  const page = await getDynamicPage(params.slug);

  if (!page) {
    notFound();
  }

  const isRtl = safeLang === "fa" || safeLang === "ar";
  const title = page[`meta_title_${safeLang}`] || page.slug;
  const content = page[`content_${safeLang}`] || "";

  const breadcrumbText = {
    en: "Home",
    fa: "خانه",
    ar: "الرئيسية",
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
              {breadcrumbText[safeLang]}
            </a>
            <span>/</span>
            <span className="text-white/40">{title}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 bg-linear-to-br from-white/8 via-white/3 to-transparent py-20 md:py-32">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,133,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,133,0.05),transparent_50%)]" />

          <div className="container relative mx-auto px-6 md:px-16 lg:px-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF85]/20 bg-[#00FF85]/5 px-4 py-2 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#00FF85]" />
                <span className="text-sm font-medium text-[#00FF85]">
                  {safeLang === "fa"
                    ? "اطلاعات مهم"
                    : safeLang === "ar"
                      ? "معلومات مهمة"
                      : "Important Information"}
                </span>
              </div>
              <h1 className="mb-6 bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-transparent via-[#00FF85] to-transparent" />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-16 lg:px-24">
            <div className="mx-auto max-w-4xl">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/2 p-8 shadow-2xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[#00FF85]/5 md:p-16">
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 -z-10 rounded-3xl bg-linear-to-r from-[#00FF85]/0 via-[#00FF85]/5 to-[#00FF85]/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                {content.trim() ? (
                  <div
                    className={`prose prose-invert prose-lg max-w-none ${
                      isRtl ? "text-right" : "text-left"
                    } prose-headings:mb-4 prose-headings:mt-8 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white first:prose-headings:mt-0 prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-white/80 prose-a:font-medium prose-a:text-[#00FF85] prose-a:no-underline prose-a:transition-colors hover:prose-a:text-[#00cc6a] hover:prose-a:underline prose-strong:font-semibold prose-strong:text-white prose-ul:my-6 prose-ol:my-6 marker:text-[#00FF85]`}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div className="flex min-h-75 flex-col items-center justify-center gap-4 py-20 text-center">
                    <div className="rounded-full border border-white/10 bg-white/5 p-6">
                      <svg
                        className="h-12 w-12 text-white/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg text-white/40">
                      {safeLang === "fa"
                        ? "محتوایی برای این زبان ثبت نشده است."
                        : safeLang === "ar"
                          ? "لا يوجد محتوى متاح لهذه اللغة."
                          : "No content available for this language."}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Accent Line */}
              <div className="mt-8 flex justify-center">
                <div className="h-1 w-16 rounded-full bg-linear-to-r from-transparent via-[#00FF85]/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterCTA lang={safeLang} />
    </>
  );
}
