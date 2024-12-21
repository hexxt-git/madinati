import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const notoColorEmoji = Noto_Color_Emoji({
    variable: "--font-noto-color-emoji",
    subsets: ["emoji"],
    weight: "400",
});

export const metadata: Metadata = {
    title: "Madinati Route Finder Demo - Navigate with Buses, Trains, Tramways, Metros, and On Foot",
    description:
        "Find the best routes using buses, trains, tramways, metros, and on foot with our comprehensive route-finding app.",
    keywords:
        "route finder, navigation, buses, trains, tramways, metros, walking, public transport, path finding",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <head>
                <meta
                    name="description"
                    content="Find the best routes using buses, trains, tramways, metros, and on foot with our comprehensive route-finding app."
                />
                <meta
                    name="keywords"
                    content="route finder, navigation, buses, trains, tramways, metros, walking, public transport, path finding"
                />
                <meta name="author" content="Your Name or Company" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>
                    Route Finder - Navigate with Buses, Trains, Tramways, Metros, and On Foot
                </title>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${notoColorEmoji.variable} antialiased`}>
                {children}
                <Toaster richColors={true} theme="light" position="top-left" />
            </body>
        </html>
    );
}
