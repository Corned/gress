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
        <nav className="mb-20 flex gap-2 items-center h-16 rounded-lg bg-white p-2 pl-8 backdrop-blur-2xl shadow">

          <p className="text-2xl font-bold">gress</p>

          <div className="flex-grow"></div>


          <div className="flex flex-row items-center rounded px-2 gap-1 h-full cursor-pointer hover:bg-gray-300 transition">
            <p className="select-none font-semibold">Username#12345</p>
          </div>
          <img src="/assets/icon.png" alt="icon" className="h-full aspect-square rounded" />
        </nav>

        {children}
      </body>
    </html>
  );
}
