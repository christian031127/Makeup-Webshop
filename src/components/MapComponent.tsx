import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

/**
 * A component to render a map using Leaflet and OpenStreetMap.
 * It shows a map centered on the specified latitude and longitude and places a marker at that location.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {number} props.lat - The latitude of the location to center the map on.
 * @param {number} props.lng - The longitude of the location to center the map on.
 * 
 * @returns {JSX.Element} A map with a marker and a popup displaying the location.
 */
interface MapProps {
  lat: number;
  lng: number;
}

const MapComponent: React.FC<MapProps> = ({ lat, lng }) => {
  // Center of the map for the specified latitude and longitude
  const center: LatLngExpression = [lat, lng];

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>Glamour Boutique</Popup> {/* Popup displaying location description */}
      </Marker>
    </MapContainer>
  );
};

// Export the component as the default export
export default MapComponent;
