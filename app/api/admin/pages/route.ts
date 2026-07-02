import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

// این فانکشن دیتابیس شما را بدون نیاز به دخالت دستی ارتقا می‌دهد
async function autoMigrate() {
  try {
    await pool.query(`
      ALTER TABLE dynamic_pages 
      ADD COLUMN IF NOT EXISTS show_in_menu BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS menu_title_en VARCHAR(255) DEFAULT '',
      ADD COLUMN IF NOT EXISTS menu_title_fa VARCHAR(255) DEFAULT '',
      ADD COLUMN IF NOT EXISTS menu_title_ar VARCHAR(255) DEFAULT '';
    `);
  } catch (e) {
    console.log("Migration skipped or already applied.");
  }
}

export async function GET() {
  await autoMigrate();
  try {
    const query = `SELECT id, slug, is_published, show_in_menu, created_at, updated_at FROM dynamic_pages ORDER BY created_at DESC;`;
    const result = await pool.query(query);
    return NextResponse.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("[PAGES_GET] Database Error:", error);
    return NextResponse.json(
      { ok: false, error: "خطا در دریافت لیست صفحات" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  await autoMigrate();
  const isAdmin = await checkAdmin();
  if (!isAdmin)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  try {
    const body = await req.json();
    const {
      slug,
      is_published,
      show_in_menu,
      menu_title_en,
      menu_title_fa,
      menu_title_ar,
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

    if (!slug)
      return NextResponse.json(
        { ok: false, error: "آدرس (Slug) الزامی است." },
        { status: 400 },
      );

    const query = `
      INSERT INTO dynamic_pages (
        slug, is_published, show_in_menu,
        menu_title_en, menu_title_fa, menu_title_ar,
        meta_title_en, meta_title_fa, meta_title_ar,
        meta_desc_en, meta_desc_fa, meta_desc_ar,
        content_en, content_fa, content_ar
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `;

    const values = [
      slug,
      is_published ?? true,
      show_in_menu ?? false,
      menu_title_en || "",
      menu_title_fa || "",
      menu_title_ar || "",
      meta_title_en || "",
      meta_title_fa || "",
      meta_title_ar || "",
      meta_desc_en || "",
      meta_desc_fa || "",
      meta_desc_ar || "",
      content_en || "",
      content_fa || "",
      content_ar || "",
    ];

    const result = await pool.query(query, values);
    return NextResponse.json({ ok: true, data: result.rows[0] });
  } catch (error: any) {
    console.error("[PAGES_POST] Database Error:", error);
    if (error.code === "23505")
      return NextResponse.json(
        { ok: false, error: "این آدرس (Slug) قبلاً استفاده شده است." },
        { status: 409 },
      );
    return NextResponse.json(
      { ok: false, error: "خطای سرور در ثبت صفحه جدید" },
      { status: 500 },
    );
  }
}
