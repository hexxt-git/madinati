import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapCard({ directions }: { directions: { lon: number; lat: number }[] }) {
    const polylinePositions: [number, number][] = directions.map(point => [point.lat, point.lon]);

    return (
        <div className="overflow-hidden rounded-lg shadow-md border">
            <MapContainer
                center={polylinePositions[0] || [0, 0]}
                zoom={13}
                className="w-[520px] h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[directions[0]?.lat ?? 0, directions[0]?.lon ?? 0]}>
                    <Popup>start</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
