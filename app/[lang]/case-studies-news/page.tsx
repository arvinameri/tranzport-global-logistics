import Header from "@/components/layout/Header";
import FooterCTA from "@/components/home/FooterCTA";
import CaseStudiesNewsPage from "@/components/case-studies-news/CaseStudiesNewsPage";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CaseStudiesNews({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const { rows: articles } = await pool.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
  );

  const formattedItems = articles.map((item) => {
    const localizedSlug =
      lang === "fa"
        ? item.slug_fa
        : lang === "ar"
          ? item.slug_ar
          : item.slug_en;

    const localizedTitle =
      lang === "fa"
        ? item.title_fa
        : lang === "ar"
          ? item.title_ar
          : item.title_en;

    return {
      slug: localizedSlug,
      title: localizedTitle,
      date: item.published_date,
      category: item.category,
      image: item.image_url,
      aspect: item.aspect_ratio,
    };
  });

  return (
    <main className="relative min-h-screen w-full bg-[#07071C]">
      <Header lang={lang} />

      <CaseStudiesNewsPage lang={lang} initialItems={formattedItems} />

      <FooterCTA
        lang={lang}
        titleLine1="Ready to write your"
        titleLine2="success story with Tranzport?"
        description="Let’s solve your logistics challenges and deliver measurable results."
      />
    </main>
  );
}
