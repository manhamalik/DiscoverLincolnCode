import React, { useState } from "react";
import PageComponent from "@/components/PageComponent";
import AttractionCard from "@/components/AttractionCard";
import Bowtie from "@/components/Bowtie";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import NextSectionArrow from "@/components/NextSectionArrow";
import { filterByDateRange } from "../../../util/filterHelpers";

export default function AttractionsPage({
	natural,
	historical,
	cultural,
	recreational,
	tags,
}) {
	// State to track if "See More" has been clicked for each section
	const [showMoreNatural, setShowMoreNatural] = useState(false);
	const [showMoreHistorical, setShowMoreHistorical] = useState(false);
	const [showMoreCultural, setShowMoreCultural] = useState(false);
	const [showMoreRecreational, setShowMoreRecreational] = useState(false);
	const [typeFilter, setTypeFilter] = useState("Any");
	const [searchString, setSearchString] = useState("");
	const [displayedNatural, setDisplayedNatural] = useState(natural);
	const [displayedHistorical, setDisplayedHistorical] = useState(historical);
	const [displayedCultural, setDisplayedCultural] = useState(cultural);
	const [displayedRecreational, setDisplayedRecreational] =
		useState(recreational);

	// Toggle "See More" for each section
	const toggleShowMore = (section) => {
		switch (section) {
			case "natural":
				setShowMoreNatural(!showMoreNatural);
				break;
			case "historical":
				setShowMoreHistorical(!showMoreHistorical);
				break;
			case "cultural":
				setShowMoreCultural(!showMoreCultural);
				break;
			case "recreational":
				setShowMoreRecreational(!showMoreRecreational);
				break;
			default:
				break;
		}
	};

	function handleFiltersChanged(incomingFilters) {
		let filteredNatural = [...natural];
		let filteredHistorical = [...historical];
		let filteredCultural = [...cultural];
		let filteredRecreational = [...recreational];
		setTypeFilter(incomingFilters.type);
		setSearchString(incomingFilters.searchString.toLowerCase());

		//do front end filtering on displayed collections
		filteredNatural = filterByDateRange(
			filteredNatural,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		filteredHistorical = filterByDateRange(
			filteredHistorical,
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

		filteredRecreational = filterByDateRange(
			filteredRecreational,
			incomingFilters.startDate,
			incomingFilters.endDate
		).filter((b) =>
			b.attributes.Name.toLowerCase().includes(
				incomingFilters.searchString.toLowerCase()
			)
		);

		//sort
		if (incomingFilters.sortDir == "desc") {
			filteredNatural = filteredNatural.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredHistorical = filteredHistorical.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredCultural = filteredCultural.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
			filteredRecreational = filteredRecreational.sort((a, b) =>
				b.attributes.Name.localeCompare(a.attributes.Name)
			);
		} else {
			filteredNatural = filteredNatural.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredHistorical = filteredHistorical.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredCultural = filteredCultural.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
			filteredRecreational = filteredRecreational.sort((a, b) =>
				a.attributes.Name.localeCompare(b.attributes.Name)
			);
		}

		setDisplayedNatural(filteredNatural);
		setDisplayedHistorical(filteredHistorical);
		setDisplayedCultural(filteredCultural);
		setDisplayedRecreational(filteredRecreational);
	}

	return (
		<>
			<style jsx>
				{`
					.blue-section {
						position: relative;
						width: 100vw;
						height: calc(100vh - 64px);
						background-image: url("https://imgur.com/dHVCUu2.png");
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
						z-index: 10;
						position: absolute;
						bottom: 20px;
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
						<h1 className="title">Attractions</h1>
						<p className="description">
							Explore the many attractions and hidden gems that make Lincoln,
							Ontario a vibrant and unique destination!
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
					<SearchBar filtersChanged={handleFiltersChanged} type="attractions" />
				</div>

				{/* Natural Attractions Section */}
				{(typeFilter === "Any" || typeFilter === "Natural Attractions") &&
					displayedNatural.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								<span className="heading-title">Natural Attractions</span>
								<DropdownButton
									onClick={() => toggleShowMore("natural")}
									isOpen={showMoreNatural}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedNatural
									.filter((a) =>
										a.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((a) => (
										<AttractionCard attraction={a} />
									))}
								{showMoreNatural &&
									displayedNatural
										.filter((a) =>
											a.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((a) => <AttractionCard attraction={a} />)}
							</div>
						</div>
					)}

				{/* Historical Attractions Section */}
				{(typeFilter === "Any" || typeFilter === "Historical Attractions") &&
					displayedHistorical.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Historical Attractions
								<DropdownButton
									onClick={() => toggleShowMore("historical")}
									isOpen={showMoreHistorical}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedHistorical
									.filter((a) =>
										a.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((a) => (
										<AttractionCard attraction={a} />
									))}
								{showMoreHistorical &&
									displayedHistorical
										.filter((a) =>
											a.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((a) => <AttractionCard attraction={a} />)}
							</div>
						</div>
					)}

				{/* Cultural Attractions Section */}
				{(typeFilter === "Any" || typeFilter === "Cultural Attractions") &&
					displayedCultural.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Cultural Attractions
								<DropdownButton
									onClick={() => toggleShowMore("cultural")}
									isOpen={showMoreCultural}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedCultural
									.filter((a) =>
										a.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((a) => (
										<AttractionCard attraction={a} />
									))}
								{showMoreCultural &&
									displayedCultural
										.filter((a) =>
											a.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((a) => <AttractionCard attraction={a} />)}
							</div>
						</div>
					)}

				{/* Recreational Natural Attractions Section */}
				{(typeFilter === "Any" || typeFilter === "Recreational Attractions") &&
					displayedRecreational.length > 0 && (
						<div className="attractions-section">
							<h2 className="attractions-heading">
								Recreational Natural Attractions
								<DropdownButton
									onClick={() => toggleShowMore("recreational")}
									isOpen={showMoreRecreational}
								/>
							</h2>
							<div className="attraction-grid">
								{displayedRecreational
									.filter((a) =>
										a.attributes.Name.toLowerCase().includes(searchString)
									)
									.slice(0, 3)
									.map((a) => (
										<AttractionCard attraction={a} />
									))}
								{showMoreRecreational &&
									displayedRecreational
										.filter((a) =>
											a.attributes.Name.toLowerCase().includes(searchString)
										)
										.slice(3)
										.map((a) => <AttractionCard attraction={a} />)}
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
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/approved-post?populate[attractions][populate]=*&pagination[pageSize]=1000`
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
				natural:
					data.data.attributes.attractions.data.filter(
						(bus) => bus.attributes.Type === "NaturalAttraction"
					) || [],
				historical:
					data.data.attributes.attractions.data.filter(
						(bus) => bus.attributes.Type === "HistoricalAttraction"
					) || [],
				cultural:
					data.data.attributes.attractions.data.filter(
						(bus) => bus.attributes.Type === "CulturalAttraction"
					) || [],
				recreational:
					data.data.attributes.attractions.data.filter(
						(bus) => bus.attributes.Type === "RecreationalAttraction"
					) || [],
				tags: tagsList.data || [],
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				natural: [],
				historical: [],
				cultural: [],
				recreational: [],
				tags: [],
			},
		};
	}
}
