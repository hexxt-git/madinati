import { Direction, Station } from "./types";
import { stations } from "./places";
import { Bus, Footprints, TramFront, Train, CableCar } from "lucide-react"; // Import necessary icons

// Helper function to calculate the distance between two coordinates
function calculateDistance(
    coord1: { lon: number; lat: number },
    coord2: { lon: number; lat: number }
): number {
    const earthRadius = 6371e3; // Earth radius in meters
    const lat1 = (coord1.lat * Math.PI) / 180;
    const lat2 = (coord2.lat * Math.PI) / 180;
    const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const deltaLon = ((coord2.lon - coord1.lon) * Math.PI) / 180;

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
): { method: string; cost: number; speed: number; icon: React.ComponentType } {
    switch (type) {
        case "bus":
            return { method: "bus", cost: 20, speed: 500, icon: Bus };
        case "tramway":
            return { method: "tramway", cost: 40, speed: 600, icon: TramFront };
        case "metro":
            return { method: "metro", cost: 50, speed: 800, icon: Train };
        case "telepherique":
            return { method: "telepherique", cost: 25, speed: 400, icon: CableCar };
        case "foot":
            return { method: "foot", cost: 0, speed: 80, icon: Footprints };
        default:
            return { method: "unknown", cost: 0, speed: 1, icon: () => null };
    }
}

// A Dijkstra-like approach with walking fallback for better performance on weighted paths
function calculateDirections(departure: string, arriving: string): Direction[] {
    const startStation = findStation(departure);
    const endStation = findStation(arriving);

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
        queue.sort((a, b) => a.duration - b.duration);
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
            const { method, cost, speed, icon } = getMethodCostSpeed(nextStation.type, distance);
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
                    from_coords: currentStation.coordinates,
                    to_coords: nextStation.coordinates,
                };
                queue.push({ name: nextName, duration: alt });
            }
        }

        // Walking fallback up to 2000m
        for (const walkStation of stations) {
            if (walkStation.name === currentStation.name) continue;
            const distance = calculateDistance(currentStation.coordinates, walkStation.coordinates);
            if (distance <= 1200) {
                const stepDuration = distance / 100;
                const alt = currentDur + stepDuration;
                if (alt < durations[walkStation.name]) {
                    durations[walkStation.name] = alt;
                    previous[walkStation.name] = {
                        from: currentStation.name,
                        to: walkStation.name,
                        distance: Math.ceil(distance),
                        duration: Math.ceil(stepDuration),
                        cost: 0,
                        method: "foot",
                        icon: Footprints,
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

    // Merge consecutive tram and metro segments
    const mergedPath: Direction[] = [];
    let x = 0;
    for (let i = 0; i < path.length; i++) {
        const current = path[i];
        if (mergedPath.length > 0) {
            const last = mergedPath[mergedPath.length - 1];
            if (
                (last.method === "tramway" || last.method === "metro") &&
                (current.method === "tramway" || current.method === "metro")
            ) {
                last.to = `${current.to} (${++x} station${x > 1 ? "s" : ""})`;
                last.distance += current.distance;
                last.duration += current.duration;
                continue;
            }
        }
        mergedPath.push({ ...current });
    }

    return mergedPath;
}

export { calculateDirections };
