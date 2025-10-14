import type { Metadata } from "next";
import Header from "./ui/header";
import Providers from "./providers";

import "./globals.css";

export const metadata: Metadata = { title: "App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}