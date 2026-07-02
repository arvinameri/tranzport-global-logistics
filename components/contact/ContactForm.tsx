"use client";

import { useMemo, useState } from "react";
import { AppLocale, locales } from "@/i18nConfig";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: boolean;
}

const INITIAL: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  acceptTerms: false,
};

type Status = "idle" | "loading" | "success" | "error";

type ContactFormProps = {
  lang: string;
};

function getFormContent(lang: string) {
  const safeLang: AppLocale = locales.includes(lang as AppLocale)
    ? (lang as AppLocale)
    : "en";

  const content = {
    en: {
      isRtl: false,
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      acceptTerms: "I accept the Terms",
      errorTerms: "Please accept the Terms before submitting.",
      errorGeneral: "Something went wrong. Please try again.",
      success: "Thanks! Your message has been sent.",
      btnIdle: "Submit",
      btnLoading: "Sending...",
    },
    fa: {
      isRtl: true,
      fullName: "نام و نام خانوادگی",
      email: "ایمیل",
      phone: "شماره تماس",
      message: "پیام شما",
      acceptTerms: "شرایط و قوانین را می‌پذیرم",
      errorTerms: "لطفاً پیش از ارسال، شرایط را بپذیرید.",
      errorGeneral: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      success: "متشکریم! پیام شما ارسال شد.",
      btnIdle: "ارسال پیام",
      btnLoading: "در حال ارسال...",
    },
    ar: {
      isRtl: true,
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "الرسالة",
      acceptTerms: "أوافق على الشروط",
      errorTerms: "يرجى قبول الشروط قبل الإرسال.",
      errorGeneral: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      success: "شكرًا لك! تم إرسال رسالتك.",
      btnIdle: "إرسال",
      btnLoading: "جارٍ الإرسال...",
    },
  };

  return content[safeLang];
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [data, setData] = useState<ContactFormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const content = useMemo(() => getFormContent(lang), [lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.acceptTerms) {
      setErrorMsg(content.errorTerms);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          message: data.message,
          termsAccepted: data.acceptTerms,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setData(INITIAL);
    } catch {
      setStatus("error");
      setErrorMsg(content.errorGeneral);
    }
  };

  const inputClass = `w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none transition-colors ${
    content.isRtl ? "text-right" : "text-left"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
      noValidate
      dir={content.isRtl ? "rtl" : "ltr"}
    >
      <input
        type="text"
        name="fullName"
        value={data.fullName}
        onChange={handleChange}
        required
        placeholder={content.fullName}
        className={inputClass}
      />

      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        required
        placeholder={content.email}
        className={inputClass}
      />

      <input
        type="tel"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        placeholder={content.phone}
        className={inputClass}
      />

      <textarea
        name="message"
        value={data.message}
        onChange={handleChange}
        required
        rows={3}
        placeholder={content.message}
        className={`${inputClass} resize-none`}
      />

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={data.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <span>{content.acceptTerms}</span>
      </label>

      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      {status === "success" && (
        <p className="text-sm text-green-600">{content.success}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`rounded-md bg-green-500 px-7 py-2.5 font-medium text-white transition-colors hover:bg-green-600 disabled:opacity-60 ${
          content.isRtl ? "float-right" : ""
        }`}
      >
        {status === "loading" ? content.btnLoading : content.btnIdle}
      </button>
      <div className="clear-both" />
    </form>
  );
}
