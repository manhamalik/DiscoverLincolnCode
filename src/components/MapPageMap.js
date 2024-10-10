import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { DivIcon, Icon, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Context } from "../pages/map";
import { useContext, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTree,
	faChampagneGlasses,
	faHeart,
	faBurger,
	faBagShopping,
	faBookOpenReader,
	faFeatherPointed,
	faPersonWalking,
	faLeaf,
	faBowlFood,
	faPeopleGroup,
	faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import BusinessCard from "./BusinessCard";
import AttractionCard from "./AttractionCard";
import EventCard from "./EventCard";
import BackgroundSectionComponent from "./BackgroundSectionComponent";

export default function MapPageMap({mapLocations}) {
	const filters = useContext(Context);
	console.log(mapLocations);
	// list of all marked down locations, hardcoded for now
	const markerDetails = {
		"NaturalAttraction": {
			"icon": faTree,
			"color": "#027B00"
		},
		"HistoricalAttraction": {
			"icon": faBookOpenReader,
			"color": "#027B00"
		},
		"CulturalAttraction": {
			"icon": faFeatherPointed,
			"color": "#027B00"
		},
		"RecreationalAttraction": {
			"icon": faPersonWalking,
			"color": "#027B00"
		},
		"RestaurantBusiness":{
			"icon": faBurger,
			"color": "#015BC4"
		},
		"HealthBusiness":{
			"icon": faHeart,
			"color": "#015BC4"
		},
		"RetailBusiness":{
			"icon": faBagShopping,
			"color": "#015BC4"
		},
		"EntertainmentBusiness":{
			"icon": faChampagneGlasses,
			"color": "#015BC4"
		},
		"culturalEvent":{
			"icon": faLeaf,
			"color": "#CF5700"
		},
		"food":{
			"icon": faBowlFood,
			"color": "#CF5700"
		},
		"community":{
			"icon": faPeopleGroup,
			"color": "#CF5700"
		},
		"sports":{
			"icon": faFutbol,
			"color": "#CF5700"
		},

	}
	
	let [markersDisplayed, setMarkersDisplayed] = useState([...mapLocations]);

	// const customIcon = new DivIcon({
	//     html: ReactDOMServer.renderToString(
	//         <div style={{color: "blue", display: "flex", justifyContent: "center"}}>
	//             <FontAwesomeIcon icon={faTree} size="4x"/>
	//         </div>

	//     ),
	//     iconSize: [50,50],
	//     iconAnchor: [15, 42],
	// })
	useEffect(() => {
		//activate when filters change

		console.log(filters.searchSelected);
		if (filters.searchSelected.length !== 0){
			setMarkersDisplayed(filters.searchSelected);
		} else {
			if (filters.filterSelected.size != 0) {
				const filtered = mapLocations.filter((element) => {
					return filters.filterSelected.has(element.type) === true;
				});
				setMarkersDisplayed(filtered);
			} else {
				setMarkersDisplayed([...mapLocations]);
			}			
		}

	}, [filters]);

	const center = new LatLng(43.153214, -79.392812);
	return (
		<>
			<style jsx>
				{`
					.leaflet-container {
						height: 100%;
					}
					
					/* Styling for the popup container */
					.leaflet-popup-content-wrapper {
						border-radius: 15px;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
					}

				`}
			</style>
			<MapContainer center={center} zoom={12} style={{ height: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors"'
					url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markersDisplayed.map((marker) => {
					return (
						<Marker
							position={marker.coords}
							icon={
								new DivIcon({
									className: "icon-container",
									html: ReactDOMServer.renderToString(
										<div
											style={{
												color: `${markerDetails[marker.type].color}`,
												display: "flex",
												justifyContent: "center",
												border: "none",
											}}
										>
											<FontAwesomeIcon icon={markerDetails[marker.type].icon} size="2x" />
										</div>
									),
									iconSize: [50, 50],
								})
							}
						>
							<Popup>
								<div style={{boxShadow: "0 3px 20px rgba(0,0,0,0.6)", borderRadius: "12px"}}>
									{marker.section === "attractions" ? <AttractionCard attraction={marker.details}/> : marker.section === "events" ? <EventCard event={marker.details} hasDelete={false}/> : <BusinessCard business={marker.details}/>} 
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</>
	);
}


