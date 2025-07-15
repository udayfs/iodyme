import "./globals.css";
import { INTER_FONT } from "@/app/fonts";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${INTER_FONT.className} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
