import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const tagList = new Map([
	["parking", { displayText: "Accessible Parking", icon: icons["faSquareParking"] }],
	["serviceAnimal", { displayText: "Service Animals Welcome", icon: icons["faDog"] }],
	["washroom", { displayText: "Washrooms Available", icon: icons["faRestroom"] }],
	["wheelChair", { displayText: "Wheelchair-Accessible", icon: icons["faWheelchair"] }],
	["vegetarian", { displayText: "Vegan Options", icon: icons["faCarrot"] }],
	["wifi", { displayText: "Wifi-Available", icon: icons["faWifi"] }],
]);

export function allTags() {
	return tagList.keys();
}

export function allEntries(){
    return tagList.entries();
}

export default function AccessibilityTag({
	type,
	onClick = () => {},
	endableRemoveIcon = false,
	tagsData
}) {
	const tagsList = new Map();
	console.log(tagsData);
	tagsData.forEach(element => tagsList.set(element.attributes.type, {displayText: element.attributes.displayText, icon: icons[element.attributes.icon]}));
	console.log(tagsList);
	const icon = tagsList.get(type).icon;
	const text = tagsList.get(type).displayText;

	return (
		<div
			className="tag-container"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					onClick(); // Execute onClick when Enter is pressed
				}
			}}
		>
			<style jsx>
				{`
					.tag-container {
						display: flex;
						background-color: #ebebeb;
						width: fit-content;
						align-items: center;
						justify-content: space-between;
						border-radius: 15px;
						height: 2.4em;
						padding: 0em 1em 0em 1em;
						margin: 0.5em;
					}

					p {
						margin-left: 1em;
					}

					.remove-icon {
						display: none;
					}

					.remove-icon:hover {
						display: inline;
					}

					.tag-container:hover .remove-icon {
						display: inline;
						margin-left: 1em;
					}
				`}
			</style>
			<FontAwesomeIcon icon={icon} size="2x" />
			<p>{text}</p>
			{endableRemoveIcon ? (
				<div className={endableRemoveIcon ? "remove-icon" : null}>
					<FontAwesomeIcon icon={icons["faX"]} />
				</div>
			) : null}
		</div>
	);
}
