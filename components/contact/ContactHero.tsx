import Image from "next/image";
import ContactForm from "./ContactForm";
import { AppLocale, locales } from "@/i18nConfig";

type ContactHeroProps = {
  lang: string;
};

function getHeroContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      isRtl: false,
      title: "Get in Touch",
      description:
        "Whether you're shipping for the first time or managing ongoing logistics, our team is here to help.",
    },
    fa: {
      isRtl: true,
      title: "تماس با ما",
      description:
        "چه برای اولین بار محموله‌ای ارسال می‌کنید و چه در حال مدیریت لجستیک مستمر خود هستید، تیم ما برای کمک اینجاست.",
    },
    ar: {
      isRtl: true,
      title: "اتصل بنا",
      description:
        "سواء كنت تقوم بالشحن للمرة الأولى أو تدير عمليات لوجستية مستمرة، فإن فريقنا هنا لمساعدتك.",
    },
  };

  return content[safeLang];
}

export default function ContactHero({ lang }: ContactHeroProps) {
  const content = getHeroContent(lang);

  return (
    <section className="relative px-4 pt-32 pb-10 md:px-8">
      {/* 
        در حالت rtl با استفاده از direction خود مرورگر order مربوط به CSS Grid
        به صورت خودکار برعکس میشود. پس نیازی به تغییر دستی گرید نیست.
      */}
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2"
        dir={content.isRtl ? "rtl" : "ltr"}
      >
        {/* ---------- Form card (light theme) ---------- */}
        <div className="relative z-10 rounded-4xl bg-[#f3f4f6] p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-md text-sm text-gray-500">
            {content.description}
          </p>

          <ContactForm lang={lang} />
        </div>

        {/* ---------- Building image with concave notch ---------- */}
        <div className="relative min-h-90 overflow-hidden rounded-4xl lg:min-h-130">
          <Image
            src="/assets/images/contact/contact-building.jpg"
            alt="Tranzport headquarters building"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/*
            CONCAVE NOTCH
            در حالت ltr: سمت چپ پایین
            در حالت rtl: سمت راست پایین
          */}
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-px h-16 w-16 bg-[#0a0e1a] ${
              content.isRtl
                ? "-right-px [clip-path:path('M64,64_L64,0_A64,64_0_0_0_0,64_Z')]"
                : "-left-px [clip-path:path('M0,64_L0,0_A64,64_0_0_1_64,64_Z')]"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
