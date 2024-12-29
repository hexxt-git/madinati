export default function Article() {
    return (
        <div className="min-h-screen">
            <div
                className="prose lg:w-[80%] max-w-[1500px] mx-auto py-12 p-4 custom-prose"
                id="article">
                <h1 className="text-primary capitalize">
                    Welcome to The Madinati Route Finder Demo
                </h1>
                <h3 className="mt-0 mb-2">
                    An application <span className="px-2">📲</span> developed to address a
                    real-world problem <span className="px-2">🌍</span> by
                    <a href="/#team" className="!text-foreground">
                        Team Hartaka
                    </a>
                    <span className="px-2">🗣️</span>
                </h3>
                <p>
                    Madinati transforms the way you navigate Algerian cities through an intelligent
                    urban transport platform. By seamlessly integrating various public transport
                    options, we make city exploration and daily commuting effortless and efficient.
                    Whether you're a tourist discovering Algeria's rich cultural heritage or a local
                    planning your daily route, our platform ensures a smooth journey through the
                    urban landscape.
                </p>
                <h3 className="mt-0 mb-2">
                    The Spark Behind Madinati <span className="px-2">🧭</span>
                </h3>
                <p>
                    Our journey began at the prestigious "Boumerdes Smart City" Hackathon 2024,
                    where a personal challenge became our mission. While attempting to reach the
                    event venue, we faced the common struggles of public transport navigation:
                    unreliable schedules, unclear routes, and outdated information. Existing
                    solutions like Google Maps fell short in our local context, inspiring us to
                    create a solution tailored for Algeria's unique urban landscape. We envisioned a
                    platform that would enable the user to go from point A to point B without the
                    stress of planning, asking for directions, or waiting for the next bus. The
                    application had to provide real-time updates, personalized routes based on user
                    preferences, and a seamless experience for both locals and tourists.
                </p>
                <h3 className="mt-0 mb-2">
                    Technical Innovation <span className="px-2">🧠</span>
                </h3>
                <p>
                    At the heart of Madinati lies a sophisticated pathfinding system, powered by our
                    custom version of the Dijkstra algorithm. This system processes comprehensive
                    data from Algiers' integrated transport network, including buses, metro lines,
                    trams, and telepheriques. Our solution adapts to real-time conditions, ensuring
                    you always have the most efficient route at your fingertips.
                </p>
                <p>
                    Through dynamic route calculations and crowdsourced traffic updates, Madinati
                    offers personalized journey options that consider your preferences and current
                    conditions. Whether you're a daily commuter or a tourist exploring the city's
                    treasures, Madinati stands as your reliable urban navigation companion, making
                    every journey smoother and more predictable.
                </p>
                <h2>Open Source 😼</h2>
                <p>
                    Discover the source code and become a contributor to the project on GitHub. Your
                    feedback and contributions are invaluable!{" "}
                    <a href="https://github.com/hexxt-git/madinati">
                        github.com/hexxt-git/madinati
                    </a>
                </p>
            </div>
        </div>
    );
}
