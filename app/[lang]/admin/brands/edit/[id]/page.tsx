import BrandForm from "@/components/admin/BrandForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import pool from "@/lib/db";

// خواندن اطلاعات در سمت سرور برای جلوگیری از باگ‌های کلاینت
async function getBrandData(id: string) {
  try {
    const query = `SELECT * FROM brands WHERE id = $1 LIMIT 1;`;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
}

export default async function EditBrandPage(props: {
  params: Promise<{ lang: string; id: string }>;
}) {
  // در Next.js جدید params باید await شود
  const params = await props.params;
  const lang = params.lang || "en";
  const id = params.id;

  const brand = await getBrandData(id);

  if (!brand) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-6">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">برند یافت نشد</h1>
          <p className="mt-2 text-sm text-gray-500">
            برند مورد نظر در سیستم وجود ندارد یا حذف شده است.
          </p>
          <Link
            href={`/${lang}/admin/brands`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
          >
            <ArrowLeft size={16} className="transform rotate-180" />
            بازگشت به لیست برندها
          </Link>
        </div>
      </div>
    );
  }

  return <BrandForm mode="edit" lang={lang} brandId={id} initialData={brand} />;
}
