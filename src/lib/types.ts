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
    duration: number;
    icon: React.ComponentType;
    cost: number;
    method: string;
    color: string;
};
