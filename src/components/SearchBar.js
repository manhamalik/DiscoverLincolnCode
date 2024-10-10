import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faMagnifyingGlass,
	faAngleDown,
	faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { allTags } from "./AccessibilityTag";
import AccessibilityTag from "./AccessibilityTag";
import Dropdown from "./Dropdown";
import Select from "./Select";
import AccessibilitySelector from "./AccessibilitySelector";

/** *
 * type:  attractions
 *        events
 *        businesses
 *
 */

export default function SearchBar({ type, filtersChanged = () => {} }) {
	const [dropdownOpen, setDropdown] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [sort, setSort] = useState("None");
	const [sortDir, setSortDir] = useState("asc");
	const [typeText, setTypeText] = useState("Any");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isMobile, setIsMobile] = useState(false);

	let searchBarType = 0;
	let searchBarText = "Search for Attractions";

	if (type === "events") {
		searchBarType = 1;
		searchBarText = "Search for Events";
	} else if (type === "businesses") {
		searchBarType = 2;
		searchBarText = "Search for Businesses";
	}

	const choicesArray = [
		[
			"Any",
			"Natural Attractions",
			"Historical Attractions",
			"Cultural Attractions",
			"Recreational Attractions",
		],
		[
			"Any",
			"Cultural Events",
			"Food & Drink Events",
			"Community Events",
			"Sports & Recreational Events",
		],
		[
			"Any",
			"Restaurants & Cafes",
			"Retail Businesses",
			"Entertainment & Recreation",
			"Health & Wellness",
		],
	];

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 420);
		};

		handleResize(); // Initial check
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		// Call filtersChanged with current filter params whenever they change
		filtersChanged({
			type: typeText,
			searchString,
			startDate,
			endDate,
			sort,
			sortDir,
		});
	}, [typeText, startDate, endDate, searchString, sort, sortDir]);

	// Handler functions
	const handleTypeClick = (e) => {
		setTypeText(e.target.value);
	};

	const handleSortChange = (e) => {
		setSort(e.target.value);
	};

	const handleSortDirChange = (e) => {
		setSortDir(e.target.value);
	};

	const handleStartDateChange = (event) => {
		const date = event.target.value;
		setStartDate(date);
	};

	const handleEndDateChange = (event) => {
		const date = event.target.value;
		setEndDate(date);
	};

	return (
		<>
			<div
				name="search-bar"
				className="search-container"
				id={dropdownOpen ? "search-expanded" : null}
			>
				<div className="search-bar-elements">
					<div className="search-bar-inner-container">
						<input
							className="search-bar"
							type="text"
							value={searchString}
							onChange={(e) => setSearchString(e.target.value)}
							placeholder={isMobile ? "Search" : `Search for ${type}`}
						/>
						<FontAwesomeIcon
							icon={faMagnifyingGlass}
							size="2x"
							style={{ color: "var(--color-primary)" }}
						/>
					</div>
					<FontAwesomeIcon
						icon={faBars}
						size="2x"
						style={{ color: "var(--color-primary)", alignSelf: "center" }}
						onClick={() => {
							setDropdown(!dropdownOpen);
						}}
					/>
				</div>
				<div
					className="dropdown-menu"
					id={dropdownOpen ? "dropdown-open" : "dropdown-closed"}
				>
					<div className="select-outer-container">
						<Select
							label={"Type"}
							choice={choicesArray[searchBarType]}
							onChange={handleTypeClick}
						/>
						{type == "events" && (
							<div className="select-container">
								<label htmlFor="Start">Start Date:</label>
								<input
									name="Start"
									type="date"
									onChange={handleStartDateChange}
								/>
								<label className="endFormat" htmlFor="End">End Date:</label>
								<input name="End" type="date" onChange={handleEndDateChange} />
							</div>
						)}
					</div>
					<div className="line"></div>

					<div className="select-outer-container">
						<Select
							label={"sort"}
							choice={["Alphabetical"]}
							onChange={handleSortChange}
						/>
						<div style={{ paddingTop: "16px" }}></div>
						<Select
							label={"sort Direction"}
							choice={["ascending", "descending"]}
							onChange={handleSortDirChange}
							className="custom-select"
						/>
						</div>
				</div>
			</div>
			<style jsx>
				{`
					.search-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						height: fit-content; /* Adjusted height to fit content */
						margin: 2em 0em;
						padding: 2em;
						width: auto;
					}
					#search-expanded {
						height: fit-content;
					}

					.search-bar-inner-container {
						margin-right: 2em;
						height: 3em;
						width: 100%;
						display: flex;
						align-items: center;
						border: 3px solid var(--color-primary);
						border-radius: 25px;
						padding-left: 2em;
						padding-right: 1em;
					}
					.search-bar {
						width: 100%;
						height: 2em;
						border: none;
						font-size: 1rem;
						margin-right: 1em;
						outline: none;
					}
					.dropdown-menu {
						margin-top: 1em;
						width: 70%;
						border: 3px solid var(--color-primary);
						border-radius: 16px;
						padding: 2em;
						padding-bottom:0;
						margin-bottom:0;
					}
					.search-bar-elements {
						display: flex;
						align-items: center;
						width: 50%;
					}
					#dropdown-open {
						display: flex;
						justify-content: space-around;
					}
					#dropdown-closed {
						display: none;
					}
					.select-container {
						display: flex;
						flex-direction: column;
						padding-bottom: 0;
						margin-bottom: 0;
						padding-top:16px;
					}
					.endFormat {
						padding-top:16px;
					}
					.directionFormat {
						padding-top:50px;
					}
					.select-outer-container {
						display: flex;
						flex-direction: column;
						width: 40%;
						margin-right: 4em;
						margin-bottom: 0;
						padding-bottom: 0;
					}
					label {
						margin-bottom: 5px;
					}
					input[type="date"] {
						box-sizing: border-box;
						padding: 10px;
						width: 100%;
						border: 1px solid #ccc;
						border-radius: 5px;
					}
					h3 {
						margin-bottom: 0.3em;
					}
					.line {
						width: 0px;
						height: 16em;
						background-color: rgba(0, 0, 0, 0.2);
						align-self: center;
						margin-right: 2em;
					}
					.options-container {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						width: 80%;
						height: 3em;
						border: 2px solid black;
						border-radius: 4px;
						padding: 0 1em 0 0.5em;
					}
					.accessibility-container {
						display: flex;
						align-items: center;
						width: 90%;
						height: 100%;
						overflow-x: auto;
						overflow-y: hidden;
					}
					#accessibility-options {
						height: 6em;
					}
					p {
						white-space: nowrap;
					}
					@media screen and (max-width: 800px) {
						input[type="date"] {
							width: 90%;
						}
						.line {
							display: none;
						}
						#dropdown-open {
							flex-direction: column;
							align-items: center;
						}
						.select-container {
							margin: 0;
							width: 100%;
						}
						.select-outer-container {
							margin-right: 0;
							width: 100%;
							margin-bottom: 1em; 
						}
						.search-bar-elements {
							width: 90%;
						}
						.search-bar {
							margin-right: 0em; /* Fixed typo in margin-right */
							font-size: 1rem;
						}
						.options-container {
							width: 90%;
						}
					}
				`}
			</style>
		</>
	);
}
