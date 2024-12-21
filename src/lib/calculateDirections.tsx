import { Direction, Station } from "../components/schemas/calculations";
import { stations } from "./places";
import { Bus, Footprints, TramFront, Train, CableCar } from "lucide-react";
import { toast } from "sonner";

function calculateDistance(
    coord1: { lon: number; lat: number },
    coord2: { lon: number; lat: number }
): number {
    const earthRadius = 6371e3; // Earth radius in meters
    const lat1 = (coord1.lat * Math.PI) / 180;
    const lat2 = (coord2.lat * Math.PI) / 180;
    const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const deltaLon = ((coord1.lon - coord2.lon) * Math.PI) / 180;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // in meters
}

// Helper function to find a station by name
function findStation(name: string): Station | undefined {
    return stations.find((station) => station.name === name);
}

// Helper function to get method, cost, speed, and icon based on station type
function getMethodCostSpeed(
    type: string,
    distance: number
): {
    method: string;
    cost: number;
    speed: number;
    icon: React.ComponentType;
    color: string;
    weight: number;
} {
    switch (type) {
        case "bus":
            return {
                method: "bus",
                cost: 25,
                speed: 500,
                icon: () => <span className="text-2xl">🚌</span>,
                color: "#FFA500",
                weight: 1.2,
            };
        case "tramway":
            return {
                method: "tramway",
                cost: 40,
                speed: 600,
                icon: () => <span className="text-2xl">🚊</span>,
                color: "#54A9FF",
                weight: 1.0,
            };
        case "metro":
            return {
                method: "metro",
                cost: 50,
                speed: 800,
                icon: () => <span className="text-2xl">🚄</span>,
                color: "#224488",
                weight: 0.8,
            };
        case "telepherique":
            return {
                method: "telepherique",
                cost: 30,
                speed: 400,
                icon: () => <span className="text-2xl">🚡</span>,
                color: "#8A2BE2",
                weight: 1.1,
            };
        case "foot":
            return {
                method: "foot",
                cost: 0,
                speed: 40,
                icon: () => <span className="text-2xl">🚶</span>,
                color: "#40A060",
                weight: 2.0,
            };
        default:
            return {
                method: "unknown",
                cost: 0,
                speed: 1,
                icon: () => <span className="text-2xl">❓</span>,
                color: "#808080",
                weight: 3.0,
            };
    }
}

// A Dijkstra-like approach with walking fallback for better performance on weighted paths
function calculateDirections(departure: string, destination: string): Direction[] {
    console.time("calculateDirections");
    const startStation = findStation(departure);
    const endStation = findStation(destination);

    if (!startStation || !endStation) {
        throw new Error("Invalid station names.");
    }

    const durations: Record<string, number> = {};
    const previous: Record<string, Direction | null> = {};

    for (const s of stations) {
        durations[s.name] = Infinity;
        previous[s.name] = null;
    }
    durations[startStation.name] = 0;
    const queue: { name: string; duration: number }[] = [{ name: startStation.name, duration: 0 }];

    while (queue.length > 0) {
        queue.sort((a, b) => {
            const prevA = previous[a.name];
            const prevB = previous[b.name];
            const weightA = prevA ? getMethodCostSpeed(prevA.method, 0).weight : 1;
            const weightB = prevB ? getMethodCostSpeed(prevB.method, 0).weight : 1;
            return a.duration * weightA - b.duration * weightB;
        });
        const { name: currentName, duration: currentDur } = queue.shift()!;
        if (currentName === endStation.name) break;
        if (currentDur > durations[currentName]) continue;

        const currentStation = findStation(currentName);
        if (!currentStation) continue;

        // Explore connected neighbors
        for (const nextName of currentStation.leads_to) {
            const nextStation = findStation(nextName);
            if (!nextStation) continue;
            const distance = calculateDistance(currentStation.coordinates, nextStation.coordinates);
            const { method, cost, speed, icon, color } = getMethodCostSpeed(
                nextStation.type,
                distance
            );
            const stepDuration = distance / speed;
            const alt = currentDur + stepDuration;
            if (alt < durations[nextName]) {
                durations[nextName] = alt;
                previous[nextName] = {
                    from: currentStation.name,
                    to: nextStation.name,
                    distance: Math.ceil(distance),
                    duration: Math.ceil(stepDuration),
                    cost,
                    method,
                    icon,
                    color,
                    from_coords: currentStation.coordinates,
                    to_coords: nextStation.coordinates,
                };
                queue.push({ name: nextName, duration: alt });
            }
        }
        // Walking fallback up to 1400m
        const walkStations = stations
            .filter((walkStation) => walkStation.name !== currentStation.name)
            .map((walkStation) => ({
                station: walkStation,
                distance: calculateDistance(currentStation.coordinates, walkStation.coordinates),
            }))
            .filter(({ distance }) => distance <= 1400)
            .filter(({ station }) => !currentStation.leads_to.includes(station.name))
            .sort((a, b) => a.distance - b.distance);

        for (const { station: walkStation, distance } of walkStations) {
            const existingConnection = currentStation.leads_to.includes(walkStation.name);
            if (!existingConnection) {
                const stepDuration = distance / 40;
                const alt = currentDur + stepDuration;
                const lastStepWasWalking = previous[currentName]?.method === "foot";
                if (!lastStepWasWalking && alt < durations[walkStation.name]) {
                    durations[walkStation.name] = alt;
                    previous[walkStation.name] = {
                        from: currentStation.name,
                        to: walkStation.name,
                        distance: Math.ceil(distance),
                        duration: Math.ceil(stepDuration),
                        cost: 0,
                        method: "foot",
                        icon: () => <span className="text-2xl">🚶</span>,
                        color: "#40A060",
                        from_coords: currentStation.coordinates,
                        to_coords: walkStation.coordinates,
                    };
                    queue.push({ name: walkStation.name, duration: alt });
                }
            }
        }
    }

    if (durations[endStation.name] === Infinity) {
        throw new Error("No path found.");
    }
    const path: Direction[] = [];
    let curr = endStation.name;
    while (previous[curr]) {
        path.unshift(previous[curr]!);
        curr = previous[curr]!.from;
    }

    if (path.length === 0) throw new Error("no suitable path found");

    console.timeEnd("calculateDirections");
    const totalDuration = path.reduce((acc, x) => acc + x.duration, 0);
    toast.success(`Found path from ${departure} to ${destination} in ${totalDuration} minutes.`);
    return path;
}

function mergePath(path: Direction[]): Direction[] {
    const mergedPath: Direction[] = [];
    for (let i = 0; i < path.length; i++) {
        const current = path[i];
        if (mergedPath.length > 0) {
            const last = mergedPath[mergedPath.length - 1];
            if (last.method === current.method) {
                // Extract existing station count
                const match = last.to.match(/\((\d+) station/);
                const stationCount = match ? parseInt(match[1]) + 1 : 2;
                last.to = `${current.to} (${stationCount} station${stationCount > 1 ? "s" : ""})`;
                last.distance += current.distance;
                last.duration += current.duration;
                last.cost += current.cost;
                last.to_coords = current.to_coords;
                continue;
            }
        }
        mergedPath.push({ ...current });
    }
    return mergedPath;
}

export { calculateDirections, mergePath };
