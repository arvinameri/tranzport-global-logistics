import Header from "@/components/layout/Header";
import CaseStudies from "@/components/home/CaseStudies";
import FooterCTA from "@/components/home/FooterCTA";
import WarehousingHero from "@/components/warehousing-distribution/WarehousingHero";
import WarehousingNetwork from "@/components/warehousing-distribution/WarehousingNetwork";
import WarehousingScrollStack from "@/components/warehousing-distribution/WarehousingScrollStack";
import WarehousingWhyChoose from "@/components/warehousing-distribution/WarehousingWhyChoose";
import { AppLocale, defaultLocale, isValidLocale } from "@/i18nConfig";

function normalizeLocale(value?: string): AppLocale {
  if (value && isValidLocale(value)) return value;
  return defaultLocale;
}

export default async function WarehousingDistributionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = normalizeLocale(resolvedParams?.lang);

  const footerContent: Record<
    AppLocale,
    {
      titleLine1: string;
      titleLine2: string;
      description: string;
    }
  > = {
    en: {
      titleLine1: "Ready to optimize your warehousing and distribution?",
      titleLine2: "",
      description:
        "Connect with our team to design a storage and delivery solution tailored to your business.",
    },
    fa: {
      titleLine1: "آماده‌اید انبارداری و توزیع خود را بهینه کنید؟",
      titleLine2: "",
      description:
        "با تیم ما در ارتباط باشید تا یک راهکار ذخیره‌سازی و توزیع متناسب با کسب‌وکار شما طراحی شود.",
    },
    ar: {
      titleLine1: "هل أنتم مستعدون لتحسين التخزين والتوزيع لديكم؟",
      titleLine2: "",
      description:
        "تواصلوا مع فريقنا لتصميم حل تخزين وتسليم مخصص يناسب أعمالكم.",
    },
  };

  const footer = footerContent[lang];

  return (
    <main className="relative min-h-screen w-full bg-brand-dark">
      <Header lang={lang} />
      <WarehousingHero />
      <WarehousingScrollStack />
      <WarehousingNetwork />
      <WarehousingWhyChoose />
      <CaseStudies lang={lang} />
      <FooterCTA
        titleLine1={footer.titleLine1}
        titleLine2={footer.titleLine2}
        description={footer.description}
      />
    </main>
  );
}
