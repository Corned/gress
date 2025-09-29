import type { Metadata } from "next";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "Gress",
  description: "Gress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased p-10 min-h-screen mx-auto max-w-[1000px]`}
      >
        <nav className="mb-20 flex gap-3 items-center justify-end h-16 rounded-lg bg-white p-2 backdrop-blur-2xl shadow">

          <img src="/assets/icon.png" alt="icon" className="h-full aspect-square rounded" />
        </nav>

        {children}
      </body>
    </html>
  );
}
