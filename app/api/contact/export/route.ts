import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

function escapeCsv(value: unknown) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

export async function GET() {
  const cookieStore = await cookies();

  if (!cookieStore.get("admin_session")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const query = `
      SELECT
        id,
        full_name,
        email,
        phone,
        message,
        status,
        terms_accepted,
        created_at
      FROM contact_messages
      ORDER BY created_at DESC;
    `;

    const { rows } = await pool.query(query);

    const header = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Message",
      "Status",
      "Terms Accepted",
      "Created At",
    ];

    const csvRows = rows.map((row) =>
      [
        escapeCsv(row.id),
        escapeCsv(row.full_name),
        escapeCsv(row.email),
        escapeCsv(row.phone),
        escapeCsv(row.message),
        escapeCsv(row.status),
        escapeCsv(row.terms_accepted),
        escapeCsv(new Date(row.created_at).toLocaleString("en-US")),
      ].join(","),
    );

    const csvContent = "\uFEFF" + [header.join(","), ...csvRows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contact-messages.csv"`,
      },
    });
  } catch (error) {
    console.error("[EXPORT_CONTACT_MESSAGES_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
