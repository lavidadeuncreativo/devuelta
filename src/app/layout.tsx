import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeVuelta — Haz que tus clientes regresen",
  description: "Programas de lealtad digitales en Apple Wallet y Google Wallet, sin app propia. Crea recompensas, comparte tu QR y mide resultados.",
  keywords: ["lealtad digital", "loyalty program", "Apple Wallet", "Google Wallet", "programa de recompensas", "negocios locales"],
  openGraph: {
    title: "DeVuelta — Haz que tus clientes regresen",
    description: "Programas de lealtad digitales en Apple Wallet y Google Wallet, sin app propia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
