import { NextResponse } from "next/server";
import pool from "@/lib/db";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return;
  }

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${errorText}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message, termsAccepted } = body ?? {};

    const safeFullName = typeof fullName === "string" ? fullName.trim() : "";
    const safeEmail = typeof email === "string" ? email.trim() : "";
    const safePhone = typeof phone === "string" ? phone.trim() : "";
    const safeMessage = typeof message === "string" ? message.trim() : "";

    if (!safeFullName || !safeEmail || !safeMessage || termsAccepted !== true) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields or terms not accepted." },
        { status: 400 },
      );
    }

    const query = `
      INSERT INTO contact_messages (
        full_name,
        email,
        phone,
        message,
        terms_accepted
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;

    const values = [
      safeFullName,
      safeEmail,
      safePhone || null,
      safeMessage,
      true,
    ];

    const result = await pool.query(query, values);
    const savedMessage = result.rows[0];

    const telegramText = [
      `🔔 <b>New Contact Form Submission</b>`,
      ``,
      `🆔 <b>ID:</b> ${savedMessage.id}`,
      `👤 <b>Full Name:</b> ${escapeHtml(safeFullName)}`,
      `✉️ <b>Email:</b> ${escapeHtml(safeEmail)}`,
      `📞 <b>Phone:</b> ${escapeHtml(safePhone || "Not provided")}`,
      `🕒 <b>Created At:</b> ${new Date(savedMessage.created_at).toLocaleString("en-US")}`,
      ``,
      `💬 <b>Message:</b>`,
      `${escapeHtml(safeMessage)}`,
    ].join("\n");

    try {
      await sendTelegramMessage(telegramText);
    } catch (telegramError) {
      console.error("[contact] Telegram Error:", telegramError);
    }

    return NextResponse.json({
      ok: true,
      message: "Contact form submitted successfully.",
    });
  } catch (error) {
    console.error("[contact] Database Error:", error);

    return NextResponse.json(
      { ok: false, error: "Internal Server Error." },
      { status: 500 },
    );
  }
}
