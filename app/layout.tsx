import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "PalancaCode",
  description: "GenAI, MLOps e programação — por PalancaCode.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark">
      <body>
        <div className="container">
          <nav className="nav">
            <Link className="brand" href="/">PalancaCode</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/videos">Vídeos</Link>
            <a href="https://www.youtube.com/@palancacode1940" target="_blank">YouTube</a>
            <a href="https://github.com/" target="_blank">GitHub</a>
          </nav>
          {children}
          <footer className="footer">
            © {new Date().getFullYear()} PalancaCode — feito com Next.js + Tailwind.
          </footer>
        </div>
      </body>
    </html>
  );
}
