export type Station = {
    name: string;
    coordinates: {
        lon: number;
        lat: number;
    };
    leads_to: string[];
    type: "bus" | "tramway" | "metro" | "telepherique";
};

export type Place = {
    name: string;
    stations: Station[];
};

export type Direction = {
    from: string;
    from_coords: { lon: number; lat: number };
    to: string;
    to_coords: { lon: number; lat: number };
    distance: number;
    direction: "north" | "east" | "south" | "west" | "north-east" | "north-west" | "south-east" | "south-west";
    duration: number;
    icon: string;
    cost: number;
    method: string;
    color: string;
};
