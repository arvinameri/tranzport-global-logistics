import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminArticlesListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const { rows: articles } = await pool.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
  );

  async function deleteArticle(formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
      throw new Error("Unauthorized");
    }

    const id = formData.get("id");

    if (id) {
      await pool.query("DELETE FROM articles WHERE id = $1", [id]);
      revalidatePath(`/${lang}/admin/articles`);
      revalidatePath(`/${lang}/case-studies-news`);
      revalidatePath("/", "layout");
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/admin/dashboard`}
              className="rounded-lg border bg-white px-3 py-1.5 text-sm font-medium text-gray-500 shadow-sm hover:text-gray-900"
            >
              &larr; Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-gray-900">
              Manage Articles
            </h1>
          </div>

          <Link
            href={`/${lang}/admin/articles/new`}
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
          >
            + Create New Article
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-24 p-4 text-sm font-semibold text-gray-600">
                  Image
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  English Title / Persian Title / Arabic Title
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Date Published
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="relative h-12 w-16 overflow-hidden rounded shadow-sm">
                      <Image
                        src={article.image_url}
                        alt={article.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="p-4 align-top">
                    <p className="font-bold text-gray-900">
                      {article.title_en}
                    </p>
                    <p className="mt-1 text-sm text-gray-700" dir="rtl">
                      {article.title_fa}
                    </p>
                    <p className="mt-1 text-sm text-gray-700" dir="rtl">
                      {article.title_ar}
                    </p>
                  </td>

                  <td className="p-4 align-top">
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-blue-600">
                      {article.category}
                    </p>
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {article.published_date}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/${lang}/admin/articles/edit/${article.id}`}
                        className="rounded bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>

                      <form action={deleteArticle}>
                        <input type="hidden" name="id" value={article.id} />
                        <button
                          type="submit"
                          className="rounded bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
