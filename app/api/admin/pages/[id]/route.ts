import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

function validateId(id: string) {
  return /^\d+$/.test(id);
}

export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    const { id } = params;
    if (!validateId(id))
      return NextResponse.json(
        { ok: false, error: "Invalid page id." },
        { status: 400 },
      );

    const query = `SELECT * FROM dynamic_pages WHERE id = $1 LIMIT 1;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0)
      return NextResponse.json(
        { ok: false, error: "Page not found." },
        { status: 404 },
      );
    return NextResponse.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("[PAGE_GET_ONE] Database Error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error." },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  try {
    const params = await props.params;
    const { id } = params;
    if (!validateId(id))
      return NextResponse.json(
        { ok: false, error: "Invalid page id." },
        { status: 400 },
      );

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
        { ok: false, error: "Slug is required." },
        { status: 400 },
      );

    const query = `
      UPDATE dynamic_pages
      SET
        slug = $1, is_published = $2, show_in_menu = $3,
        menu_title_en = $4, menu_title_fa = $5, menu_title_ar = $6,
        meta_title_en = $7, meta_title_fa = $8, meta_title_ar = $9,
        meta_desc_en = $10, meta_desc_fa = $11, meta_desc_ar = $12,
        content_en = $13, content_fa = $14, content_ar = $15,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $16
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
      id,
    ];

    const result = await pool.query(query, values);

    if (result.rowCount === 0)
      return NextResponse.json(
        { ok: false, error: "Page not found." },
        { status: 404 },
      );
    return NextResponse.json({ ok: true, data: result.rows[0] });
  } catch (error: any) {
    console.error("[PAGE_PUT] Database Error:", error);
    if (error?.code === "23505")
      return NextResponse.json(
        { ok: false, error: "This slug is already in use." },
        { status: 409 },
      );
    return NextResponse.json(
      { ok: false, error: "Internal Server Error." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );

  try {
    const params = await props.params;
    const { id } = params;
    if (!validateId(id))
      return NextResponse.json(
        { ok: false, error: "Invalid page id." },
        { status: 400 },
      );

    const query = `DELETE FROM dynamic_pages WHERE id = $1 RETURNING id;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0)
      return NextResponse.json(
        { ok: false, error: "Page not found." },
        { status: 404 },
      );
    return NextResponse.json({
      ok: true,
      message: "Page deleted successfully.",
    });
  } catch (error) {
    console.error("[PAGE_DELETE] Database Error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error." },
      { status: 500 },
    );
  }
}
