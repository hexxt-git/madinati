"use client";

import LocationPicker from "./LocationPicker";
import Map from "./MapCard";
import DirectionsCard from "./DirectionsCard";
import TrendingCard from "./TrendingCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { calculateDirections } from "@/lib/calculateDirections";
import type { Direction } from "@/components/schemas/calculations";
import { toast } from "sonner";
import Options from "./Options";

export default function Navigation() {
    const [departing_location, set_departing_location] = useState("");
    const [destination_location, set_destination_location] = useState("");
    const [directions, set_directions] = useState<Direction[]>([]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-4">
            <Map directions={directions} />
            <div className="space-y-4 h-full grid grid-rows-[auto_1fr]">
                <div className="space-y-2">
                    <LocationPicker
                        location={departing_location}
                        set_location={set_departing_location}
                        label="Departing"
                    />
                    <LocationPicker
                        location={destination_location}
                        set_location={set_destination_location}
                        label="Destination"
                    />
                    <Button
                        onClick={() => {
                            try {
                                set_directions(
                                    calculateDirections(departing_location, destination_location)
                                );
                            } catch (error) {
                                toast.error("No viable path found");
                                set_directions([]);
                            }
                        }}
                        className="w-full">
                        <span className="text-lg -m-s-6">🔎</span> Find Route
                    </Button>
                </div>
                {directions.length ? (
                    <DirectionsCard directions={directions} />
                ) : (
                    <TrendingCard set_destination_location={set_destination_location} />
                )}
            </div>
            <Options />
        </div>
    );
}
