import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mergePath } from "@/lib/calculateDirections";
import type { Direction } from "@/lib/schemas/calculations";
import React from "react";

const TooltipText = ({ text }: { text: string }) => (
    <span className="absolute left-0 translate-x-1/2 z-10 top-2 bg-black/90 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
        {text}
    </span>
);

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours ? hours + "h" : ""} ${mins}min`;
}

export default function DirectionsCard({
    directions,
    setDirections,
}: {
    directions: Direction[];
    setDirections: (directions: Direction[]) => void;
}) {
    const flat_directions = mergePath(directions);
    const totalDuration = flat_directions.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCost = flat_directions.reduce((acc, curr) => acc + curr.cost, 0);

    return (
        <Card className="lg:max-w-[500px]">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    Directions 🗺️
                    <button className="text-sm" onClick={() => setDirections([])}>
                        ❌
                    </button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <>
                    <div className="grid grid-cols-[6fr_2fr_2fr_1fr] gap-x-4 gap-y-2 font-bold border-b pb-2 items-center px-2">
                        <div className="break-words hover:hidden">Route</div>
                        <div className="break-words">Distance</div>
                        <div className="break-words text-center">Duration</div>
                        <div className="break-words text-end">Cost</div>
                    </div>
                    <div className="overflow-auto pb-4 lg:max-h-[500px] border-b">
                        {flat_directions.map((direction, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[6fr_2fr_2fr_1fr] gap-x-4 gap-y-2 border-b py-2 last:border-b-0 items-center hover:bg-gray-50 px-2">
                                <div className="break-words">
                                    <div className="relative group inline-block">
                                        <span
                                            className="px-1"
                                            style={{ color: direction.color }}>
                                            {direction.icon}
                                        </span>
                                        <TooltipText
                                            text={`${direction.method} ${direction.cost}DA`}
                                        />
                                    </div>
                                    {direction.from}
                                    <div className="relative group inline-block">
                                        <span className="px-1 break-normal">
                                            {direction.direction === "north" && "⬆️"}
                                            {direction.direction === "east" && "➡️"}
                                            {direction.direction === "south" && "⬇️"}
                                            {direction.direction === "west" && "⬅️"}
                                            {direction.direction === "north-east" && "↗️"}
                                            {direction.direction === "north-west" && "↖️"}
                                            {direction.direction === "south-east" && "↘️"}
                                            {direction.direction === "south-west" && "↙️"}
                                        </span>
                                        <TooltipText text={direction.direction} />
                                    </div>
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
            </CardContent>
        </Card>
    );
}
