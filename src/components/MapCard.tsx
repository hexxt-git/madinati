import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Direction } from "@/lib/types";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconAnchor: [12, 41],
    shadowAnchor: [12, 41],
});

export default function MapCard({ directions }: { directions: Direction[] }) {
    const [polylinePositions, setPolylinePositions] = useState<[number, number][]>([]);
    const mapRef = useRef<L.Map>(null);

    useEffect(() => {
        const newPolylinePositions: [number, number][] = directions.map(
            (point) => [point.from_coords.lat, point.from_coords.lon] as [number, number]
        );
        if (directions.length > 1)
            newPolylinePositions.push([
                directions[directions.length - 1].to_coords.lat,
                directions[directions.length - 1].to_coords.lon,
            ]);
        setPolylinePositions(newPolylinePositions);

        if (newPolylinePositions.length > 0) {
            const latitudes = newPolylinePositions.map((pos) => pos[0]);
            const longitudes = newPolylinePositions.map((pos) => pos[1]);
            const averageLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
            const averageLon = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
            mapRef.current?.setView([averageLat, averageLon], 13);
        }
    }, [directions]);

    return (
        <div className="overflow-hidden rounded-lg shadow-md border">
            <MapContainer
                center={polylinePositions[0] || [36.6775, 3.143]}
                minZoom={10}
                zoom={13}
                maxZoom={14}
                className="w-[520px] h-full"
                ref={mapRef}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {directions.length > 0 && (
                    <Marker
                        position={[directions[0].from_coords.lat, directions[0].from_coords.lon]}>
                        <Popup>start: {directions[0]?.from}</Popup>
                    </Marker>
                )}
                {directions.length > 1
                    ? directions.map((point, index) => (
                          <Marker key={index} position={[point.to_coords.lat, point.to_coords.lon]}>
                              <Popup>
                                  step: {index + 1} - {point.to},&nbsp;on&nbsp;{point.method}
                              </Popup>
                          </Marker>
                      ))
                    : directions.length > 0 && (
                          <Marker
                              position={[directions[0].to_coords.lat, directions[0].to_coords.lon]}>
                              <Popup>end: {directions[0]?.to}</Popup>
                          </Marker>
                      )}
                <Polyline pathOptions={{ color: "#36f" }} positions={polylinePositions} />
            </MapContainer>
        </div>
    );
}
