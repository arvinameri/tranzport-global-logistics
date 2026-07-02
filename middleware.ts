import { i18nRouter } from "next-i18n-router";
// وارد کردن متغیرها به‌صورت Named Export از فایل تنظیماتی که ساختیم
import { locales, defaultLocale } from "./i18nConfig";
import { NextResponse, NextRequest } from "next/server";

// ساختن آبجکت کانفیگ برای next-i18n-router
const i18nConfigParams = {
  locales,
  defaultLocale,
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ۱. بررسی اینکه آیا کاربر می‌خواهد وارد بخش ادمین شود یا خیر (به جز صفحه لاگین)
  const isAdminRoute =
    pathname.includes("/admin") && !pathname.includes("/admin/login");

  if (isAdminRoute) {
    // ۲. خواندن کوکی احراز هویت ادمین
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession) {
      // ۳. اگر کوکی وجود نداشت، ریدایرکت به لاگین
      // گرفتن زبان جاری یا استفاده از پیش‌فرض
      const currentLocale = pathname.split("/")[1] || defaultLocale || "en";

      const url = request.nextUrl.clone();
      url.pathname = `/${currentLocale}/admin/login`;

      return NextResponse.redirect(url);
    }
  }

  // ۴. سپردن ادامه‌ی مسیر به روتر چندزبانه (i18n)
  return i18nRouter(request, i18nConfigParams);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
