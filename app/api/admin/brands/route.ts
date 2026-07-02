import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

// تابع کمکی برای چک کردن دسترسی ادمین
async function checkAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

// GET: دریافت لیست تمام برندها (برای نمایش در دشبورد ادمین و اسلایدر)
export async function GET() {
  try {
    const query = `SELECT * FROM brands ORDER BY sort_order ASC, created_at DESC;`;
    const result = await pool.query(query);
    return NextResponse.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("[BRANDS_GET] Database Error:", error);
    return NextResponse.json(
      { ok: false, error: "خطا در دریافت اطلاعات برندها" },
      { status: 500 },
    );
  }
}

// POST: ایجاد برند جدید توسط ادمین
export async function POST(req: Request) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const {
      slug,
      logo_url,
      sort_order,
      meta_title_en,
      meta_title_fa,
      meta_title_ar,
      meta_desc_en,
      meta_desc_fa,
      meta_desc_ar,
      content_en,
      content_fa,
      content_ar,
    } = body;

    if (!slug || !logo_url) {
      return NextResponse.json(
        { ok: false, error: "Slug and Logo URL are required." },
        { status: 400 },
      );
    }

    const query = `
      INSERT INTO brands (
        slug, logo_url, sort_order,
        meta_title_en, meta_title_fa, meta_title_ar,
        meta_desc_en, meta_desc_fa, meta_desc_ar,
        content_en, content_fa, content_ar
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;

    const values = [
      slug,
      logo_url,
      sort_order || 0,
      meta_title_en,
      meta_title_fa,
      meta_title_ar,
      meta_desc_en,
      meta_desc_fa,
      meta_desc_ar,
      content_en,
      content_fa,
      content_ar,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({ ok: true, data: result.rows[0] });
  } catch (error: any) {
    console.error("[BRANDS_POST] Database Error:", error);

    // مدیریت خطای تکراری بودن Slug
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "این آدرس (Slug) قبلاً استفاده شده است." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "خطای سرور در ثبت برند جدید" },
      { status: 500 },
    );
  }
}
