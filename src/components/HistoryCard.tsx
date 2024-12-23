"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

function isoToTimeAgo(time: string) {
    const diff = Date.now() - new Date(time).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4.34524);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (weeks > 0) return `${weeks}w ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 1) return `${minutes}m ago`;
    return `just now`;
}

export default function TrendingCard({
    setDestinationLocation,
    setDepartingLocation,
    history,
    set_history,
}: {
    setDestinationLocation: (location: string) => void;
    setDepartingLocation: (location: string) => void;
    history: { from: string; to: string; time: string }[];
    set_history: (history: { from: string; to: string; time: string }[]) => void;
}) {
    useEffect(() => {
        const storedHistory = localStorage.getItem("history");
        if (storedHistory) {
            try {
                set_history(JSON.parse(storedHistory));
            } catch (error) {}
        }
    }, []);

    return (
        <Card className="shadow-md lg:w-[500px] min-h-[300px]">
            <CardHeader>
                <CardTitle>History 🕑 </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[3fr_1fr] gap-x-4 gap-y-2 font-bold border-b pb-2 items-center">
                    <div className="break-words">Journey</div>
                    <div className="break-words text-center">Time</div>
                </div>

                <div className="overflow-auto pb-4 lg:max-h-[500px] border-b">
                    {history.map((place, index) => (
                        <div
                            onClick={() => {
                                setDestinationLocation(place.to);
                                setDepartingLocation(place.from);
                                toast.info("Locations set");
                            }}
                            key={index}
                            className="grid grid-cols-[3fr_1fr] gap-x-4 gap-y-2 border-b py-2 last:border-b-0 items-start text-start cursor-pointer hover:bg-gray-50 px-2">
                            <div className="break-words">
                                {place.from} ➡️ {place.to}
                            </div>
                            <div className="break-words text-center group">
                                <div className="contents lg:group-hover:hidden">
                                    {isoToTimeAgo(place.time)}
                                </div>
                                <div className="hidden lg:group-hover:contents">
                                    {new Date(place.time).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
