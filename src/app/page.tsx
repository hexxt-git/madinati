import Navigation from "@/components/Navigation";
import Article from "@/components/Article";
import Report from "@/components/Report";

export default function Home() {
    return (
        <>
            <div className="relative flex flex-col items-center justify-center lg:min-h-screen gap-8 p-4 pb-16">
                <Report />
                <div className="lg:w-[80%] mx-auto px-4">
                    <h1 className="text-3xl font-bold text-primary">Madinati Demo</h1>
                </div>
                <Navigation />
            </div>
            <a
                href="/#article"
                className="bg-gray-50 border rounded-full absolute bottom-0 right-0 p-2 m-8 w-8 h-8 flex items-center justify-center shadow-sm hover:bg-primary hover:text-white hover:border-white transition-all">
                v
            </a>
            <hr className="mx-8" />
            <Article />
        </>
    );
}
