import CaseStudiesNewsHero from "./CaseStudiesNewsHero";
import CaseStudiesNewsGrid, { CaseItem } from "./CaseStudiesNewsGrid";

type CaseStudiesNewsPageProps = {
  lang: string;
  initialItems: CaseItem[];
};

export default function CaseStudiesNewsPage({
  lang,
  initialItems,
}: CaseStudiesNewsPageProps) {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <CaseStudiesNewsHero lang={lang} />
      <CaseStudiesNewsGrid lang={lang} initialItems={initialItems} />
    </main>
  );
}
