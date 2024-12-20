"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { stationNames as locations } from "@/lib/places";

type LocationPickerProps = {
    label: string;
    location: string;
    set_location: (location: string) => void;
};

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

    const handleSelect = (location: string) => {
        set_location(location);
        setIsFocused(false);
    };

    return (
        <div className="relative w-full">
            <Input
                type="search"
                placeholder={`Search ${label}...`}
                value={location}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full"
            />
            {isFocused && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md">
                    {filteredLocations.length > 0 ? (
                        <ul className="max-h-80 overflow-y-auto">
                            {filteredLocations.map((l) => (
                                <li
                                    key={l}
                                    className="flex items-center py-2 cursor-pointer hover:bg-gray-100"
                                    onMouseDown={() => handleSelect(l)}>
                                    <Check
                                        className={cn(
                                            "mx-2 h-5 w-5",
                                            location === l ? "opacity-100" : "opacity-0"
                                        )}
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
