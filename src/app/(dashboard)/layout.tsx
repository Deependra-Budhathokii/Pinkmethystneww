"use client";
import "../globals.css";
import { Playfair_Display, Nunito_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import Providers from "@/components/providers/query-provider";

const PlayfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <html
      lang="en"
      className={`${PlayfairDisplay.variable} ${NunitoSans.variable}`}
    >
      <body>
        <Providers>
          <div className="container">
            {!isLoginPage && <Topbar />}
            {!isLoginPage && (
              <>
                <div className="flex gap-2 md:gap-4 pt-4">
                  <div className="w-1/6 md:w-[242px] p-1 md:px-3">
                    <Sidebar />
                  </div>
                  <div className="px-4 pt-6 bg-[#FFF9FE] overflow-y-auto h-[90vh] w-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    {children}
                  </div>
                </div>
              </>
            )}
          </div>
          {isLoginPage && <>{children}</>}
        </Providers>
      </body>
    </html>
  );
}
