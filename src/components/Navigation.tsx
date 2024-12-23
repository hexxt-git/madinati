"use client";

import { useState } from "react";
import { toast } from "sonner";
import LocationPicker from "./LocationPicker";
import Map from "./MapCard";
import DirectionsCard from "./DirectionsCard";
import HistoryCard from "./HistoryCard";
import Options from "./Options";
import { Button } from "@/components/ui/button";
import { calculateDirections } from "@/lib/calculateDirections";
import type { Direction } from "@/lib/schemas/calculations";
import { HistoryEntry } from "@/lib/schemas/history";

function updateLocationHistory(
    departingLocation: string,
    destinationLocation: string,
    setHistory: (history: HistoryEntry[]) => void
) {
    const storageKey = "history";
    const entry = {
        from: departingLocation,
        to: destinationLocation,
        time: new Date().toISOString(),
    };
    try {
        const stored = localStorage.getItem(storageKey);
        const history = stored ? JSON.parse(stored) : [];
        localStorage.setItem(storageKey, JSON.stringify([entry, ...history]));
        setHistory([entry, ...history]);
    } catch {
        localStorage.setItem(storageKey, JSON.stringify([entry]));
        setHistory([entry]);
    }
}

export default function Navigation() {
    const [departingLocation, setDepartingLocation] = useState("");
    const [destinationLocation, setDestinationLocation] = useState("");
    const [directions, setDirections] = useState<Direction[]>([]);
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    function findRoute() {
        if (!departingLocation || !destinationLocation) {
            toast.error("Please select both departing and destination locations");
            return;
        }
        updateLocationHistory(departingLocation, destinationLocation, setHistory);
        try {
            setDirections(calculateDirections(departingLocation, destinationLocation));
        } catch {
            toast.error("No viable path found");
            setDirections([]);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-4">
            <Map directions={directions} />
            <div className="space-y-4 h-full grid grid-rows-[auto_1fr]">
                <div className="space-y-2">
                    <LocationPicker
                        location={departingLocation}
                        set_location={setDepartingLocation}
                        label="Departing"
                    />
                    <LocationPicker
                        location={destinationLocation}
                        set_location={setDestinationLocation}
                        label="Destination"
                    />
                    <Button onClick={findRoute} className="w-full">
                        <span className="text-lg -m-s-6">🔎</span> Find Route
                    </Button>
                </div>
                {directions.length ? (
                    <DirectionsCard directions={directions} setDirections={setDirections} />
                ) : (
                    <HistoryCard
                        setDepartingLocation={setDepartingLocation}
                        setDestinationLocation={setDestinationLocation}
                        history={history}
                        set_history={setHistory}
                    />
                )}
            </div>
            <Options />
        </div>
    );
}
