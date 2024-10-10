import NavBar from "@/components/NavBar";
import TestComponent from "@/components/TestComponent";
import React, { useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import { FormContext } from "@/contexts/FormContext";
import { useContext } from "react";
//onSelect will be passed the address and the lat/long
const AddressPicker = ({ onSelect = () => {} }) => {
	const context = useContext(FormContext);
	function handleSelect(address) {
		context.setSearch(address);
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => onSelect({ latLng: latLng, address: address }))
			.catch((error) => console.error("Error", error));
	}
	return (
		<>
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBE23iNt4PAV20b1mseRNhI3EY7swSt90U&libraries=places`}
				strategy="beforeInteractive"
				onLoad={() => console.log("Google Maps API script loaded successfully")}
			/>
			<PlacesAutocomplete
				value={context.search}
				onChange={(address) => context.setSearch(address)}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<>
						<div className="form-group">
							<div className="form-label-input">
								<label htmlFor="location">
									Location <span style={{ color: "red" }}>*</span>
								</label>
								<div className="icon-wrapper">
									<FontAwesomeIcon icon={faMapMarkerAlt} />
									<input
										{...getInputProps({
											placeholder: "Search Places ...",
											className: "location-search-input",
											id: "location",
											name: "location",
										})}
									/>
								</div>
							</div>
							<div className="autocomplete-dropdown-container">
								{loading && <div>Loading...</div>}
								{suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									// inline style for demonstration purpose
									const style = suggestion.active
										? { backgroundColor: "#fafafa", cursor: "pointer" }
										: { backgroundColor: "#ffffff", cursor: "pointer" };
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style,
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					</>
				)}
			</PlacesAutocomplete>
			<style jsx>{`
				.form-container {
					display: flex;
					flex-direction: column;
					width: 100%;
					box-sizing: border-box;
				}

				.form-group {
					display: grid;
					margin-bottom: 20px;
					width: 100%;
					box-sizing: border-box;
				}

				#form-input-pair {
					justify-content: space-between;
					gap: 4%;
				}

				#pair {
					flex: 1 1 45%;
				}

				.icon-wrapper {
					display: flex;
					padding: 0.5em 0 0.5em 0.5em;
					align-items: center;
					border: 1px solid #ccc;
					border-radius: 5px;
					font-size: 1rem;
					gap: 10px;
					box-sizing: border-box;
					overflow-x: auto;
				}

				.time-container,
				.date-container {
					display: grid;
					box-sizing: border-box;
					justify-content: space-between;
					gap: 5%;
					grid-template-columns: 5fr 1fr 5fr;
				}

				.to-text {
					display: inline-block;
					align-self: center;
					white-space: nowrap; /* Prevent the "to" from breaking within itself */
					box-sizing: border-box;
				}

				#time-box,
				#date-box {
					flex: 1 1 45%; /* Ensures time-boxes take equal width and are flexible */
				}

				.icon-wrapper:focus-within {
					outline: 2px solid black;
				}

				.form-label-input {
					display: flex;
					flex-direction: column;
					flex: 1;
					box-sizing: border-box;
				}

				label {
					margin-bottom: 5px;
					font-size: 1rem;
				}

				input {
					border: none;
					flex-grow: 1;
					width: 100%;
				}

				input:focus {
					outline: none;
				}

				/* Hide built-in icons for date input */
				input[type="date"]::-webkit-inner-spin-button,
				input[type="date"]::-webkit-calendar-picker-indicator {
					display: none;
					-webkit-appearance: none;
				}

				/* Hide built-in icons for time inputs */
				input[type="time"]::-webkit-calendar-picker-indicator {
					display: none;
				}

				/* mobile view (768px) */
				@media (max-width: 768px) {
					#form-input-pair {
						flex-direction: column;
						justify-content: space-between;
						gap: 20px;
					}
				}
			`}</style>
		</>
	);
};

export default AddressPicker;
