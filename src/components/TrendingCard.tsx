import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    { name: "Hoggar Mountains", rating: "4.8/5", popularity: "High" },
    { name: "Ahaggar National Park", rating: "4.7/5", popularity: "High" },
    { name: "Tassili du Hoggar", rating: "4.8/5", popularity: "High" },
    { name: "Biskra Oasis", rating: "4.5/5", popularity: "Medium" },
    { name: "El Oued City", rating: "4.4/5", popularity: "Medium" },
    { name: "Oran Cathedral", rating: "4.6/5", popularity: "High" },
    { name: "Bejaia Cap Carbon", rating: "4.7/5", popularity: "High" },
    { name: "Constantine Cathedral", rating: "4.5/5", popularity: "Medium" },
    { name: "Timimoun Red Oasis", rating: "4.8/5", popularity: "High" },
    { name: "Annaba Port", rating: "4.4/5", popularity: "Medium" },
    { name: "Mansourah Mosque", rating: "4.6/5", popularity: "High" },
    { name: "Tiddis Roman Ruins", rating: "4.5/5", popularity: "Medium" },
    { name: "Cherchell Roman Ruins", rating: "4.7/5", popularity: "High" },
    { name: "Tamanrasset", rating: "4.8/5", popularity: "High" },
    { name: "Djanet Oasis", rating: "4.9/5", popularity: "Very High" },
    { name: "Assekrem", rating: "4.8/5", popularity: "High" },
    { name: "Algiers Bay", rating: "4.7/5", popularity: "Very High" },
    { name: "Ghoufi Balconies", rating: "4.6/5", popularity: "High" },
    { name: "Djurdjura National Park", rating: "4.7/5", popularity: "High" },
    { name: "El Kantara Gorges", rating: "4.5/5", popularity: "Medium" },
    { name: "Moulay Ismail Palace", rating: "4.8/5", popularity: "High" },
    { name: "Beni Abbes Oasis", rating: "4.6/5", popularity: "Medium" },
    { name: "Royal Mausoleum of Mauretania", rating: "4.6/5", popularity: "Medium" },
    { name: "Algiers Olympic Stadium", rating: "4.5/5", popularity: "High" },
    { name: "Palace of Raïs", rating: "4.4/5", popularity: "Medium" },
    { name: "Place des Martyrs", rating: "4.6/5", popularity: "High" },
    { name: "Ketchaoua Mosque", rating: "4.7/5", popularity: "High" },
    { name: "Chrea National Park", rating: "4.5/5", popularity: "Medium" },
    { name: "Tassili Rock Art", rating: "4.8/5", popularity: "Very High" },
    { name: "Botanical Garden of Hamma", rating: "4.6/5", popularity: "High" },
    { name: "Bardo National Museum", rating: "4.5/5", popularity: "High" },
];

const places = allPlaces.sort(() => 0.5 - Math.random()).slice(0, 15);
export default function TrendingCard({
    set_destination_location,
}: {
    set_destination_location: (location: string) => void;
}) {
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
                            onClick={() => set_destination_location(place.name)}
                            key={index}
                            className="grid grid-cols-[6fr_2fr_2fr] gap-x-4 gap-y-2 border-b py-2 last:border-b-0 items-center text-start cursor-pointer hover:bg-gray-100 px-1">
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
