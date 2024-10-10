import React from "react";
import mapImage from "../../public/images/image_1.png";
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
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import Button from "./Button";
import { Context } from "../pages/map.js";

export default function MapFilter() {
	const filterSet = useContext(Context);
	const [hasBeenSelected, setSelected] = useState(new Array(12).fill(false)); // Tracks individual selections
	const [selectAll, setSelectAll] = useState(new Array(3).fill(false)); // Tracks 'Select All' status
	const filters = [
		{
			category: "Businesses",
			individual: [
				{
					icon: faChampagneGlasses,
					type: "EntertainmentBusiness",
					name: "Entertainment",
					color: "#015BC4",
					filterID: 0,
				},
				{
					icon: faHeart,
					type: "HealthBusiness",
					name: "Health & Wellness",
					color: "#015BC4",
					filterID: 1,
				},
				{
					icon: faBurger,
					type: "RestaurantBusiness",
					name: "Restaurants & Cafes",
					color: "#015BC4",
					filterID: 2,
				},
				{
					icon: faBagShopping,
					type: "RetailBusiness",
					name: "Retail Businesses",
					color: "#015BC4",
					filterID: 3,
				},
			],
		},
		{
			category: "Attractions",
			individual: [
				{
					icon: faTree,
					type: "NaturalAttraction",
					name: "Natural Attractions",
					color: "#027B00",
					filterID: 4,
				},
				{
					icon: faBookOpenReader,
					type: "HistoricalAttraction",
					name: "Historical Attractions",
					color: "#027B00",
					filterID: 5,
				},
				{
					icon: faFeatherPointed,
					type: "CulturalAttraction",
					name: "Cultural Attractions",
					color: "#027B00",
					filterID: 6,
				},
				{
					icon: faPersonWalking,
					type: "RecreationalAttraction",
					name: "Recreational Attractions",
					color: "#027B00",
					filterID: 7,
				},
			],
		},
		{
			category: "Events",
			individual: [
				{
					icon: faLeaf,
					type: "culturalEvent",
					name: "Cultural Events",
					color: "#CF5700",
					filterID: 8,
				},
				{
					icon: faBowlFood,
					type: "food",
					name: "Food & Drink Events",
					color: "#CF5700",
					filterID: 9,
				},
				{
					icon: faPeopleGroup,
					type: "community",
					name: "Community Events",
					color: "#CF5700",
					filterID: 10,
				},
				{
					icon: faFutbol,
					type: "sports",
					name: "Sports & Recreational Events",
					color: "#CF5700",
					filterID: 11,
				},
			],
		},
	];

	function handleIndividualClick(element) {
		const newSelected = [...hasBeenSelected];
		const newSelectAll = [...selectAll];
		const newFilterSet = new Set(filterSet.filterSelected);

		newSelected[element.filterID] = !newSelected[element.filterID];
		if (newSelected[element.filterID]) {
			newFilterSet.add(element.type);
		} else {
			newFilterSet.delete(element.type);
		}

		// Update 'Select All' button status for category
		const categoryIndex = Math.floor(element.filterID / 4);
		const categorySelected = newSelected.slice(
			categoryIndex * 4,
			categoryIndex * 4 + 4
		);
		newSelectAll[categoryIndex] = categorySelected.every(
			(selected) => selected
		);

		setSelected(newSelected);
		filterSet.setFilterSelected(newFilterSet);
		setSelectAll(newSelectAll);
	}

	function handleSelectAllClick(filterCategory, index) {
		const newFilteredSet = new Set(filterSet.filterSelected);
		const newSelected = [...hasBeenSelected];
		const newSelectAll = [...selectAll];

		if (!newSelectAll[index]) {
			filterCategory.individual.forEach((element) => {
				newFilteredSet.add(element.type);
				newSelected[element.filterID] = true;
			});
		} else {
			filterCategory.individual.forEach((element) => {
				newFilteredSet.delete(element.type);
				newSelected[element.filterID] = false;
			});
		}

		newSelectAll[index] = !newSelectAll[index];
		setSelectAll(newSelectAll);
		filterSet.setFilterSelected(newFilteredSet);
		setSelected(newSelected);
	}

	return (
		<div className="filter-container">
			<style jsx>
				{`
					.filter-container {
						display: flex;
						width: 20vw;
						flex-direction: column;
						align-items: center;
					}

					h2 {
						font-size: 1.2rem;
						margin: 0 0 0.5em 0;
						text-decoration: underline;
					}

					.category-container {
						display: flex;
						flex-direction: column;
						width: 90%;
						padding-bottom:20px;
					}

					.individual-container {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						padding: 0.5em;
						margin-bottom: 6px;
						cursor: pointer;
						font-size: 0.9rem;
					}

					.individual-container:hover {
						border: 2px solid rgba(43, 92, 186, 0.81);
						border-radius: 10px;
					}

					#clicked-individual {
						background-color: #d9d9d9;
						border-radius: 10px;
					}

					#not-clicked-individual {
						background-color: white;
					}

					h3 {
						font-size: 0.9rem;
						user-select: none;
						margin: 0;
					}

					.title-container {
						display: flex;
						justify-content: space-between;
						margin-bottom: 0.5em;
						font-size: 0.9rem;
					}

					.button-container {
						width: 90px;
						font-size: 0.9rem; /* Smaller text */
						// padding-bottom:5px;
					}

					input[type="text"] {
						border: none;
					}

					input[type="text"]:focus {
						outline: none;
					}

					.search-bar-container {
						border: 2px solid var(--color-primary);
						border-radius: 20px;
						display: flex;
						justify-content: space-between;
						padding: 0.5em 1em;
						box-sizing: border-box;
						align-items: center;
						width: 100%;
					}

					.search-bar-container:focus-within {
						border: 2px solid black;
					}

					.search-bar-outer {
						display: flex;
						justify-content: space-between;
						width: 100%;
					}
					@media screen and (max-width: 1230px) {
						.filter-container {
							width: 100%;
							margin-top: 16px;
						}
					}

					@media screen and (max-width: 320px) {
						.category-container {
							width: 100%;
						}
					}
				`}
			</style>

			{filters.map((filter, index) => (
				<div className="category-container" key={index}>
					<div className="title-container">
						<h2>{filter.category}</h2>
						<div className="button-container">
							<Button onClick={() => handleSelectAllClick(filter, index)}>
								{selectAll[index] ? "Clear All" : "Select All"}
							</Button>
						</div>
					</div>

					{filter.individual.map((element) => (
						<div
							className="individual-container"
							id={
								hasBeenSelected[element.filterID]
									? "clicked-individual"
									: "not-clicked-individual"
							}
							onClick={() => handleIndividualClick(element)}
							key={element.filterID}
						>
							<FontAwesomeIcon
								icon={element.icon}
								size="sm" /* Smaller icons */
								style={{
									marginRight: "0.5em",
									color: element.color,
								}}
							/>
							<h3>{element.name}</h3>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
