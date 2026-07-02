"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { AppLocale, locales } from "@/i18nConfig";

type CorpacCommitmentProps = {
  lang: string;
};

type CommitmentContent = {
  isRtl: boolean;
  words: string[];
  headingClassName: string;
  cardLabelClassName: string;
  bodyClassName: string;
  containerClassName: string;
  floatingCardsClassName: string;
  firstCardClassName: string;
  secondCardClassName: string;
  textAlignClassName: string;
  missionTitle: string;
  missionText: string;
  experienceTitle: string;
  experienceParagraphs: string[];
};

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#4b5563", "#ffffff"]);

  return (
    <motion.span style={{ color }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function getCommitmentContent(lang: string): CommitmentContent {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content: Record<AppLocale, CommitmentContent> = {
    en: {
      isRtl: false,
      words: [
        "Committed",
        "to",
        "Excellence,",
        "Innovation,",
        "and",
        "Integrity",
      ],
      headingClassName:
        "text-4xl font-light leading-[1.1] tracking-tight md:text-6xl",
      cardLabelClassName:
        "mb-3 text-sm font-semibold uppercase tracking-wider text-white/50",
      bodyClassName: "text-base leading-relaxed text-white/90 md:text-lg",
      containerClassName:
        "absolute bottom-8 left-6 z-10 max-w-3xl md:bottom-14 md:left-14",
      floatingCardsClassName:
        "absolute right-4 top-16 z-10 flex w-[88%] max-w-md flex-col gap-5 md:right-12 md:top-24 md:w-full md:max-w-xl",
      firstCardClassName:
        "rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8",
      secondCardClassName:
        "ml-auto w-[92%] rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8",
      textAlignClassName: "text-left",
      missionTitle: "Holding Objectives",
      missionText:
        "In the dynamic and highly competitive global business environment, organizational commitment and professional accountability are fundamental to building lasting trust and achieving long-term growth.",
      experienceTitle: "Experience",
      experienceParagraphs: [
        "Backed by years of effective presence in domestic and international markets, and leveraging its strategic capabilities in supply chain management and integration, Baharan Group delivers reliable, scalable solutions aligned with global standards.",
        "This professional approach reinforces our commitment to achieving our partners’ objectives and realizing shared success.",
      ],
    },
    fa: {
      isRtl: true,
      words: ["متعهد", "به", "تعالی،", "نوآوری،", "و", "درستی"],
      headingClassName:
        "font-vazirmatn text-[32px] font-medium leading-[1.18] tracking-tight md:text-[52px]",
      cardLabelClassName:
        "mb-3 font-vazirmatn text-[12px] font-semibold tracking-[0.08em] text-white/50",
      bodyClassName:
        "font-vazirmatn text-[15px] leading-[2] text-white/90 md:text-[17px]",
      containerClassName:
        "absolute bottom-8 right-6 z-10 max-w-3xl md:bottom-14 md:right-14",
      floatingCardsClassName:
        "absolute left-4 top-16 z-10 flex w-[88%] max-w-md flex-col gap-5 md:left-12 md:top-24 md:w-full md:max-w-xl",
      firstCardClassName:
        "rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8",
      secondCardClassName:
        "mr-auto w-[92%] rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8",
      textAlignClassName: "text-right",
      missionTitle: "اهداف هلدینگ",
      missionText:
        "در فضای پویا و بسیار رقابتی کسب‌وکار جهانی، تعهد سازمانی و مسئولیت‌پذیری حرفه‌ای از ارکان اصلی ایجاد اعتماد پایدار و دستیابی به رشد بلندمدت به شمار می‌آیند.",
      experienceTitle: "تجربه",
      experienceParagraphs: [
        "گروه بهاران با پشتوانه سال‌ها حضور مؤثر در بازارهای داخلی و بین‌المللی و با تکیه بر توانمندی‌های راهبردی خود در مدیریت و یکپارچه‌سازی زنجیره تأمین، راهکارهایی قابل اتکا، مقیاس‌پذیر و منطبق با استانداردهای جهانی ارائه می‌دهد.",
        "این رویکرد حرفه‌ای، تعهد ما را نسبت به تحقق اهداف شرکای تجاری و دستیابی به موفقیت مشترک تقویت می‌کند.",
      ],
    },
    ar: {
      isRtl: true,
      words: ["ملتزمون", "بـ", "التميّز،", "والابتكار،", "والنزاهة"],
      headingClassName:
        "font-vazirmatn text-[31px] font-medium leading-[1.2] tracking-tight md:text-[50px]",
      cardLabelClassName:
        "mb-3 font-vazirmatn text-[12px] font-semibold tracking-[0.08em] text-white/50",
      bodyClassName:
        "font-vazirmatn text-[15px] leading-[2] text-white/90 md:text-[17px]",
      containerClassName:
        "absolute bottom-8 right-6 z-10 max-w-3xl md:bottom-14 md:right-14",
      floatingCardsClassName:
        "absolute left-4 top-16 z-10 flex w-[88%] max-w-md flex-col gap-5 md:left-12 md:top-24 md:w-full md:max-w-xl",
      firstCardClassName:
        "rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8",
      secondCardClassName:
        "mr-auto w-[92%] rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8",
      textAlignClassName: "text-right",
      missionTitle: "أهداف المجموعة",
      missionText:
        "في بيئة الأعمال العالمية الديناميكية وشديدة التنافس، يُعد الالتزام المؤسسي والمسؤولية المهنية أساسين رئيسيين لبناء الثقة المستدامة وتحقيق النمو طويل الأمد.",
      experienceTitle: "الخبرة",
      experienceParagraphs: [
        "استنادًا إلى سنوات من الحضور الفعّال في الأسواق المحلية والدولية، وبالاعتماد على قدراتها الاستراتيجية في إدارة سلاسل الإمداد وتكاملها، تقدم مجموعة بهاران حلولًا موثوقة وقابلة للتوسع ومتوافقة مع المعايير العالمية.",
        "ويعزز هذا النهج المهني التزامنا بتحقيق أهداف شركائنا والوصول إلى نجاح مشترك.",
      ],
    },
  };

  return content[safeLang];
}

export default function CorpacCommitment({ lang }: CorpacCommitmentProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = useMemo(() => getCommitmentContent(lang), [lang]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const missionOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const missionY = useTransform(scrollYProgress, [0.05, 0.35], [40, 0]);
  const valuesOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const valuesY = useTransform(scrollYProgress, [0.25, 0.55], [40, 0]);

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      className="relative h-[220vh] bg-[#07071C]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-3 py-4 md:px-6 md:py-6">
        <div className="relative h-full w-full overflow-hidden rounded-[36px] md:rounded-[48px]">
          <motion.div style={{ scale, y: imageY }} className="absolute inset-0">
            <Image
              src="/assets/images/corpac/truck-highway.jpg"
              alt="Tranzport semi-truck crossing a highway overpass at dusk"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/40" />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-black/30" />

          <div
            dir={content.isRtl ? "rtl" : "ltr"}
            className={`${content.containerClassName} ${content.textAlignClassName}`}
          >
            <h2 className={content.headingClassName}>
              {content.words.map((word, i) => {
                const start = 0.1 + (i / content.words.length) * 0.4;
                const end = start + 0.1;

                return (
                  <Word
                    key={`${word}-${i}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </h2>
          </div>

          <div className={content.floatingCardsClassName}>
            <motion.div
              style={{ opacity: missionOpacity, y: missionY }}
              className={content.firstCardClassName}
              dir={content.isRtl ? "rtl" : "ltr"}
            >
              <p
                className={`${content.cardLabelClassName} ${content.textAlignClassName}`}
              >
                {content.missionTitle}
              </p>
              <p
                className={`${content.bodyClassName} ${content.textAlignClassName}`}
              >
                {content.missionText}
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: valuesOpacity, y: valuesY }}
              className={content.secondCardClassName}
              dir={content.isRtl ? "rtl" : "ltr"}
            >
              <p
                className={`${content.cardLabelClassName} ${content.textAlignClassName}`}
              >
                {content.experienceTitle}
              </p>

              <div
                className={`space-y-4 ${content.bodyClassName} ${content.textAlignClassName}`}
              >
                {content.experienceParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
