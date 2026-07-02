import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit") || "10";

  try {
    let query = "SELECT * FROM articles";
    const values: any[] = [];

    if (category) {
      query += " WHERE category = $1 ORDER BY created_at DESC LIMIT $2";
      values.push(category);
      values.push(parseInt(limit, 10));
    } else {
      query += " ORDER BY created_at DESC LIMIT $1";
      values.push(parseInt(limit, 10));
    }

    const { rows } = await pool.query(query, values);
    return NextResponse.json({ ok: true, data: rows });
  } catch (error) {
    console.error("[GET_ARTICLES_ERROR]", error);
    return NextResponse.json({ ok: false, data: [] }, { status: 500 });
  }
}
