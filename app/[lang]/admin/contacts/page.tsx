import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const cookieStore = await cookies();

  if (!cookieStore.get("admin_session")) {
    throw new Error("Unauthorized");
  }

  const { rows: messages } = await pool.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
  );

  const unreadCount = messages.filter((msg) => msg.status === "UNREAD").length;
  const readCount = messages.filter((msg) => msg.status === "READ").length;

  async function deleteMessage(formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
      throw new Error("Unauthorized");
    }

    const id = formData.get("id");

    if (id) {
      await pool.query("DELETE FROM contact_messages WHERE id = $1", [id]);
      revalidatePath("/fa/admin/contact");
      revalidatePath("/en/admin/contact");
      revalidatePath("/ar/admin/contact");
    }
  }

  async function toggleStatus(formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
      throw new Error("Unauthorized");
    }

    const id = formData.get("id");
    const currentStatus = formData.get("currentStatus");

    if (id && currentStatus) {
      const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";

      await pool.query(
        "UPDATE contact_messages SET status = $1 WHERE id = $2",
        [newStatus, id],
      );

      revalidatePath("/fa/admin/contact");
      revalidatePath("/en/admin/contact");
      revalidatePath("/ar/admin/contact");
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/en/admin/dashboard"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-gray-300 hover:text-gray-900"
            >
              &larr; Dashboard
            </Link>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage all contact form submissions in one place.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/api/admin/contact/export"
              className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              Download XLSX
            </a>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Submissions
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {messages.length}
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-amber-700">Unread</p>
            <p className="mt-2 text-3xl font-bold text-amber-800">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-green-700">Read</p>
            <p className="mt-2 text-3xl font-bold text-green-800">
              {readCount}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Client Details
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Message & Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`align-top transition-colors ${
                      msg.status === "UNREAD"
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50/60 hover:bg-gray-100/70"
                    }`}
                  >
                    <td className="p-4">
                      <span
                        className={`inline-flex w-max items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                          msg.status === "UNREAD"
                            ? "border border-amber-200 bg-amber-100 text-amber-700"
                            : "border border-green-200 bg-green-100 text-green-700"
                        }`}
                      >
                        {msg.status === "UNREAD" ? "● UNREAD" : "✓ READ"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <div className="mt-1 text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="text-base font-bold text-gray-900">
                        {msg.full_name}
                      </p>

                      <a
                        href={`mailto:${msg.email}`}
                        className="mt-1 block text-sm font-medium text-blue-600 hover:underline"
                      >
                        {msg.email}
                      </a>

                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          className="mt-2 block text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                          Tel: {msg.phone}
                        </a>
                      )}
                    </td>

                    <td className="p-4 text-sm text-gray-700">
                      <details className="group">
                        <summary className="mb-2 cursor-pointer list-none font-medium text-blue-600 outline-none transition hover:text-blue-800">
                          View Full Message
                        </summary>

                        <div className="mt-2 rounded-xl border border-gray-200 bg-white p-5 text-base leading-relaxed text-gray-800 shadow-sm">
                          <div className="whitespace-pre-wrap">
                            {msg.message}
                          </div>

                          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 pt-4">
                            <form action={toggleStatus}>
                              <input type="hidden" name="id" value={msg.id} />
                              <input
                                type="hidden"
                                name="currentStatus"
                                value={msg.status}
                              />
                              <button
                                type="submit"
                                className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100"
                              >
                                {msg.status === "UNREAD"
                                  ? "Mark as Read"
                                  : "Mark as Unread"}
                              </button>
                            </form>

                            <form action={deleteMessage}>
                              <input type="hidden" name="id" value={msg.id} />
                              <button
                                type="submit"
                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
                              >
                                Delete Message
                              </button>
                            </form>
                          </div>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}

                {messages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>

                      <h3 className="text-lg font-medium text-gray-900">
                        Inbox is empty
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        No messages have been received yet.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
