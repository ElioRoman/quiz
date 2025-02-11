import "./globals.css";
import { languages } from "../i18n/settings";
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng}>
      <head />
      <body>{children}</body>
    </html>
  );
}
