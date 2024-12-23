import type { Place, Station } from "./schemas/calculations";

export const places: Place[] = require("./places.json");

export const locations = places
    .map((place) => [place.name, ...place.stations.map((station) => station.name)])
    .flat()
    .reduce((acc, x) => (acc.includes(x) ? acc : [...acc, x]), [] as string[]);

export const stations: Station[] = places.map((places) => places.stations).flat();
export const stationNames = stations
    .map((station) => station.name)
    .reduce((acc, x) => (acc.includes(x) ? acc : [...acc, x]), [] as string[]).sort();

