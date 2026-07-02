import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT
        slug,
        menu_title_en,
        menu_title_fa,
        menu_title_ar,
        meta_title_en,
        meta_title_fa,
        meta_title_ar,
        created_at
      FROM dynamic_pages
      WHERE is_published = true
        AND show_in_menu = true
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return NextResponse.json({
      ok: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("[PUBLIC_PAGES_GET]", error);

    return NextResponse.json(
      { ok: false, error: "Failed to fetch pages" },
      { status: 500 },
    );
  }
}
