import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/provider/session-provider";
import { getServerSession } from "next-auth";
import AnimatePresence from "@/components/animation/animate-presence";
import options from "@/lib/auth/option";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import ModalProvider from "@/components/provider/modal-provider";
import SocketProvider from "@/components/provider/socket-provider";
import QueryProvider from "@/components/provider/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description: "Discord Clone by Brandon Rafael Lovelyno",
  icons: {
    icon: ["/icon/favicon.ico?v=4"],
    apple: ["/icon/apple-touch-icon.png?v=4"],
    shortcut: ["/icon/apple-touch-icon.png"],
  },
  manifest: "/icon/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <SessionProvider session={session}>
        <body
          className={cn(
            inter.className,
            "dark:bg-slate-900 bg-white",
            "flex flex-col"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <AnimatePresence>
              {/* <ThemeToggler /> */}
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  className: "",
                  duration: 5000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                }}
              />
              <main className="relative w-full h-screen overflow-hidden">
                <SocketProvider>
                  <ModalProvider />
                  <QueryProvider>{children}</QueryProvider>
                </SocketProvider>
              </main>
            </AnimatePresence>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
