import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      INSERT INTO articles (
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
        image_url,
        aspect_ratio,
        published_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, slug_en, slug_fa, slug_ar;
    `;

    const values = [
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
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json(
        {
          error:
            "One of the slugs already exists. Please use unique slugs for English, Persian, and Arabic.",
        },
        { status: 400 },
      );
    }

    console.error("POST /api/admin/articles error:", error);

    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
