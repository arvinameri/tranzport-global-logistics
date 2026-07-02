"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ArrowLeft, ExternalLink } from "lucide-react";
import { useParams } from "next/navigation";

interface PageData {
  id: number;
  slug: string;
  is_published: boolean;
  created_at: string;
}

export default function AdminPagesList() {
  const params = useParams<{ lang: string }>();
  const lang = params?.lang || "en";

  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      if (data.ok) setPages(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) {
        setPages((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (error) {
      alert("Error deleting page.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/admin/dashboard`}
              className="rounded-lg bg-white p-2 shadow-sm hover:bg-gray-50"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Dynamic Pages</h1>
          </div>
          <Link
            href={`/${lang}/admin/pages/new`}
            className="flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-amber-700"
          >
            <Plus size={20} /> Add New Page
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading pages...
            </div>
          ) : pages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No pages found. Click "Add New Page".
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-600">
                    URL / Slug
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      /{lang}/{page.slug}
                    </td>
                    <td className="px-6 py-4">
                      {page.is_published ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <a
                          href={`/${lang}/${page.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <Link
                          href={`/${lang}/admin/pages/edit/${page.id}`}
                          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
