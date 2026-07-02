"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import TipTapEditor from "@/components/admin/TipTapEditor";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

type BrandFormData = {
  slug: string;
  logo_url: string;
  sort_order: number;
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

const PRESET_BRANDS = [
  { name: "P&G", slug: "pg", url: "/assets/logos/pg.jpg" },
  {
    name: "Victorinox",
    slug: "victorinox",
    url: "/assets/logos/victorinox.jpg",
  },
  { name: "Brabantia", slug: "brabantia", url: "/assets/logos/brabantia.jpg" },
  {
    name: "Gastroback",
    slug: "gastroback",
    url: "/assets/logos/gastroback.jpg",
  },
  { name: "Durex", slug: "durex", url: "/assets/logos/durex.jpg" },
  { name: "Veet", slug: "veet", url: "/assets/logos/veet.jpg" },
  { name: "Always", slug: "always", url: "/assets/logos/always.jpg" },
  { name: "Tampax", slug: "tampax", url: "/assets/logos/tampax.jpg" },
  { name: "Philips", slug: "philips", url: "/assets/logos/philips.jpg" },
  { name: "Pantene", slug: "pantene", url: "/assets/logos/pantene.jpg" },
  { name: "Oral-B", slug: "oralb", url: "/assets/logos/oralb.jpg" },
  { name: "Old Spice", slug: "oldspice", url: "/assets/logos/oldspice.jpg" },
  { name: "Olay", slug: "olay", url: "/assets/logos/olay.jpg" },
  { name: "Miele", slug: "miele", url: "/assets/logos/miele.jpg" },
  { name: "Galanz", slug: "galanz", url: "/assets/logos/galanz.jpg" },
  { name: "Fissler", slug: "fissler", url: "/assets/logos/fissler.jpg" },
  { name: "Kuhn", slug: "kuhn", url: "/assets/logos/kuhn.jpg" },
  { name: "Ola", slug: "ola", url: "/assets/logos/ola.jpg" },
  { name: "Vornado", slug: "vornado", url: "/assets/logos/vornado.jpg" },
  { name: "Gillette", slug: "gillette", url: "/assets/logos/gillette.jpg" },
  { name: "Fixodent", slug: "fixodent", url: "/assets/logos/fixodent.jpg" },
  { name: "Braun", slug: "braun", url: "/assets/logos/braun.jpg" },
  {
    name: "Greenworks",
    slug: "greenworks",
    url: "/assets/logos/greenworks.jpg",
  },
];

const defaultFormData: BrandFormData = {
  slug: "",
  logo_url: "",
  sort_order: 0,
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

export default function BrandForm({
  mode,
  lang: propLang,
  brandId,
  initialData,
}: {
  mode: "create" | "edit";
  lang?: string;
  brandId?: string;
  initialData?: Partial<BrandFormData>;
}) {
  const router = useRouter();

  // خواندن مستقیم زبان از URL برای جلوگیری از باگ undefined
  const params = useParams();
  const lang = params?.lang || propLang || "en";

  const [formData, setFormData] = useState<BrandFormData>({
    ...defaultFormData,
    ...initialData,
  });

  const [selectionType, setSelectionType] = useState<"preset" | "custom">(
    mode === "edit" ? "custom" : "preset",
  );

  const [submitting, setSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (initialData) setFormData({ ...defaultFormData, ...initialData });
  }, [initialData]);

  const pageTitle =
    mode === "create"
      ? "ایجاد پروفایل برای شریک تجاری"
      : "ویرایش اطلاعات شریک تجاری";

  const updateField = (field: keyof BrandFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePresetSelect = (slug: string) => {
    const selected = PRESET_BRANDS.find((b) => b.slug === slug);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        slug: selected.slug,
        logo_url: selected.url,
        meta_title_en: `${selected.name} Partner Profile`,
        meta_title_fa: `پروفایل همکاری با برند ${selected.name}`,
        meta_title_ar: `ملف الشراكة مع العلامة التجارية ${selected.name}`,
      }));
    } else {
      setFormData((prev) => ({ ...prev, slug: "", logo_url: "" }));
    }
  };

  const handleLogoUpload = async (file: File) => {
    setUploadingLogo(true);
    setError("");
    setSuccess("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();

      if (!res.ok || !data?.success)
        throw new Error(data?.error || "خطا در آپلود");

      updateField("logo_url", data.url);

      if (!formData.slug) {
        updateField("slug", normalizeSlug(file.name.split(".")[0]));
      }
    } catch (err: any) {
      setError(err?.message || "خطا در آپلود");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.slug.trim() || !formData.logo_url.trim()) {
      setError(
        "لطفاً برند مورد نظر را از لیست انتخاب کنید یا لوگو و نام آن را وارد کنید.",
      );
      return;
    }

    const payload = { ...formData, slug: normalizeSlug(formData.slug) };
    setSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? "/api/admin/brands"
          : `/api/admin/brands/${brandId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok)
        throw new Error(data?.error || "خطا در ذخیره‌سازی اطلاعات");

      setSuccess("اطلاعات با موفقیت ذخیره شد.");
      if (mode === "create") {
        router.push(`/${lang}/admin/brands`);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "خطای ناشناخته");
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
              href={`/${lang}/admin/brands`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ArrowLeft size={18} className="transform rotate-180" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="mt-1 text-sm text-gray-500 font-medium">
                محتوای صفحه اختصاصی رزومه برندها را در اینجا مدیریت کنید.
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || uploadingLogo}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            ذخیره اطلاعات
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 font-medium flex gap-2 items-center">
            <CheckCircle2 size={18} /> {success}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900 border-b pb-3">
                متن رزومه (محتوای صفحه)
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                از طریق ادیتور زیر می‌توانید سوابق کاری، توضیحات و حتی عکس‌های
                دلخواه را برای صفحه اختصاصی این برند در ۳ زبان مختلف وارد کنید.
              </p>

              <div className="space-y-10">
                <div className="border border-blue-100 rounded-2xl p-4 bg-blue-50/30">
                  <h3 className="mb-3 text-base font-bold text-blue-900 flex items-center gap-2">
                    🇬🇧 محتوای زبان انگلیسی (English)
                  </h3>
                  <TipTapEditor
                    value={formData.content_en}
                    onChange={(v) => updateField("content_en", v)}
                    dir="ltr"
                  />
                </div>
                <div className="border border-green-100 rounded-2xl p-4 bg-green-50/30">
                  <h3 className="mb-3 text-base font-bold text-green-900 flex items-center gap-2">
                    🇮🇷 محتوای زبان فارسی
                  </h3>
                  <TipTapEditor
                    value={formData.content_fa}
                    onChange={(v) => updateField("content_fa", v)}
                    dir="rtl"
                  />
                </div>
                <div className="border border-amber-100 rounded-2xl p-4 bg-amber-50/30">
                  <h3 className="mb-3 text-base font-bold text-amber-900 flex items-center gap-2">
                    🇦🇪 محتوای زبان عربی (العربية)
                  </h3>
                  <TipTapEditor
                    value={formData.content_ar}
                    onChange={(v) => updateField("content_ar", v)}
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                تنظیمات لوگو و آدرس
              </h2>

              {mode === "create" && (
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => setSelectionType("preset")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${selectionType === "preset" ? "bg-white text-purple-700 shadow-sm" : "text-gray-500"}`}
                  >
                    انتخاب از برندهای فعلی
                  </button>
                  <button
                    onClick={() => setSelectionType("custom")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${selectionType === "custom" ? "bg-white text-purple-700 shadow-sm" : "text-gray-500"}`}
                  >
                    آپلود برند جدید
                  </button>
                </div>
              )}

              {selectionType === "preset" ? (
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    کدام برند را ویرایش می‌کنید؟
                  </label>
                  <select
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-purple-500 bg-white text-gray-900 font-medium appearance-none cursor-pointer"
                    onChange={(e) => handlePresetSelect(e.target.value)}
                    value={
                      formData.slug &&
                      PRESET_BRANDS.some((b) => b.slug === formData.slug)
                        ? formData.slug
                        : ""
                    }
                  >
                    <option
                      value=""
                      disabled
                      className="text-gray-500 bg-white"
                    >
                      -- برند مورد نظر را انتخاب کنید --
                    </option>
                    {PRESET_BRANDS.map((b) => (
                      <option
                        key={b.slug}
                        value={b.slug}
                        className="text-gray-900 bg-white font-medium"
                      >
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    با انتخاب هر برند، سیستم به‌طور خودکار لوگو و تنظیمات آن را
                    اعمال می‌کند.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 mb-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      نامک (آدرس انگلیسی صفحه)
                    </label>
                    <input
                      dir="ltr"
                      value={formData.slug}
                      onChange={(e) => updateField("slug", e.target.value)}
                      onBlur={() =>
                        updateField("slug", normalizeSlug(formData.slug))
                      }
                      placeholder="مثال: lg-electronics"
                      className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      آپلود لوگوی برند جدید
                    </label>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-6 text-center hover:border-purple-400 hover:bg-purple-50">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(file);
                        }}
                      />
                      {uploadingLogo ? (
                        <Loader2
                          size={24}
                          className="animate-spin text-purple-600 mb-2"
                        />
                      ) : (
                        <UploadCloud
                          size={24}
                          className="text-purple-600 mb-2"
                        />
                      )}
                      <span className="text-xs font-semibold text-gray-700">
                        برای انتخاب فایل کلیک کنید
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {formData.logo_url && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700">
                    <ImagePlus size={16} /> پیش‌نمایش لوگو
                  </div>
                  <div className="flex h-32 items-center justify-center rounded-xl bg-white p-2">
                    <img
                      src={formData.logo_url}
                      alt="Logo"
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
