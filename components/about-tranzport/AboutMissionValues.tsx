"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLocale, locales } from "@/i18nConfig";

gsap.registerPlugin(ScrollTrigger);

type AboutMissionValuesProps = {
  lang: string;
};

type MemberContent = {
  name: string;
  phone: string;
  bio: string;
};

type ValuesContent = {
  isRtl: boolean;
  nameClassName: string;
  phoneClassName: string;
  bioClassName: string;
  textBlockClassName: string;
  mehran: MemberContent;
  amir: MemberContent;
};

function getValuesContent(lang: string): ValuesContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, ValuesContent> = {
    en: {
      isRtl: false,
      nameClassName:
        "mb-6 font-sans text-5xl font-medium tracking-tight text-[#0A0733] md:text-6xl lg:text-7xl",
      phoneClassName: "mb-6 max-w-125 text-lg font-semibold text-[#0A0733]",
      bioClassName: "max-w-125 text-lg leading-relaxed text-[#0A0733]/60",
      textBlockClassName: "text-left",
      mehran: {
        name: "Mehran Baharvand",
        phone: "Phone: +98 912 641 8116",
        bio: "He has extensive experience in the construction contracting sector and commercial sales, with a proven track record of collaboration with reputable companies, including the Azarakhsh International Group, Kohan Ceram, EEFA, and several other prominent organizations. With a strong focus on supply chain management, sales process optimization, and coordination between execution and sales teams, he plays a key role in market development and the enhancement of overall organizational performance.",
      },
      amir: {
        name: "Amir Baharvand",
        phone: "Phone: +98 912 341 6326 / +98 912 842 5961",
        bio: "He has extensive and continuous experience in retail and direct distribution of household appliances and personal care products, with a successful track record of collaboration with reputable domestic and international companies, including Tehran Boran, P&G, Daya Beh-Ara, Khaneh & Ashpazkhaneh, Zarsima Qeshm, and several other international firms. His expertise in developing distribution networks, managing sales, and optimizing the performance of marketing and sales teams has contributed to increased market share, enhanced supply chain efficiency, and improved customer experience at the regional level.",
      },
    },
    fa: {
      isRtl: true,
      nameClassName:
        "mb-6 font-vazirmatn text-[38px] font-semibold tracking-tight text-[#0A0733] md:text-[46px] lg:text-[56px]",
      phoneClassName:
        "mb-6 max-w-125 font-vazirmatn text-[16px] font-bold text-[#0A0733]",
      bioClassName:
        "max-w-125 font-vazirmatn text-[15px] leading-[2.1] text-[#0A0733]/70",
      textBlockClassName: "text-right",
      mehran: {
        name: "مهران بهاروند",
        phone: "تلفن: 8116 641 912 98+",
        bio: "وی با تجربه گسترده در بخش پیمانکاری ساخت‌وساز و فروش تجاری، سابقه همکاری با شرکت‌های معتبری چون گروه بین‌المللی آذرخش، کهن سرام، ایفا و چندین سازمان برجسته دیگر را دارد. تمرکز اصلی وی بر مدیریت زنجیره تأمین، بهینه‌سازی فرآیند فروش و هماهنگی میان تیم‌های اجرایی و فروش است که نقش کلیدی در توسعه بازار و ارتقای عملکرد کلی سازمان ایفا می‌کند.",
      },
      amir: {
        name: "امیر بهاروند",
        phone: "تلفن: 6326 341 912 98+ / 5961 842 912 98+",
        bio: "ایشان دارای تجربه مستمر و وسیعی در خرده‌فروشی و توزیع مستقیم لوازم خانگی و محصولات مراقبت شخصی هستند. سوابق موفق همکاری با شرکت‌های معتبر داخلی و خارجی نظیر تهران بوران، P&G، دایا به‌آرا، خانه و آشپزخانه و زرسیما قشم نشان از تخصص بالای ایشان دارد. مهارت وی در توسعه شبکه‌های توزیع، مدیریت فروش و بهینه‌سازی عملکرد تیم‌های بازاریابی منجر به افزایش سهم بازار، ارتقای بهره‌وری زنجیره تأمین و بهبود تجربه مشتری در سطح منطقه شده است.",
      },
    },
    ar: {
      isRtl: true,
      nameClassName:
        "mb-6 font-vazirmatn text-[36px] font-semibold tracking-tight text-[#0A0733] md:text-[44px] lg:text-[54px]",
      phoneClassName:
        "mb-6 max-w-125 font-vazirmatn text-[16px] font-bold text-[#0A0733]",
      bioClassName:
        "max-w-125 font-vazirmatn text-[15px] leading-[2.1] text-[#0A0733]/70",
      textBlockClassName: "text-right",
      mehran: {
        name: "مهران بهاروند",
        phone: "الهاتف: 8116 641 912 98+",
        bio: "يتمتع بخبرة واسعة في قطاع المقاولات الإنشائية والمبيعات التجارية، وله سجل حافل بالتعاون مع شركات مرموقة مثل مجموعة آذرخش الدولية، وكوهان سيرام، وEEFA، وعدة مؤسسات بارزة أخرى. مع تركيزه الكبير على إدارة سلاسل الإمداد، وتحسين عملية المبيعات، والتنسيق بين فرق التنفيذ والمبيعات، يلعب دورًا رئيسيًا في تطوير السوق وتعزيز الأداء التنظيمي الشامل.",
      },
      amir: {
        name: "أمير بهاروند",
        phone: "الهاتف: 6326 341 912 98+ / 5961 842 912 98+",
        bio: "يتمتع بخبرة واسعة ومستمرة في البيع بالتجزئة والتوزيع المباشر للأجهزة المنزلية ومنتجات العناية الشخصية، مع سجل ناجح في التعاون مع شركات محلية ودولية مرموقة مثل طهران بوران، وP&G، ودايا بَه-آرا، وخانه وآشبزخانه، وزرسيما قشم. ساهمت خبرته في تطوير شبكات التوزيع، وإدارة المبيعات، وتحسين أداء فرق التسويق والمبيعات في زيادة الحصة السوقية، وتعزيز كفاءة سلسلة الإمداد، وتحسين تجربة العملاء على المستوى الإقليمي.",
      },
    },
  };
  return content[safeLang];
}

