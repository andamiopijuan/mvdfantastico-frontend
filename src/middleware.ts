import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});

export const config = {
  matcher: [
    // Match all pathnames except for those starting with:
    // - _next
    // - api
    // - static files (assets with extensions)
    "/((?!_next|api|.*\\..*).*)",
    "/",
  ],
};
