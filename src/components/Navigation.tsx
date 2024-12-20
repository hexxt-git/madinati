"use client";

import LocationPicker from "./LocationPicker";
import Map from "./MapCard";
import DirectionsCard from "./DirectionsCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { calculateDirections } from "@/lib/calculateDirections";
import type { Direction } from "@/lib/types";

export default function Navigation() {
    const [departing_location, set_departing_location] = useState("");
    const [arriving_location, set_arriving_location] = useState("");
    const [directions, set_directions] = useState<Direction[]>([]);

    return (
        <div className="flex flex-col items-center justify-center lg:min-h-screen p-4">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_auto] gap-4">
                <Map
                    directions={[
                        ...directions.map((dir) => dir.from_coords),
                        ...(directions.at(-1) ? [directions.at(-1)!.to_coords] : []),
                    ]}
                />
                <div className="space-y-4 h-full">
                    <div className="space-y-2">
                        <LocationPicker
                            location={departing_location}
                            set_location={set_departing_location}
                            label="Departing"
                        />
                        <LocationPicker
                            location={arriving_location}
                            set_location={set_arriving_location}
                            label="Arriving"
                        />
                        <Button
                            onClick={() => {
                                try {
                                    set_directions(
                                        calculateDirections(departing_location, arriving_location)
                                    );
                                } catch (error) {
                                    set_directions([]);
                                }
                            }}
                            className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Find Route
                        </Button>
                    </div>
                    <DirectionsCard directions={directions} />
                </div>
            </div>
        </div>
    );
}
