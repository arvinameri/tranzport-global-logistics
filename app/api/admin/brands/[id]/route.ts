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

    if (!validateId(id)) {
      return NextResponse.json(
        { ok: false, error: "Invalid brand id." },
        { status: 400 },
      );
    }

    const query = `SELECT * FROM brands WHERE id = $1 LIMIT 1;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Brand not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("[BRANDS_GET_ONE] Database Error:", error);
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

  if (!isAdmin) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const params = await props.params;
    const { id } = params;

    if (!validateId(id)) {
      return NextResponse.json(
        { ok: false, error: "Invalid brand id." },
        { status: 400 },
      );
    }

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
    } = body ?? {};

    if (!slug || !logo_url) {
      return NextResponse.json(
        { ok: false, error: "Slug and logo_url are required." },
        { status: 400 },
      );
    }

    const query = `
      UPDATE brands
      SET
        slug = $1, logo_url = $2, sort_order = $3,
        meta_title_en = $4, meta_title_fa = $5, meta_title_ar = $6,
        meta_desc_en = $7, meta_desc_fa = $8, meta_desc_ar = $9,
        content_en = $10, content_fa = $11, content_ar = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $13
      RETURNING *;
    `;

    const values = [
      slug,
      logo_url,
      Number(sort_order || 0),
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

    if (result.rowCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Brand not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, data: result.rows[0] });
  } catch (error: any) {
    console.error("[BRANDS_PUT] Database Error:", error);
    if (error?.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "This slug is already in use." },
        { status: 409 },
      );
    }
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

  if (!isAdmin) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const params = await props.params;
    const { id } = params;

    if (!validateId(id)) {
      return NextResponse.json(
        { ok: false, error: "Invalid brand id." },
        { status: 400 },
      );
    }

    const query = `DELETE FROM brands WHERE id = $1 RETURNING id;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Brand not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Brand deleted successfully.",
    });
  } catch (error) {
    console.error("[BRANDS_DELETE] Database Error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error." },
      { status: 500 },
    );
  }
}
