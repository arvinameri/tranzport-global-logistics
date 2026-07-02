"use client";

import React, { useMemo } from "react";
import { Package, Gem, Cog } from "lucide-react";
import { AppLocale, locales, getLocaleDirection } from "@/i18nConfig";

function getFeaturesContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      sectionTitle: "Core Services",
      sectionDesc:
        "At Baharan Group, project cargo reflects a combination of hands-on experience, structured coordination, and supply chain capability. We manage complex freight with the precision required to support high-value projects and long-term operational success.",
      features: [
        {
          icon: Package,
          title: "Over Dimensional",
          description:
            "End-to-end transport solutions for oversized and overweight cargo, supported by practical experience in construction contracting, route planning, execution control, and compliance-driven coordination.",
        },
        {
          icon: Gem,
          title: "Sensitive Cargo",
          description:
            "Special handling for delicate and high-value freight, backed by strong operational discipline, supply chain visibility, and a professional approach to risk control and delivery accuracy.",
        },
        {
          icon: Cog,
          title: "Energy & Infrastructure",
          description:
            "Project logistics aligned with Baharan Group’s broader capabilities in domestic trade, foreign trade, and logistics, helping large-scale industrial and infrastructure operations move with greater efficiency and reliability.",
        },
      ],
    },
    fa: {
      sectionTitle: "خدمات اصلی",
      sectionDesc:
        "در گروه بهاران، پروژه کارگو ترکیبی از تجربه عملی، هماهنگی ساختاریافته و توانمندی زنجیره تامین است. ما محموله‌های پیچیده را با دقت لازم برای پشتیبانی از پروژه‌های باارزش بالا و موفقیت عملیاتی بلندمدت مدیریت می‌کنیم.",
      features: [
        {
          icon: Package,
          title: "ابعاد فوق‌سنگین و ترافیکی",
          description:
            "راهکارهای حمل‌ونقل مبدأ تا مقصد برای بارهای با ابعاد و وزن نامتعارف، با پشتیبانی از تجربه عملی در پیمانکاری ساخت‌وساز، مسیریابی دقیق و کنترل کامل اجرا.",
        },
        {
          icon: Gem,
          title: "محموله‌های حساس",
          description:
            "جابجایی و رسیدگی ویژه به محموله‌های ظریف و ارزشمند، با پشتوانه نظم عملیاتی، دید‌پذیری در زنجیره تامین و رویکردی حرفه‌ای به کنترل ریسک.",
        },
        {
          icon: Cog,
          title: "انرژی و زیرساخت",
          description:
            "لجستیک پروژه‌ای همسو با توانمندی‌های گسترده گروه بهاران در تجارت داخلی و خارجی، برای کمک به عملیات‌های صنعتی بزرگ با بالاترین کارایی و اطمینان.",
        },
      ],
    },
    ar: {
      sectionTitle: "الخدمات الأساسية",
      sectionDesc:
        "في مجموعة بهاران، يعكس شحن المشاريع مزيجًا من الخبرة العملية والتنسيق المنظم وقدرات سلسلة التوريد. نحن ندير الشحنات المعقدة بالدقة المطلوبة لدعم المشاريع عالية القيمة والنجاح التشغيلي طويل الأجل.",
      features: [
        {
          icon: Package,
          title: "الأحجام الضخمة والزائدة",
          description:
            "حلول نقل شاملة للشحنات ذات الأحجام والوزن الزائد، مدعومة بخبرة عملية في مقاولات البناء وتخطيط المسارات والتحكم في التنفيذ.",
        },
        {
          icon: Gem,
          title: "الشحنات الحساسة",
          description:
            "التعامل الخاص مع البضائع الدقيقة وعالية القيمة، بدعم من الانضباط التشغيلي، ورؤية سلسلة التوريد، والنهج الاحترافي للتحكم في المخاطر.",
        },
        {
          icon: Cog,
          title: "الطاقة والبنية التحتية",
          description:
            "لوجستيات المشاريع المتوافقة مع القدرات الأوسع لمجموعة بهاران في التجارة المحلية والخارجية والخدمات اللوجستية للعمليات الصناعية الكبرى.",
        },
      ],
    },
  };

  return content[safeLang];
}

export default function ProjectCargoWhyChoose({ lang }: { lang: string }) {
  const content = useMemo(() => getFeaturesContent(lang), [lang]);
  const dir = getLocaleDirection(lang);
  const isRtl = dir === "rtl";

  return (
    <section
      className="relative w-full overflow-hidden bg-[#07071C] py-24 md:py-32"
      dir={dir}
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-18">
          <h2
            className={`text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-6xl lg:text-[4.5rem] ${
              isRtl ? "font-sans leading-[1.3]" : ""
            }`}
          >
            {content.sectionTitle}
          </h2>
          <p
            className={`mx-auto mt-5 max-w-3xl text-[18px] leading-tight tracking-[-0.02em] text-white/55 md:text-[20px] lg:text-[21px] ${
              isRtl ? "font-sans leading-[1.8]" : ""
            }`}
          >
            {content.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {content.features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="rounded-[28px] border border-white/10 bg-[#161631] p-8 md:p-9 lg:min-h-90 lg:p-10"
              >
                <div className="mb-8">
                  <Icon
                    className="h-10 w-10 text-[#2CC36B]"
                    strokeWidth={2.2}
                  />
                </div>

                <h3
                  className={`text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[38px] lg:text-[42px] ${
                    isRtl ? "font-sans leading-[1.3]" : ""
                  }`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`mt-5 text-[16px] leading-[1.45] tracking-[-0.015em] text-white/75 md:text-[17px] lg:text-[18px] ${
                    isRtl ? "font-sans leading-[1.8]" : ""
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
