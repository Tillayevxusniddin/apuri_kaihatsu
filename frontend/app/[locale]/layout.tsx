import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/contexts/theme-provider";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {SessionProvider} from "next-auth/react";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import {Toaster} from "@/components/ui/toaster";
import {auth} from "@/auth";
import {SidebarProvider} from "@/components/ui/sidebar";


const inter = Inter({subsets: ["latin", "cyrillic"]});

export async function generateMetadata() {
  const session = await auth();
  let metadata: Metadata = {
    title: {
      default: "Create Next App",
      template: "%s | Create Next App",
    },
    description: "Generated by create next app",
  };
  if (session) {
    metadata.title = session?.schoolName;
  }
  return metadata;
}

export default async function RootLayout({
                                           children,
                                           params: {locale},
                                         }: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
    <body className={inter.className}>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <ReactQueryProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </ThemeProvider>
      <Toaster/>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
