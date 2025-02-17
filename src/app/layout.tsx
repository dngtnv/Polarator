import type { Metadata } from "next";
import {
  Poppins,
  Caveat,
  Imperial_Script,
  Shadows_Into_Light,
} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
});

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
});

const shadowIntoLight = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polarator",
  description: "Polaroid Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins} ${caveat} ${imperialScript} ${shadowIntoLight} bg-[#fefff0] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
