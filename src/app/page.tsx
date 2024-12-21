"use client";

import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });
const Article = dynamic(() => import("@/components/Article"), { ssr: false });
const Report = dynamic(() => import("@/components/Report"), { ssr: false });

export default function Home() {
    return (
        <>
            <Report />
            <div className="relative flex flex-col items-center justify-center lg:min-h-screen gap-8 p-4 pb-16">
                <div className="lg:w-[80%] mx-auto px-4 mt-6">
                    <h1 className="text-3xl font-bold text-primary drop-shadow-sm">Madinati Demo 🤖</h1>
                </div>
                <a
                    href="/#article"
                    className="absolute bottom-6 right-8 items-center justify-center shadow-sm transition-all hidden md:flex text-3xl hover:scale-125 hover:-translate-y-2 hover:rotate-12">
                    ⬇️
                </a>
                <Navigation />
            </div>
            <hr className="mx-8" />
            <Article />
        </>
    );
}
