import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kaustav — Portfolio/OS",
  description:
    "Senior UX Designer applying to UK HCI/Design MSc programmes. Enterprise AI, design systems, human-centred research.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${jetbrainsMono.variable} ${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {/* SVG colour-blindness simulation filters — hidden, referenced by AccessibilityContext */}
        <svg aria-hidden style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <defs>
            {/* Protanopia — red-blind */}
            <filter id="cb-protanopia" colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values="
                0.567 0.433 0     0 0
                0.558 0.442 0     0 0
                0     0.242 0.758 0 0
                0     0     0     1 0
              "/>
            </filter>
            {/* Deuteranopia — green-blind */}
            <filter id="cb-deuteranopia" colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values="
                0.625 0.375 0   0 0
                0.7   0.3   0   0 0
                0     0.3   0.7 0 0
                0     0     0   1 0
              "/>
            </filter>
            {/* Tritanopia — blue-blind */}
            <filter id="cb-tritanopia" colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values="
                0.95  0.05  0     0 0
                0     0.433 0.567 0 0
                0     0.475 0.525 0 0
                0     0     0     1 0
              "/>
            </filter>
          </defs>
        </svg>

        <AccessibilityProvider>{children}</AccessibilityProvider>
      </body>
    </html>
  );
}
