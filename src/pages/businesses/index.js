import React, { useEffect, useState } from "react";
import PageComponent from "@/components/PageComponent";
import AttractionCard from "@/components/AttractionCard";
import BusinessCard from "@/components/BusinessCard";
import Bowtie from "@/components/Bowtie";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import NextSectionArrow from "@/components/NextSectionArrow";
import { filterByDateRange } from "../../../util/filterHelpers";

export default function BusinessCardPage({
	restaurants,
	entertainment,
	health,
	retail,
	tags,
}) {
	// State to track if "See More" has been clicked for each section
	const [showMoreRestaurants, setShowMoreRestaurants] = useState(false);
	const [showMoreRetail, setShowMoreRetail] = useState(false);
	const [showMoreEntertainment, setShowMoreEntertainment] = useState(false);
	const [showMoreHealth, setShowMoreHealth] = useState(false);
	const [typeFilter, setTypeFilter] = useState("Any");
	const [searchString, setSearchString] = useState("");
	const [displayedRestaurants, setDisplayedRestaurants] = useState(restaurants);
	const [displayedRetail, setDisplayedRetail] = useState(retail);
	const [displayedEntertainment, setDisplayedEntertainment] =
		useState(entertainment);
	const [displayedHealth, setDisplayedHealth] = useState(health);

	// Toggle "See More" for each section
	const toggleShowMore = (section) => {
		switch (section) {
			case "restaurants":
				setShowMoreRestaurants(!showMoreRestaurants);
				break;
			case "retail":
				setShowMoreRetail(!showMoreRetail);
				break;
			case "entertainment":
				setShowMoreEntertainment(!showMoreEntertainment);
				break;
			case "health":
				setShowMoreHealth(!showMoreHealth);
				break;
			default:
				break;
		}
	};

	function handleFiltersChanged(incomingFilters) {
		let filteredRestaurants = [...restaurants];
		let filteredRetail = [...retail];
		let filteredEntertainment = [...entertainment];
		let filteredHealth = [...health];
		setTypeFilter(incomingFilters.type);
		setSearchString(incomingFilters.searchString.toLowerCase());

		//do front end filtering on displayed collections
		filteredRestaurants = filterByDateRange(
			filteredRestaurants,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredRetail = filterByDateRange(
			filteredRetail,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredEntertainment = filterByDateRange(
			filteredEntertainment,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredHealth = filterByDateRange(
			filteredHealth,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		//sort
		if (incomingFilters.sortDir == "desc") {
			filteredRestaurants = filteredRestaurants.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredRetail = filteredRetail.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredEntertainment = filteredEntertainment.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredHealth = filteredHealth.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
		} else {
			filteredRestaurants = filteredRestaurants.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredRetail = filteredRetail.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredEntertainment = filteredEntertainment.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredHealth = filteredHealth.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
		}

		setDisplayedRestaurants(filteredRestaurants);
		setDisplayedRetail(filteredRetail);
		setDisplayedEntertainment(filteredEntertainment);
		setDisplayedHealth(filteredHealth);
	}

	return (
		<>
			<style jsx>
				{`
					.blue-section {
						position: relative;
						width: 100vw;
						height: calc(100vh - 64px);
						background-image: url("https://imgur.com/QZM51tE.png");
						background-size: cover;
						background-position: center;
						background-repeat: no-repeat;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
					}
					.blue-section::before {
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.5);
						z-index: 1;
					}
					.content-box {
						position: relative;
						z-index: 2;
						max-width: 35%;
						color: white;
						font-weight: bold;
						padding: 0;
						margin: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					.title {
						font-size: 3.75em;
						margin-bottom: 0;
						text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
					}
					.description {
						font-size: 1.2em;
						margin-top: 0;
						text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
					}
					.bowtie-container {
						position: absolute;
						bottom: 0;
						width: 100%;
						transform: translateY(50%);
					}
					.search-container {
						margin: 0 auto;
						position: relative;
						margin-top: 10%;
					}
					.custom-arrow-position {
						position: absolute;
						bottom: 20px;
						z-index: 10;
					}
					.attractions-section {
						padding: 40px 20px;
					}
					.attractions-heading {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 2em;
						font-weight: bold;
						padding-left: 3.8%;
						text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
					}
					.heading-title {
						flex: 1;
						text-align: left;
					}
					.attraction-grid {
						display: flex;
						justify-content: space-around;
						flex-wrap: wrap;
						gap: 50px;
					}
					.attraction-grid .cardContainer {
						flex: 1 1 calc(33.3333% - 30px);
						max-width: calc(33.3333% - 30px);
						box-sizing: border-box;
					}
					@media only screen and (max-width: 768px) {
						.content-box {
							max-width: 70%;
						}
						.title {
							font-size: 3em;
						}
						.description {
							font-size: 1em;
						}
						.attractions-heading {
							flex-direction: column;
							align-items: center;
							text-align: center;
						}
						.heading-title {
							margin-bottom: 10px;
							font-size: 1.3em;
						}
					}
				`}
			</style>

			<PageComponent>
				<div className="blue-section">
					<div className="content-box">
						<h1 className="title">Businesses</h1>
						<p className="description">
							Discover the many local businesses that Lincoln has to offer. From
							restaurants and cafes to entertainment and recreation, you’ll
							always find something that interests you!
						</p>
					</div>
					<div className="custom-arrow-position">
						<NextSectionArrow nextSectionId="next-section" />
					</div>
					<div className="bowtie-container">
						<Bowtie />
					</div>
				</div>

				<div className="search-container" id="next-section">
					<SearchBar filtersChanged={handleFiltersChanged} type="businesses" />
				</div>

				{/* Restaurants & Cafes Section */}
				{(typeFilter === "Any" || typeFilter === "Restaurants & Cafes") &&
					displayedRestaurants.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								<span className="heading-title">Restaurants & Cafes</span>
								<DropdownButton
									onClick={() => toggleShowMore("restaurants")}
									isOpen={showMoreRestaurants}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedRestaurants
									.filter((b) =>
										b.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((b) => (
										<BusinessCard business={b} />
									))}
								{showMoreRestaurants &&
									displayedRestaurants
										.filter((b) =>
											b.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((b) => <BusinessCard business={b} />)}
							</div>
						</div>
					)}

				{/* Retail Businesses Section */}
				{(typeFilter === "Any" || typeFilter === "Retail Businesses") &&
					displayedRetail.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Retail Businesses
								<DropdownButton
									onClick={() => toggleShowMore("retail")}
									isOpen={showMoreRetail}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedRetail
									.filter((b) =>
										b.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((b) => (
										<BusinessCard business={b} />
									))}
								{showMoreRetail &&
									displayedRetail
										.filter((b) =>
											b.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((b) => <BusinessCard business={b} />)}
							</div>
						</div>
					)}

				{/* Entertainment & Recreation Section */}
				{(typeFilter === "Any" ||
					typeFilter === "Entertainment & Recreation") &&
					displayedEntertainment.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Entertainment & Recreation
								<DropdownButton
									onClick={() => toggleShowMore("entertainment")}
									isOpen={showMoreEntertainment}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedEntertainment
									.filter((b) =>
										b.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((b) => (
										<BusinessCard business={b} />
									))}
								{showMoreEntertainment &&
									displayedEntertainment
										.filter((b) =>
											b.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((b) => <BusinessCard business={b} />)}
							</div>
						</div>
					)}

				{/* Health & Wellness Section */}
				{(typeFilter === "Any" || typeFilter === "Health & Wellness") &&
					displayedHealth.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Health & Wellness
								<DropdownButton
									onClick={() => toggleShowMore("health")}
									isOpen={showMoreHealth}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedHealth
									.filter((b) =>
										b.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((b) => (
										<BusinessCard business={b} />
									))}
								{showMoreHealth &&
									displayedHealth
										.filter((b) =>
											b.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((b) => <BusinessCard business={b} />)}
							</div>
						</div>
					)}
			</PageComponent>
		</>
	);
}

// Fetch data server-side
export async function getServerSideProps() {
	try {
		const [response, tags] = await Promise.all([
			await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/approved-post?populate[businesses][populate]=*&pagination[pageSize]=1000`
			),
			await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/accessibility-tags`
			),
		]);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		const tagsList = await tags.json();

		// Pass the data to the page component via props
		return {
			props: {
				restaurants:
					data.data.attributes.businesses.data.filter(
						(bus) => bus.attributes.Type === "RestaurantBusiness"
					) || [],
				health:
					data.data.attributes.businesses.data.filter(
						(bus) => bus.attributes.Type === "HealthBusiness"
					) || [],
				entertainment:
					data.data.attributes.businesses.data.filter(
						(bus) => bus.attributes.Type === "EntertainmentBusiness"
					) || [],
				retail:
					data.data.attributes.businesses.data.filter(
						(bus) => bus.attributes.Type === "RetailBusiness"
					) || [],
				tags: tagsList.data || [],
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				restaurants: [],
				entertainment: [],
				retail: [],
				health: [],
				tags: [],
			},
		};
	}
}
