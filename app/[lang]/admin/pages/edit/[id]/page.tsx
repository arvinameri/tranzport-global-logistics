import PageForm from "@/components/admin/PageForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import pool from "@/lib/db";

// خواندن اطلاعات صفحه در سمت سرور
async function getPageData(id: string) {
  try {
    const query = `SELECT * FROM dynamic_pages WHERE id = $1 LIMIT 1;`;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) return null;
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export default async function EditPage(props: {
  params: Promise<{ lang: string; id: string }>;
}) {
  // Await کردن params
  const params = await props.params;
  const lang = params.lang || "en";
  const id = params.id;

  const pageData = await getPageData(id);

  if (!pageData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-6">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">صفحه یافت نشد</h1>
          <p className="mt-2 text-sm text-gray-500">
            صفحه درخواستی وجود ندارد یا حذف شده است.
          </p>
          <Link
            href={`/${lang}/admin/pages`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-700"
          >
            <ArrowLeft size={16} className="transform rotate-180" />
            بازگشت به صفحات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageForm mode="edit" lang={lang} pageId={id} initialData={pageData} />
  );
}
