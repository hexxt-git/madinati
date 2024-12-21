export default function Article() {
    return (
        <div
            className="prose lg:w-[80%] max-w-[1500px] mx-auto py-12 p-4 custom-prose min-h-screen"
            id="article">
            <h1 className="text-primary capitalize">Welcome to The Madinati Route finder Demo</h1>
            <h2>
                An application 📲 made for a real world 🌍 need by
                <a href="/#team" className="!text-foreground">
                    Team Hartaka
                </a>
                🗣️
            </h2>
            <p>
                Madinati is an urban navigation application that helps users find the best public transport routes in Algeria
            </p>
        </div>
    );
}
