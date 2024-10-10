import PageComponent from "@/components/PageComponent";
import React from "react";
import MapFilter from "@/components/MapFilter";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/MapPageMap.js"), {
	ssr: false,
});
import { createContext, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
export const Context = createContext();

export default function map({ mapLocations }) {
	const [filterSelected, setFilterSelected] = useState(new Set());
	const [searchSelected, setSearchSelected] = useState([]);
	function cleanUp(data) {
		const attractions = data.attributes.attractions.data;
		const locations = [];
		console.log(attractions);
		const events = data.attributes.events.data;

		const businesses = data.attributes.businesses.data;

		attractions.forEach((element) => {
			console.log(element);
			locations.push({
				section: "attractions",
				name: element.attributes.Name,
				coords: [
					element.attributes.Location.Latitude,
					element.attributes.Location.Longitude,
				],
				type: element.attributes.Type,
				details: element,
			});
		});

		events.forEach((element) => {
			console.log(element.attributes.Location);
			console.log(element.attributes.Location.Latitude);

			locations.push({
				section: "events",
				name: element.attributes.Name,
				coords: [
					element.attributes.Location.Latitude,
					element.attributes.Location.Longitude,
				],
				type: element.attributes.Type,
				details: element,
			});
		});

		businesses.forEach((element) => {
			console.log(element.attributes);
			locations.push({
				section: "business",
				name: element.attributes.Name,
				coords: [
					element.attributes.Location.Latitude,
					element.attributes.Location.Longitude,
				],
				type: element.attributes.Type,
				details: element,
			});
		});

		console.log(locations);
		return locations;
	}
	const locations = cleanUp(mapLocations);

	function handleSearchSelect(result) {
		setSearchSelected([result]);
	}

	function handleSearchClear() {
		setSearchSelected([]);
	}

	function handleSearching(string, results) {
		console.log(results);
		setSearchSelected(results);
	}
	return (
		<>
			<style jsx>
				{`
					.map-page-container {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						gap: 20px;
						min-height: calc(100vh - 8em);
					}

					.map-container {
						width: 77%;
						height: calc(100vh - 8em);
						background-repeat: no-repeat;
						background-size: cover;
					}

					input[type="text"] {
						border: none;
						width: 90%;
					}

					input[type="text"]:focus {
						outline: none;
					}

					.search-bar-container {
						display: flex;
						justify-content: space-between;
						padding: 0.5em 1em;
						box-sizing: border-box;
						align-items: center;
						width: 20%;
					}

					.search-bar-container:focus-within {
						border: 2px solid black;
					}

					.filter-map-pair {
						display: flex;
					}

					@media screen and (max-width: 1230px) {
						.map-page-container {
							margin-bottom: 5em;
						}

						.filter-map-pair {
							flex-direction: column-reverse;
						}

						.map-container {
							align-self: center;
							width: 100%;
							height: calc(100vh - 8em);
						}

						.search-bar-outer {
							align-self: center;
							max-width: 50%;
							flex: 1;
						}
						.search-bar-container {
							width: 60%;
							align-self: center;
						}
					}

					@media screen and (max-width: 768px) {
						.search-bar-container {
							width: 100%;
							align-self: center;
						}
					}
				`}
			</style>
			<style jsx global>{`
				.search-bar {
					width: 20%;
					z-index: 9998;
				}

				.search-bar .wrapper:first-child {
					border: 2px solid var(--color-primary);
				}
				@media screen and (max-width: 1230px) {
					.search-bar {
						width: 60%;
						align-self: center;
					}
				}

				@media screen and (max-width: 768px) {
					.search-bar {
						width: 100%;
						align-self: center;
					}
				}
			`}</style>
			<PageComponent pageName="Map" includePadding>
				<div className="map-page-container">
					<ReactSearchAutocomplete
						className="search-bar"
						items={locations}
						onSearch={(string, results) => handleSearching(string, results)}
						onSelect={(result) => handleSearchSelect(result)}
						onClear={() => handleSearchClear()}
					/>
					<div className="filter-map-pair">
						<Context.Provider
							value={{
								filterSelected,
								setFilterSelected,
								searchSelected,
								setSearchSelected,
							}}
						>
							<MapFilter />
							<div className="map-container">
								<Map mapLocations={locations} />
							</div>
						</Context.Provider>
					</div>
				</div>
			</PageComponent>
		</>
	);
}

// Fetch data server-side
export async function getServerSideProps() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/approved-post?populate[attractions][populate]=*&populate[businesses][populate]=*&populate[events][populate]=*&pagination[pageSize]=1000`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		// Pass the data to the page component via props
		return {
			props: {
				mapLocations: data.data || [], // Ensuring there's always an array
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				mapLocations: [],
			},
		};
	}
}