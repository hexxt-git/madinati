"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, LocateFixed } from "lucide-react";
import { cn } from "@/lib/utils";
import { stationNames as locations, stations } from "@/lib/places";
import { Button } from "./ui/button";
import { toast } from "sonner";

type LocationPickerProps = {
    label: string;
    location: string;
    set_location: (location: string) => void;
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadius = 6371e3; 
    const lat1Radians = (lat1 * Math.PI) / 180;
    const lat2Radians = (lat2 * Math.PI) / 180;
    const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function LocationPicker({ location, set_location, label }: LocationPickerProps) {
    const [filteredLocations, setFilteredLocations] = useState(locations);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        set_location(inputValue);
        setFilteredLocations(
            locations.filter((loc) =>
                loc
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f|\s]/g, "")
                    .includes(
                        inputValue
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f|\s]/g, "")
                    )
            )
        );
    };

    const handleSelect = (loc: string) => {
        set_location(loc);
        setIsFocused(false);
    };

    const handleFindClosestStation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                let minDist = Infinity;
                let closest = stations[0];

                stations.forEach((st) => {
                    const dist = getDistance(latitude, longitude, st.coordinates.lat, st.coordinates.lon);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = st;
                    }
                });

                if (minDist > 2000) {
                    set_location("out of range");
                    toast.error("out of range");
                } else {
                    set_location(closest.name);
                }
            },
            (err) => toast.error('Unable to get GPS information, check your browser permissions'),
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="relative w-full">
            <div className="grid grid-cols-[1fr_auto] gap-1">
                <Input
                    type="search"
                    placeholder={`Search ${label}...`}
                    value={location}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full"
                />
                <Button variant="secondary" onClick={handleFindClosestStation}>
                    <LocateFixed className="m-1" />
                </Button>
            </div>
            {isFocused && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md">
                    {filteredLocations.length > 0 ? (
                        <ul className="max-h-80 overflow-y-auto">
                            {filteredLocations.map((l) => (
                                <li
                                    key={l}
                                    className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
                                    onMouseDown={() => handleSelect(l)}
                                >
                                    <Check
                                        className={cn("mx-2 h-5 w-5", location === l ? "opacity-100" : "opacity-0")}
                                    />
                                    {l}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-2">No location found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
