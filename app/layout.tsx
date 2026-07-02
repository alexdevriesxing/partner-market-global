import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  redirect(`/${defaultLocale}`);
}