export default function AboutMissionValues({ lang }: AboutMissionValuesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const content = useMemo(() => getValuesContent(lang), [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".mv-notch-container")
        .forEach((notchContainer) => {
          const notch = notchContainer.querySelector(
            ".mv-notch",
          ) as HTMLElement;
          const card = notchContainer.closest(".mv-card") as HTMLElement;

          if (!notch || !card) return;

          gsap.fromTo(
            notch,
            { yPercent: 0, top: "0%" },
            {
              yPercent: -100,
              top: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 0.5,
              },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>(".mv-block").forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      className="relative w-full overflow-hidden bg-white py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto flex w-full max-w-350 flex-col gap-24 px-6 md:gap-32 lg:px-12 xl:px-20">
        {/* بلوک اول: Mehran Baharvand */}
        <div className="mv-block grid grid-cols-1 items-center gap-12 opacity-0 md:grid-cols-2 lg:gap-24">
          <div
            className={`order-2 md:order-1 ${content.textBlockClassName}`}
            dir={content.isRtl ? "rtl" : "ltr"}
          >
            <h2 className={content.nameClassName}>{content.mehran.name}</h2>
            <p className={content.phoneClassName} dir="ltr">
              {content.mehran.phone}
            </p>
            <p className={content.bioClassName}>{content.mehran.bio}</p>
          </div>

          <div className="mv-card relative order-1 w-full md:order-2">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl max-w-lg mx-auto">
              <Image
                src="/assets/images/about/mehran-baharvand.jpg"
                alt={content.mehran.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-[#0A0733]/5" />
            </div>

            <div className="mv-notch-container absolute -left-7.5 top-0 bottom-0 w-15 pointer-events-none z-10 overflow-hidden">
              <div className="mv-notch absolute left-0 w-full h-30 bg-white rounded-r-[60px] shadow-[inset_10px_0_20px_rgba(255,255,255,1)]" />
            </div>
          </div>
        </div>

        {/* بلوک دوم: Amir Baharvand */}
        <div className="mv-block grid grid-cols-1 items-center gap-12 opacity-0 md:grid-cols-2 lg:gap-24 mt-8 md:mt-16">
          <div className="mv-card relative order-1 w-full">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl max-w-lg mx-auto">
              <Image
                src="/assets/images/about/amir-baharvand.jpg"
                alt={content.amir.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-[#0A0733]/5" />
            </div>

            <div className="mv-notch-container absolute -right-7.5 top-0 bottom-0 w-15 pointer-events-none z-10 overflow-hidden">
              <div className="mv-notch absolute right-0 w-full h-30 bg-white rounded-l-[60px] shadow-[inset_-10px_0_20px_rgba(255,255,255,1)]" />
            </div>
          </div>

          <div
            className={`order-2 md:pl-8 lg:pl-16 ${content.textBlockClassName}`}
            dir={content.isRtl ? "rtl" : "ltr"}
          >
            <h2 className={content.nameClassName}>{content.amir.name}</h2>
            <div className="space-y-6">
              <p className={content.phoneClassName} dir="ltr">
                {content.amir.phone}
              </p>
              <p className={content.bioClassName}>{content.amir.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
