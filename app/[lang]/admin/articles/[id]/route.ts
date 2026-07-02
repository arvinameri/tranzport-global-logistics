import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> },
) {
  const cookieStore = await cookies();

  if (!cookieStore.get("admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { rows } = await pool.query("SELECT * FROM articles WHERE id = $1", [
      id,
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: rows[0] });
  } catch (error) {
    console.error("GET article by id error:", error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; lang: string }> },
) {
  const cookieStore = await cookies();

  if (!cookieStore.get("admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();

    const {
      slug_en,
      slug_fa,
      slug_ar,
      title_en,
      title_fa,
      title_ar,
      content_en,
      content_fa,
      content_ar,
      category,
      imageUrl,
      aspectRatio,
      publishedDate,
    } = body;

    if (
      !slug_en?.trim() ||
      !slug_fa?.trim() ||
      !slug_ar?.trim() ||
      !title_en?.trim() ||
      !title_fa?.trim() ||
      !title_ar?.trim() ||
      !content_en?.trim() ||
      !content_fa?.trim() ||
      !content_ar?.trim() ||
      !category?.trim() ||
      !imageUrl?.trim() ||
      !aspectRatio?.trim() ||
      !publishedDate?.trim()
    ) {
      return NextResponse.json(
        { error: "All language fields are required." },
        { status: 400 },
      );
    }

    const query = `
      UPDATE articles
      SET
        slug_en = $1,
        slug_fa = $2,
        slug_ar = $3,
        title_en = $4,
        title_fa = $5,
        title_ar = $6,
        content_en = $7,
        content_fa = $8,
        content_ar = $9,
        category = $10,
        image_url = $11,
        aspect_ratio = $12,
        published_date = $13
      WHERE id = $14
    `;

    await pool.query(query, [
      slug_en.trim(),
      slug_fa.trim(),
      slug_ar.trim(),
      title_en.trim(),
      title_fa.trim(),
      title_ar.trim(),
      content_en.trim(),
      content_fa.trim(),
      content_ar.trim(),
      category.trim(),
      imageUrl.trim(),
      aspectRatio.trim(),
      publishedDate.trim(),
      id,
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "One of the slugs already exists." },
        { status: 400 },
      );
    }

    console.error("PUT article by id error:", error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
