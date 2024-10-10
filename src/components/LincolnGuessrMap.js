import React, { useState } from "react";
import {
	MapContainer,
	Marker,
	TileLayer,
	useMapEvents,
	Popup,
	Polyline,
} from "react-leaflet";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LincolnGuessrMap({
	onCurrentLocationChange,
	canChooseLocation = false,
	pickedLocation, //pass in for the not-guessing pages to display the guess
	correctLocation, //if a correct location is provided place a marker for the spot
	correctInfo,
}) {
	const [currentLocation, setCurrentLocation] = useState(pickedLocation);

	// Function to handle map click and set a marker
	const MapClickHandler = () => {
		useMapEvents({
			click(e) {
				if (canChooseLocation) {
					const { lat, lng } = e.latlng;
					setCurrentLocation([lat, lng]); // Set new marker
					onCurrentLocationChange([lat, lng]); //let geoguessr get these coordinates
				}
			},
		});
		return null;
	};

	const center = correctLocation || [43.153214, -79.392812]; // Initial center for the map

	// Custom icon with anchor at the bottom center
	const customIcon = (emoji) =>
		new DivIcon({
			className: "custom-icon",
			html: `<div style="color: red; font-size: 24px;">${emoji}</div>`,
			iconAnchor: [12, 24], // Anchor at the bottom-center (12px to the right, 24px down)
		});

	return (
		<>
			<style jsx>
				{`
					.leaflet-container {
						height: 100%;
					}
				`}
			</style>
			<MapContainer center={center} zoom={12} style={{ height: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* Component to handle map clicks */}
				<MapClickHandler />

				{/* If there's a currentLocation, show a marker */}
				{currentLocation && (
					<Marker position={currentLocation} icon={customIcon("📍")}>
						<Popup>
							Latitude: {currentLocation[0]}, Longitude: {currentLocation[1]}
						</Popup>
					</Marker>
				)}

				{/* If there's a correct location, show a marker */}
				{correctLocation && (
					<Marker position={correctLocation} icon={customIcon("🚩")}>
						<Popup>
							{correctInfo
								? `${correctInfo}`
								: `Latitude: ${correctLocation[0]}, Longitude: ${correctLocation[1]}`}
						</Popup>
					</Marker>
				)}

				{/* Draw a dotted line between the correct location and the picked location */}
				{correctLocation && currentLocation && (
					<Polyline
						positions={[correctLocation, currentLocation]}
						color="black"
						weight={3}
						dashArray="5, 10" // Dotted line: 5px line, 10px space
					/>
				)}
			</MapContainer>
		</>
	);
}
