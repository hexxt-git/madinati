import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TrendingCard() {
    const allPlaces = [
        { name: "Grande Poste d'Alger", rating: "4.5/5", popularity: "High" },
        { name: "Casbah of Algiers", rating: "4.8/5", popularity: "Very High" },
        { name: "Notre Dame d'Afrique", rating: "4.3/5", popularity: "Medium" },
        { name: "Jardin d'Essai du Hamma", rating: "4.6/5", popularity: "High" },
        { name: "Bab El Oued", rating: "4.2/5", popularity: "Medium" },
        { name: "Timgad Ruins", rating: "4.9/5", popularity: "Very High" },
        { name: "Tassili n'Ajjer", rating: "4.7/5", popularity: "High" },
        { name: "Djemila", rating: "4.8/5", popularity: "High" },
        { name: "Tipasa", rating: "4.5/5", popularity: "High" },
        { name: "Constantine Bridges", rating: "4.6/5", popularity: "High" },
        { name: "Sidi M'Cid Bridge", rating: "4.4/5", popularity: "Medium" },
        { name: "Basilique Saint Augustin", rating: "4.7/5", popularity: "High" },
        { name: "Tlemcen Great Mosque", rating: "4.8/5", popularity: "High" },
        { name: "Emir Abdelkader Mosque", rating: "4.6/5", popularity: "High" },
        { name: "El Kala National Park", rating: "4.5/5", popularity: "Medium" },
        { name: "Gouraya National Park", rating: "4.7/5", popularity: "High" },
        { name: "Sétif Ain El Fouara", rating: "4.3/5", popularity: "Medium" },
        { name: "Ghardaïa M'Zab Valley", rating: "4.9/5", popularity: "Very High" },
        { name: "Oran Santa Cruz Fort", rating: "4.6/5", popularity: "High" },
        { name: "Beni Hammad Fort", rating: "4.5/5", popularity: "Medium" },
    ];

    const places = allPlaces.sort(() => 0.5 - Math.random()).slice(0, 5);

    return (
        <Card className="shadow-md lg:w-[500px]">
            <CardHeader>
                <CardTitle>Popular Places ⭐</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[6fr_2fr_2fr] gap-x-4 gap-y-2 font-bold border-b pb-2 items-center px-4">
                    <div className="break-words">Place</div>
                    <div className="break-words">Rating</div>
                    <div className="break-words text-center">Popularity</div>
                </div>
                <div className="overflow-auto pb-4 pe-4 lg:max-h-[500px] border-b">
                    {places.map((place, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[6fr_2fr_2fr] gap-x-4 gap-y-2 border-b py-2 last:border-b-0 items-center">
                            <div className="break-words">{place.name}</div>
                            <div className="break-words ps-2">{place.rating}</div>
                            <div className="break-words text-center">{place.popularity}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
