"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

type LanguageTab = "en" | "fa" | "ar";

type MultilingualArticleForm = {
  title_en: string;
  title_fa: string;
  title_ar: string;
  slug_en: string;
  slug_fa: string;
  slug_ar: string;
  content_en: string;
  content_fa: string;
  content_ar: string;
  category: "Case Studies" | "News";
  publishedDate: string;
  aspectRatio: string;
};

export default function NewArticlePage() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<LanguageTab>("en");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<MultilingualArticleForm>({
    title_en: "",
    title_fa: "",
    title_ar: "",
    slug_en: "",
    slug_fa: "",
    slug_ar: "",
    content_en: "",
    content_fa: "",
    content_ar: "",
    category: "Case Studies",
    publishedDate: "",
    aspectRatio: "aspect-[4/3]",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadResult.error || "Upload failed");
      }

      const uploadedImageUrl = uploadResult.url;

      const articlePayload = {
        ...formData,
        imageUrl: uploadedImageUrl,
      };

      const articleRes = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articlePayload),
      });

      const articleResult = await articleRes.json();

      if (!articleRes.ok) {
        throw new Error(articleResult.error || "Failed to publish article");
      }

      alert("Article published successfully!");
      router.push(`/${lang}/admin/articles`);
    } catch (error: any) {
      alert(error.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none";

  const textareaClass =
    "w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-600 focus:outline-none";

  const currentTitleKey = `title_${activeTab}` as const;
  const currentSlugKey = `slug_${activeTab}` as const;
  const currentContentKey = `content_${activeTab}` as const;

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Article
          </h1>

          <button
            onClick={() => router.push(`/${lang}/admin/articles`)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Articles
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 border-b border-gray-200 pb-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className={inputClass}
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "Case Studies" | "News",
                  })
                }
              >
                <option value="Case Studies">Case Studies</option>
                <option value="News">News</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Published Date (Text)
              </label>
              <input
                type="text"
                required
                className={inputClass}
                value={formData.publishedDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishedDate: e.target.value })
                }
                placeholder="e.g. April 25, 2026"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Article Image
              </label>

              <div className="flex items-center gap-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />

                {imagePreview && (
                  <div className="relative h-20 w-32 overflow-hidden rounded border border-gray-200 shadow-sm">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image Aspect Ratio
              </label>
              <select
                className={inputClass}
                value={formData.aspectRatio}
                onChange={(e) =>
                  setFormData({ ...formData, aspectRatio: e.target.value })
                }
              >
                <option value="aspect-[4/3]">4:3 (Standard)</option>
                <option value="aspect-[16/9]">16:9 (Wide)</option>
                <option value="aspect-[3/4]">3:4 (Tall)</option>
                <option value="aspect-[16/10]">16:10</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-4 flex border-b border-gray-300">
              {(["en", "fa", "ar"] as LanguageTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "en"
                    ? "English"
                    : tab === "fa"
                      ? "Persian"
                      : "Arabic"}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title ({activeTab.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  dir={activeTab === "en" ? "ltr" : "rtl"}
                  className={inputClass}
                  value={formData[currentTitleKey]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [currentTitleKey]: e.target.value,
                    })
                  }
                  placeholder={
                    activeTab === "en"
                      ? "e.g. Sensitive Instrumentation"
                      : activeTab === "fa"
                        ? "مثلاً ابزار دقیق حساس"
                        : "مثلاً المعدات الحساسة"
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Slug ({activeTab.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  className={inputClass}
                  value={formData[currentSlugKey]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [currentSlugKey]: e.target.value,
                    })
                  }
                  placeholder={
                    activeTab === "en"
                      ? "e.g. sensitive-instrumentation"
                      : activeTab === "fa"
                        ? "e.g. abzar-daghigh-hasas"
                        : "e.g. sensitive-equipment-ar"
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Content ({activeTab.toUpperCase()})
                </label>
                <textarea
                  required
                  rows={12}
                  dir={activeTab === "en" ? "ltr" : "rtl"}
                  className={textareaClass}
                  value={formData[currentContentKey]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [currentContentKey]: e.target.value,
                    })
                  }
                  placeholder={
                    activeTab === "en"
                      ? "Write the full article content here..."
                      : activeTab === "fa"
                        ? "محتوای کامل مقاله را اینجا بنویسید..."
                        : "اكتب المحتوى الكامل للمقال هنا..."
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-70 md:w-auto"
          >
            {loading ? "Uploading & Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
}
