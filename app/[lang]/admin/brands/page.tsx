"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

interface Brand {
  id: number;
  slug: string;
  logo_url: string;
  sort_order: number;
}

export default function AdminBrandsPage() {
  const params = useParams<{ lang: string }>();
  const lang = params?.lang || "en";

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/admin/brands");
      const data = await res.json();
      if (data.ok) setBrands(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.ok) {
        setBrands((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert(data.error || "Delete failed.");
      }
    } catch (error) {
      alert("Error deleting brand.");
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

            <h1 className="text-3xl font-bold text-gray-900">Manage Brands</h1>
          </div>

          <Link
            href={`/${lang}/admin/brands/new`}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
          >
            <Plus size={20} />
            Add New Brand
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading brands...
            </div>
          ) : brands.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No brands found. Click "Add New Brand" to create one.
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Logo
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Slug
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-600">
                    Order
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex h-12 w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-100 p-2">
                        <img
                          src={brand.logo_url}
                          alt={brand.slug}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {brand.slug}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {brand.sort_order}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/${lang}/admin/brands/edit/${brand.id}`}
                          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        >
                          <Edit size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(brand.id)}
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
