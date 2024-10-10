import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhone,
	faEnvelope,
	faLink,
	faClock,
	faCalendar,
	faMapMarkerAlt,
	faSignHanging,
	faUser,
	faList,
} from "@fortawesome/free-solid-svg-icons";
import AccessibilitySelector from "./AccessibilitySelector";
import DescriptionTextboxComponent from "./DescriptionTextboxComponent";
import Select from "./Select";
import AddressPicker from "./AddressPicker";
import { useState } from "react";
import { useContext } from "react";
import { FormContext } from "@/contexts/FormContext";
export default function PageComponent({type, name}) {
	const context = useContext(FormContext);
	function handleLocationSelect(latlng) {
		console.log(latlng);
		context.setSelectedlatlng(latlng);
	}

	return (
		<div className="form-container">
			<style jsx>{`
				.form-container {
					display: flex;
					flex-direction: column;
					width: 100%;
					box-sizing: border-box;
				}

				.form-group {
					display: flex;
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
					white-space: nowrap;
					box-sizing: border-box;
				}

				#time-box,
				#date-box {
					flex: 1 1 45%;
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

				input[type="date"]::-webkit-inner-spin-button,
				input[type="date"]::-webkit-calendar-picker-indicator {
					display: none;
					-webkit-appearance: none;
				}

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

			{/* Title */}
			<div className="form-group">
				<div className="form-label-input">
					<label htmlFor="Name">Title <span style={{color: "red"}}>*</span></label>
					<div className="icon-wrapper" tabIndex="0">
						<FontAwesomeIcon icon={faSignHanging} />
						<input type="text" id="title" name="Name" placeholder="Enter title..." />
					</div>
				</div>
			</div>

			{/* Location */}
			<AddressPicker onSelect={(latlng) => handleLocationSelect(latlng)}/>

			{/* Time Start and End */}
			<div className="form-group" id="form-input-pair">
				<div className="form-label-input" id="pair">
					<label htmlFor="time">Time</label>
					<div className="time-container">
						{/* Time Start */}
						<div className="icon-wrapper" id="time-box">
							<FontAwesomeIcon icon={faClock} />
							<input type="time" id="time-start" name="time-start" placeholder="00:00" />
						</div>
						<span className="to-text">to</span>
						{/* Time End */}
						<div className="icon-wrapper" id="time-box">
							<FontAwesomeIcon icon={faClock} />
							<input type="time" id="time-end" name="time-end" placeholder="00:00" />
						</div>
					</div>
				</div>

				{/* Date Start and End */}
				<div className="form-label-input" id="pair">
					<label htmlFor="date">Date</label>
					<div className="date-container">
						{/* Start Date */}
						<div className="icon-wrapper" id="date-box">
							<FontAwesomeIcon icon={faCalendar} />
							<input
								type="date"
								id="start-date"
								name="start-date"
								placeholder="Enter start date..."
							/>
						</div>
						<span className="to-text">to</span>
						{/* End Date */}
						<div className="icon-wrapper" id="date-box">
							<FontAwesomeIcon icon={faCalendar} />
							<input
								type="date"
								id="end-date"
								name="end-date"
								placeholder="Enter end date..."
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Phone and Email */}
			<div className="form-group" id="form-input-pair">
				<div className="form-label-input" id="pair">
					<label htmlFor="Phone">Phone number</label>
					<div className="icon-wrapper">
						<FontAwesomeIcon icon={faPhone} />
						<input type="tel" id="phone" name="PhoneNumber" placeholder="Enter a number..." />
					</div>
				</div>

				<div className="form-label-input" id="pair">
					<label htmlFor="Email">Email</label>
					<div className="icon-wrapper">
						<FontAwesomeIcon icon={faEnvelope} />
						<input type="email" id="email" name="Email" placeholder="Enter your email..." />
					</div>
				</div>
			</div>

			{/* Website */}
			<div className="form-group">
				<div className="form-label-input">
					<label htmlFor="Website">Website</label>
					<div className="icon-wrapper">
						<FontAwesomeIcon icon={faLink} />
						<input type="url" id="website" name="Website" placeholder="Enter a link..." />
					</div>
				</div>
			</div>

			<div className="form-group" id="form-input-pair">
				<div className="form-label-input" id="pair">
					<div className="select-wrapper">
						<Select label="Type" choice={type}/>
					</div>
				</div>
			</div>
			<AccessibilitySelector endableRemoveIcon={true} tagsData={context.tagDataObj} selectedTags={context.selectedTags} handleTagClicked={context.handleTagClicked} handleTagSelect={context.handleTagSelect}/>
			<DescriptionTextboxComponent />
		</div>
	);
}
