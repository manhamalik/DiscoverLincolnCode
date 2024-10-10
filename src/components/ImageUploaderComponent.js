import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FormContext } from "@/contexts/FormContext";
import toast from "react-hot-toast";
const ImageUploaderComponent = () => {
	const context = useContext(FormContext);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Only execute this on the client side
		const updateIsMobile = () => setIsMobile(window.innerWidth <= 821);

		if (typeof window !== "undefined") {
			updateIsMobile(); // Run once when the component mounts
			window.addEventListener("resize", updateIsMobile);

			return () => window.removeEventListener("resize", updateIsMobile);
		}
	}, []);

	const handleFileChange = (event) => {
		const files = Array.from(event.target.files);
		try{
			console.log(files.every(element => element.size < 1000000));
			if (files.every(element => element.size < 1000000)){
				context.setSelectedFiles(context.selectedFiles.concat(files));
			} else {
				throw new Error("Images cannot exceed 1000kb");
			}
		} catch(error) {
			toast.error(error.message);
		}
	};

	const makePrimaryPhoto = (index) => {
		if (index > 0) {
			const newFiles = [...context.selectedFiles];
			const [newPrimary] = newFiles.splice(index, 1); // Remove the selected file
			newFiles.unshift(newPrimary); // Move it to the first position
			context.setSelectedFiles(newFiles); // Update the state
		}
	};

	const deletePhoto = (index) => {
		if (index > 0) {
			const newFiles = [...context.selectedFiles];
			newFiles.splice(index, 1); // Remove the selected file
			context.setSelectedFiles(newFiles)
		}
	};

	return (
		<div className="uploader-container">
			{/* Primary Photo Section */}
			<div className="primary-photo">
				<h2>Primary Photo <span style={{color: "red"}}>*</span></h2>
				<div className="primary-photo-wrapper">
					{context.selectedFiles.length > 0 ? (
						<div className="primary-photo-img">
							<Image
								src={URL.createObjectURL(context.selectedFiles[0])} // Display the first image
								alt="Primary"
								layout="fill"
								objectFit="cover" // Ensure the image fits without stretching
							/>
						</div>
					) : (
						<div className="empty-primary-photo" />
					)}
				</div>
			</div>

			{/* Additional Photos Section */}
			<div className="additional-photos">
				<h3>Additional Photos</h3>
				<div className="photo-grid">
					{context.selectedFiles.length > 1 &&
						context.selectedFiles.slice(1).map((file, index) => (
							<div
								className={`additional-photo ${isMobile ? "mobile" : ""}`}
								key={index + 1}
							>
								<div className="photo-wrapper">
									<Image
										src={URL.createObjectURL(file)} // Display additional photos
										alt={`Additional ${index + 1}`}
										layout="fill"
										objectFit="cover" // Ensure the image fits without stretching
									/>
									<button
										className="make-primary-button"
										onClick={(e) => {e.stopPropagation(); e.preventDefault(); makePrimaryPhoto(index + 1)}} // Pass the correct index
									>
										Make Primary
									</button>
									<button
										className="delete-button"
										onClick={(e) => {e.stopPropagation(); e.preventDefault(); deletePhoto(index + 1)}} // Pass the correct index
									>
										Delete
									</button>
								</div>
							</div>
						))}

					{/* File upload box */}
					<label
						htmlFor="file-upload"
						className={`upload-label ${isMobile ? "mobile" : ""}`}
					>
						<div className="upload-box">
							<FontAwesomeIcon icon={faFolderPlus} size="4x" />
						</div>
						<input
							accept="image/*"
							id="file-upload"
							type="file"
							className="file-input"
							multiple
							onChange={handleFileChange}
						/>
					</label>
				</div>
			</div>

			<style jsx>{`
				.uploader-container {
					padding: 20px;
				}
				.primary-photo {
					margin-bottom: 20px;
				}
				.primary-photo-wrapper {
					display: flex;
					justify-content: flex-start;
				}
				.primary-photo-img {
					position: relative;
					width: 100%;
					max-width: 800px;
					height: 400px;
					border-radius: 8px;
					border: 2px solid black;
					overflow: hidden;
				}
				.empty-primary-photo {
					width: 100%;
					max-width: 800px;
					height: 400px;
					border-radius: 8px;
					border: 2px solid black;
					background-color: #f0f0f0;
				}
				.additional-photos {
					width: 100%;
					max-width: 800px;
				}
				.photo-grid {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 1fr;
					gap: 8px;
				}
				.additional-photo {
					position: relative;
					height: 150px;
					border-radius: 8px;
					border: 2px solid black;
					overflow: hidden;
				}

				.photo-wrapper {
					position: relative;
					width: 100%;
					height: 100%;
				}
				.make-primary-button {
					position: absolute;
					bottom: 10px;
					left: 50%;
					transform: translateX(-50%);
					background-color: rgba(0, 0, 0, 0.6);
					color: white;
					border: none;
					padding: 5px 10px;
					border-radius: 5px;
					cursor: pointer;
					font-size: 12px;
				}
				.make-primary-button:hover {
					background-color: rgba(0, 0, 0, 0.8);
				}
				.delete-button {
					position: absolute;
					bottom: 120px;
					left: 50%;
					transform: translateX(-50%);
					background-color: rgba(200, 0, 0, 0.6);
					color: white;
					border: none;
					padding: 5px 10px;
					border-radius: 5px;
					cursor: pointer;
					font-size: 12px;
				}
				.delete-button:hover {
					background-color: rgba(255, 0, 0, 0.8);
				}
				.upload-label {
					display: block;
					flex: 1 1 calc(18% - 10px);
				}
				.upload-label.mobile {
					flex: 1 1 calc(40% - 10px);
				}
				.upload-box {
					height: 150px;
					width: 100%;
					border-radius: 8px;
					border: 2px solid black;
					background-color: #f0f0f0;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
				}
				.file-input {
					display: none;
				}

				@media screen and (max-width: 768px) {
					.photo-grid {
						grid-template-columns: 1fr 1fr;
					}
				}
			`}</style>
		</div>
	);
};

export default ImageUploaderComponent;
