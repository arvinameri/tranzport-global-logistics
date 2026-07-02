import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  // ۱. بررسی امنیت (فقط ادمین لاگین شده بتواند دانلود کند)
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // ۲. خواندن داده‌ها از دیتابیس (مرتب شده از جدید به قدیم)
    const query = `
      SELECT id, full_name, email, phone, message, created_at 
      FROM contact_messages 
      ORDER BY created_at DESC;
    `;
    const { rows } = await pool.query(query);

    // ۳. ساخت فایل CSV با پشتیبانی از فارسی (UTF-8 BOM)
    const BOM = "\uFEFF";
    const csvHeader = "ID,Full Name,Email,Phone,Message,Date\n";

    const csvRows = rows
      .map((row) => {
        // پاکسازی متن پیام‌ها برای جلوگیری از بهم ریختن اکسل (مدیریت اینترها و نقل‌قول‌ها)
        const cleanMessage = row.message
          ? row.message.replace(/"/g, '""').replace(/\n/g, " ")
          : "";

        // فرمت‌بندی تاریخ
        const date = new Date(row.created_at).toLocaleString("fa-IR");

        return `${row.id},"${row.full_name}","${row.email}","${row.phone || ""}","${cleanMessage}","${date}"`;
      })
      .join("\n");

    const csvContent = BOM + csvHeader + csvRows;

    // ۴. ارسال فایل به مرورگر برای دانلود
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="tranzport_contacts.csv"',
      },
    });
  } catch (error) {
    console.error("[EXPORT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
