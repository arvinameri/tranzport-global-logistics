import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // بررسی دسترسی ادمین
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // نام یونیک برای جلوگیری از تداخل اسم عکس‌ها
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + "-" + file.name.replace(/\s+/g, "-");

    // مسیر ذخیره در پوشه public
    const uploadDir = path.join(process.cwd(), "public/assets/images/uploads");

    // اگر پوشه وجود نداشت ساخته شود
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // نادیده گرفتن خطا اگر پوشه موجود بود
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // برگرداندن مسیر عمومی عکس برای دیتابیس
    const publicUrl = `/assets/images/uploads/${filename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
