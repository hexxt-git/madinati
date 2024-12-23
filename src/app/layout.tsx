import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
                <link
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@400&family=Geist+Mono:wght@400&family=Twemoji:wght@400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body
                className="antialiased"
                style={{ fontFamily: "'Geist', 'Geist Mono', 'Noto', sans-serif" }}>
                {children}
                <Toaster richColors={true} theme="light" position="top-left" />
            </body>
        </html>
    );
}
