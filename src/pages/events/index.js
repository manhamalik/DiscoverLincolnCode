import React, { useState } from "react";
import PageComponent from "@/components/PageComponent";
import EventCard from "@/components/EventCard";
import Bowtie from "@/components/Bowtie";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import NextSectionArrow from "@/components/NextSectionArrow";
import { filterByDateRange } from "../../../util/filterHelpers";

export default function EventsPage({
	cultural,
	food,
	community,
	sports,
	tags,
}) {
	// State to track if "See More" has been clicked for each section
	const [showMoreCultural, setShowMoreCultural] = useState(false);
	const [showMoreFood, setShowMoreFood] = useState(false);
	const [showMoreCommunity, setShowMoreCommunity] = useState(false);
	const [showMoreSport, setShowMoreSport] = useState(false);
	const [typeFilter, setTypeFilter] = useState("Any");
	const [searchString, setSearchString] = useState("");
	const [displayedCultural, setDisplayedCultural] = useState(cultural);
	const [displayedFood, setDisplayedFood] = useState(food);
	const [displayedCommunity, setDisplayedCommunity] = useState(community);
	const [displayedSports, setDisplayedSports] = useState(sports);

	// Toggle "See More" for each section
	const toggleShowMore = (section) => {
		switch (section) {
			case "cultural":
				setShowMoreCultural(!showMoreCultural);
				break;
			case "food":
				setShowMoreFood(!showMoreFood);
				break;
			case "community":
				setShowMoreCommunity(!showMoreCommunity);
				break;
			case "sport":
				setShowMoreSport(!showMoreSport);
				break;
			default:
				break;
		}
	};

	function handleFiltersChanged(incomingFilters) {
		let filteredCultural = [...cultural];
		let filteredFood = [...food];
		let filteredCommunity = [...community];
		let filteredSport = [...sports];
		setTypeFilter(incomingFilters.type);
		setSearchString(incomingFilters.searchString.toLowerCase());

		//do front end filtering on displayed collections
		filteredFood = filterByDateRange(
			filteredFood,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredCommunity = filterByDateRange(
			filteredCommunity,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredCultural = filterByDateRange(
			filteredCultural,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredSport = filterByDateRange(
			filteredSport,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		//sort
		if (incomingFilters.sortDir == "desc") {
			filteredCultural = filteredCultural.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredFood = filteredFood.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredCommunity = filteredCommunity.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredSport = filteredSport.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
		} else {
			filteredCultural = filteredCultural.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredFood = filteredFood.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredCommunity = filteredCommunity.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredSport = filteredSport.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
		}

		setDisplayedCultural(filteredCultural);
		setDisplayedFood(filteredFood);
		setDisplayedCommunity(filteredCommunity);
		setDisplayedSports(filteredSport);
	}

	return (
		<>
			<style jsx>
				{`
					.blue-section {
						position: relative;
						width: 100vw;
						height: calc(100vh - 64px);
						background-image: url("https://imgur.com/oINddmf.png");
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
							font-size: 1.25em;
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
						<h1 className="title">Events</h1>
						<p className="description">
							Discover exciting events happening in Lincoln, Ontario, from local
							festivals to community gatherings and seasonal celebrations!
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
					<SearchBar filtersChanged={handleFiltersChanged} type="events" />
				</div>

				{/* Cultural Events Section */}
				{(typeFilter === "Any" || typeFilter === "Cultural Events") &&
					displayedCultural.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								<span className="heading-title">Cultural Events</span>
								<DropdownButton
									onClick={() => toggleShowMore("cultural")}
									isOpen={showMoreCultural}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedCultural.slice(0, 3).map((e) => (
									<EventCard event={e} />
								))}
								{showMoreCultural &&
									displayedCultural
										.slice(3)
										.map((e) => <EventCard event={e} />)}
							</div>
						</div>
					)}

				{/* Food & Drink Events Section */}
				{(typeFilter === "Any" || typeFilter === "Food & Drink Events") &&
					displayedFood.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Food & Drink Events
								<DropdownButton
									onClick={() => toggleShowMore("food")}
									isOpen={showMoreFood}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedFood.slice(0, 3).map((e) => (
									<EventCard event={e} />
								))}
								{showMoreFood &&
									displayedFood.slice(3).map((e) => <EventCard event={e} />)}
							</div>
						</div>
					)}

				{/* Community Events Section */}
				{(typeFilter === "Any" || typeFilter === "Community Events") &&
					displayedCommunity.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Community Events
								<DropdownButton
									onClick={() => toggleShowMore("community")}
									isOpen={showMoreCommunity}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedCommunity.slice(0, 3).map((e) => (
									<EventCard event={e} />
								))}
								{showMoreCommunity &&
									displayedCommunity
										.slice(3)
										.map((e) => <EventCard event={e} />)}
							</div>
						</div>
					)}

				{/* Sports & Recreation Events Section */}
				{(typeFilter === "Any" ||
					typeFilter === "Sports & Recreational Events") &&
					displayedSports.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Sports & Recreation Events
								<DropdownButton
									onClick={() => toggleShowMore("sport")}
									isOpen={showMoreSport}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedSports.slice(0, 3).map((e) => (
									<EventCard event={e} />
								))}
								{showMoreSport &&
									displayedSports.slice(3).map((e) => <EventCard event={e} />)}
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
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/approved-post?populate[events][populate]=*&pagination[pageSize]=1000`
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
				cultural:
					data.data.attributes.events.data.filter(
						(bus) => bus.attributes.Type === "culturalEvent"
					) || [],
				food:
					data.data.attributes.events.data.filter(
						(bus) => bus.attributes.Type === "food"
					) || [],
				community:
					data.data.attributes.events.data.filter(
						(bus) => bus.attributes.Type === "community"
					) || [],
				sports:
					data.data.attributes.events.data.filter(
						(bus) => bus.attributes.Type === "sports"
					) || [],
				tags: tagsList.data || [],
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				cultural: [],
				food: [],
				community: [],
				sports: [],
				tags: [],
			},
		};
	}
}
