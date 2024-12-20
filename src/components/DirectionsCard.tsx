import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Direction } from "@/lib/types";
import React from "react";

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours ? hours + "h" : ""} ${mins}min`;
}

export default function DirectionsCard({ directions }: { directions: Direction[] }) {
    const totalDuration = directions.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCost = directions.reduce((acc, curr) => acc + curr.cost, 0);

    return (
        <Card className="shadow-md lg:max-w-[500px]">
            <CardHeader>
                <CardTitle>Directions</CardTitle>
            </CardHeader>
            <CardContent>
                {directions.length ? (
                    <>
                        <div className="grid grid-cols-[6fr_2fr_2fr_1fr] gap-x-4 gap-y-2 font-bold border-b pb-2 items-center px-4">
                            <div className="break-words">Route</div>
                            <div className="break-words">Distance</div>
                            <div className="break-words text-center">Duration</div>
                            <div className="break-words text-end">Cost</div>
                        </div>
                        <div className="overflow-auto pb-4 pe-4 lg:max-h-[500px] border-b">
                            {directions.map((direction, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr_5fr_2fr_2fr_1fr] gap-x-4 gap-y-2 border-b py-2 last:border-b-0 items-center">
                                    <div className="relative group flex justify-evenly items-center w-full h-full ml-2">
                                        {React.createElement(direction.icon, {
                                            className: "h-5 w-5",
                                        } as any)}
                                        <span className="absolute left-0 translate-x-1/2 top-2 bg-black/90 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                                            {direction.method} {direction.cost}DA
                                        </span>
                                    </div>
                                    <div className="break-words">
                                        {direction.from}
                                        <ArrowRight className="inline scale-y-50" strokeWidth={3} />
                                        {direction.to}
                                    </div>
                                    <div className="break-words">{direction.distance}m</div>
                                    <div className="break-words text-center">
                                        ~{formatDuration(direction.duration)}
                                    </div>
                                    <div className="break-words text-end">{direction.cost}DA</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <strong className="mx-2">Total Duration:</strong>
                                <span>~{formatDuration(totalDuration)}</span>
                            </div>
                            <div>
                                <strong className="mx-2">Total Cost:</strong>
                                <span>{totalCost}DA</span>
                            </div>
                        </div>
                    </>
                ) : (
                    "Please select a departure and arriving location and press 'Find Route'"
                )}
            </CardContent>
        </Card>
    );
}
