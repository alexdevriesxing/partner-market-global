import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { site } from "@/lib/data";
import "../globals.css";
import { Navigation } from "@/components/Navigation";
import { FooterWrapper } from "@/components/FooterWrapper";

export const dynamic = "force-static";
export const metadata: Metadata = {
  metadataBase: new URL(site.url)
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="page-shell">{children}</main>
          <div className="page-shell">
            <FooterWrapper locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
