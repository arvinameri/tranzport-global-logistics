import pool from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug, lang } = await params;

  const slugColumn =
    lang === "fa" ? "slug_fa" : lang === "ar" ? "slug_ar" : "slug_en";
  const titleColumn =
    lang === "fa" ? "title_fa" : lang === "ar" ? "title_ar" : "title_en";
  const contentColumn =
    lang === "fa" ? "content_fa" : lang === "ar" ? "content_ar" : "content_en";

  const query = `
    SELECT
      id,
      category,
      image_url,
      aspect_ratio,
      published_date,
      ${titleColumn} AS title,
      ${contentColumn} AS content
    FROM articles
    WHERE ${slugColumn} = $1 AND category = 'News'
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [slug]);

  if (rows.length === 0) {
    return notFound();
  }

  const article = rows[0];
  const isRtl = lang === "fa" || lang === "ar";
  const fontClass = isRtl ? "font-vazirmatn" : "font-manrope";

  return (
    <main className="min-h-screen bg-[#07071C] text-white">
      <Header lang={lang} />

      <div className="mx-auto max-w-4xl px-6 py-32 md:px-12 lg:px-16">
        <div
          className={`mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400 ${isRtl ? "text-right" : "text-left"}`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {article.category} • {article.published_date}
        </div>

        <h1
          className={`text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl ${fontClass} ${
            isRtl ? "text-right" : "text-left"
          }`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {article.title}
        </h1>

        <div
          className={`relative mt-10 w-full overflow-hidden rounded-2xl shadow-2xl ${article.aspect_ratio}`}
        >
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* استفاده از dangerouslySetInnerHTML برای رندر تگ‌های ادیتور و کلاس‌های prose */}
        <div
          className={`prose prose-invert prose-lg mt-12 max-w-none text-white/80 ${fontClass} ${
            isRtl ? "text-right" : "text-left"
          } prose-headings:font-bold prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 marker:text-blue-400`}
          dir={isRtl ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </main>
  );
}
