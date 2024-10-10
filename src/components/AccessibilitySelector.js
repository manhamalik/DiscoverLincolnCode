import React from "react";
import AccessibilityTag from "./AccessibilityTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
export default function AccessibilitySelector({
	endableRemoveIcon,
	tagsData,
	selectedTags,
	handleTagSelect,
	handleTagClicked,
}) {
	const tagsList = new Map();
	tagsData.forEach((element) =>
		tagsList.set(element.attributes.type, {
			displayText: element.attributes.displayText,
			icon: icons[element.attributes.icon],
		})
	);
	const tags = Array.from(tagsList.entries());
	console.log(tags);
	return (
		<div className="accessibility-container">
			<style jsx>
				{`
					.accessibility-container {
						display: flex;
						width: 100%;
						flex-direction: column;
						margin-bottom: 20px;
					}

					.tag-container {
						display: flex;
						width: 100%;
						overflow-y: hidden;
						align-items: center;
						overflow-x: auto;
					}

					.individual-tag {
						flex-shrink: 0;
					}

					label {
						margin-bottom: 5px;
					}

					select {
						padding: 10px;
						width: 100%;
						border: 1px solid #ccc;
						border-radius: 5px;
					}
				`}
			</style>

			<label htmlFor="tags">Accessibility Tags</label>
			<select
				id="tags"
				name="tags"
				onChange={(event) => handleTagSelect(event)}
				multiple
			>
				<option value="">Select tags...</option>
				{tags.map((element) => (
					<option value={element[0]}>{element[1].displayText}</option>
				))}
			</select>
			<div className="tag-container">
				{selectedTags.size > 0 &&
					Array.from(selectedTags).map((element) => (
						<div className="individual-tag">
							<AccessibilityTag
								type={element}
								onClick={() => handleTagClicked(element)}
								endableRemoveIcon={endableRemoveIcon}
								tagsData={tagsData}
							/>
						</div>
					))}
			</div>
		</div>
	);
}
