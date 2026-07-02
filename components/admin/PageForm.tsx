"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import TipTapEditor from "@/components/admin/TipTapEditor";
import { ArrowLeft, Loader2, Save, Wand2 } from "lucide-react";

type PageFormData = {
  slug: string;
  is_published: boolean;
  show_in_menu: boolean;
  menu_title_en: string;
  menu_title_fa: string;
  menu_title_ar: string;
  meta_title_en: string;
  meta_title_fa: string;
  meta_title_ar: string;
  meta_desc_en: string;
  meta_desc_fa: string;
  meta_desc_ar: string;
  content_en: string;
  content_fa: string;
  content_ar: string;
};

const defaultFormData: PageFormData = {
  slug: "",
  is_published: true,
  show_in_menu: false,
  menu_title_en: "",
  menu_title_fa: "",
  menu_title_ar: "",
  meta_title_en: "",
  meta_title_fa: "",
  meta_title_ar: "",
  meta_desc_en: "",
  meta_desc_fa: "",
  meta_desc_ar: "",
  content_en: "",
  content_fa: "",
  content_ar: "",
};

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  onBlur,
  dir = "ltr",
}: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, dir = "ltr" }: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <textarea
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-amber-500"
      />
    </div>
  );
}

export default function PageForm({
  mode,
  lang: propLang,
  pageId,
  initialData,
}: any) {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || propLang || "en";

  const [formData, setFormData] = useState<PageFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (initialData) setFormData({ ...defaultFormData, ...initialData });
  }, [initialData]);

  const pageTitle = mode === "create" ? "ساخت صفحه جدید" : "ویرایش صفحه";

  const updateField = (field: keyof PageFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.slug.trim()) {
      setError("اسلاگ (آدرس صفحه) الزامی است.");
      return;
    }

    const payload = { ...formData, slug: normalizeSlug(formData.slug) };
    setSubmitting(true);

    try {
      const endpoint =
        mode === "create" ? "/api/admin/pages" : `/api/admin/pages/${pageId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok)
        throw new Error(data?.error || "خطا در ارتباط با سرور");

      setSuccess("صفحه با موفقیت ذخیره شد.");
      if (mode === "create") {
        router.push(`/${lang}/admin/pages`);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "ارور ناشناخته");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-6 py-8 md:px-8" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/admin/pages`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ArrowLeft size={18} className="transform rotate-180" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="mt-1 text-sm text-gray-500">
                صفحات داینامیک را در اینجا طراحی و مدیریت کنید.
              </p>
            </div>
          </div>
          <button
            type="submit"
            form="page-form"
            disabled={submitting}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}{" "}
            ذخیره صفحه
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        <form id="page-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2 space-y-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  title="محتوای متنی صفحه"
                  subtitle="متن‌ها و تصاویر صفحه را در ادیتور بنویسید."
                />
                <div className="space-y-8">
                  <div className="border border-blue-100 rounded-2xl p-4 bg-blue-50/30">
                    <h3 className="mb-3 text-base font-bold text-blue-900">
                      English Content
                    </h3>
                    <TipTapEditor
                      value={formData.content_en}
                      onChange={(val) => updateField("content_en", val)}
                      dir="ltr"
                    />
                  </div>
                  <div className="border border-green-100 rounded-2xl p-4 bg-green-50/30">
                    <h3 className="mb-3 text-base font-bold text-green-900">
                      محتوای فارسی
                    </h3>
                    <TipTapEditor
                      value={formData.content_fa}
                      onChange={(val) => updateField("content_fa", val)}
                      dir="rtl"
                    />
                  </div>
                  <div className="border border-amber-100 rounded-2xl p-4 bg-amber-50/30">
                    <h3 className="mb-3 text-base font-bold text-amber-900">
                      المحتوى العربي
                    </h3>
                    <TipTapEditor
                      value={formData.content_ar}
                      onChange={(val) => updateField("content_ar", val)}
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  title="تنظیمات آدرس و انتشار"
                  subtitle="مدیریت وضعیت صفحه"
                />
                <div className="space-y-5">
                  <TextInput
                    label="Slug (نامک انگلیسی)"
                    value={formData.slug}
                    onChange={(val: string) => updateField("slug", val)}
                    onBlur={() =>
                      updateField("slug", normalizeSlug(formData.slug))
                    }
                    placeholder="example: rules"
                  />
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={(e) =>
                        updateField("is_published", e.target.checked)
                      }
                      className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="is_published"
                      className="text-sm font-bold text-gray-800 cursor-pointer"
                    >
                      نمایش عمومی در سایت (انتشار)
                    </label>
                  </div>
                </div>
              </div>

              {/* بخش جدید منو */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm border-t-4 border-t-purple-500">
                <SectionTitle
                  title="تنظیمات منوی اصلی"
                  subtitle="آیا میخواهید این صفحه در منوی سایت دیده شود؟"
                />
                <div className="space-y-5">
                  <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <input
                      type="checkbox"
                      id="show_in_menu"
                      checked={formData.show_in_menu}
                      onChange={(e) =>
                        updateField("show_in_menu", e.target.checked)
                      }
                      className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="show_in_menu"
                      className="text-sm font-bold text-purple-900 cursor-pointer"
                    >
                      افزودن به منوی اصلی سایت
                    </label>
                  </div>

                  {formData.show_in_menu && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                      <TextInput
                        label="عنوان در منو (انگلیسی)"
                        value={formData.menu_title_en}
                        onChange={(val: string) =>
                          updateField("menu_title_en", val)
                        }
                        placeholder="e.g. Terms of Service"
                      />
                      <TextInput
                        dir="rtl"
                        label="عنوان در منو (فارسی)"
                        value={formData.menu_title_fa}
                        onChange={(val: string) =>
                          updateField("menu_title_fa", val)
                        }
                        placeholder="مثال: قوانین سایت"
                      />
                      <TextInput
                        dir="rtl"
                        label="عنوان در منو (عربی)"
                        value={formData.menu_title_ar}
                        onChange={(val: string) =>
                          updateField("menu_title_ar", val)
                        }
                        placeholder="مثال: شروط الخدمة"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionTitle
                  title="تنظیمات سئو"
                  subtitle="این فیلدها برای گوگل بسیار مهم هستند."
                />
                <div className="space-y-6">
                  <div className="space-y-4 border-r-2 border-blue-500 pr-4">
                    <TextInput
                      label="Meta Title (EN)"
                      value={formData.meta_title_en}
                      onChange={(val: string) =>
                        updateField("meta_title_en", val)
                      }
                    />
                    <TextArea
                      label="Meta Description (EN)"
                      value={formData.meta_desc_en}
                      onChange={(val: string) =>
                        updateField("meta_desc_en", val)
                      }
                    />
                  </div>
                  <div className="space-y-4 border-r-2 border-green-500 pr-4">
                    <TextInput
                      dir="rtl"
                      label="عنوان سئو (FA)"
                      value={formData.meta_title_fa}
                      onChange={(val: string) =>
                        updateField("meta_title_fa", val)
                      }
                    />
                    <TextArea
                      dir="rtl"
                      label="توضیحات سئو (FA)"
                      value={formData.meta_desc_fa}
                      onChange={(val: string) =>
                        updateField("meta_desc_fa", val)
                      }
                    />
                  </div>
                  <div className="space-y-4 border-r-2 border-amber-500 pr-4">
                    <TextInput
                      dir="rtl"
                      label="عنوان سئو (AR)"
                      value={formData.meta_title_ar}
                      onChange={(val: string) =>
                        updateField("meta_title_ar", val)
                      }
                    />
                    <TextArea
                      dir="rtl"
                      label="توضیحات سئو (AR)"
                      value={formData.meta_desc_ar}
                      onChange={(val: string) =>
                        updateField("meta_desc_ar", val)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
