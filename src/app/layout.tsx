import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chequealo – Detectá cargos duplicados",
  description:
    "Chequealo analiza tu resumen de tarjeta Galicia y te avisa si hay cargos duplicados o sospechosos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
