import React from "react";

const AboutCard = ({ imageSrc, heading, description }) => {
	return (
		<div className="aboutCard">
			<div className="imageContainer">
				<img src={imageSrc} alt="About Image" className="circularImage" />
			</div>
			<h2 className="aboutHeading">{heading}</h2>
			<p className="aboutDescription">{description}</p>

			<style jsx>{`
				.aboutCard {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					text-align: center;
					background-color: #f9f8f8;
					padding: 1vw;
					padding-top: 2vw;
					padding-bottom: 2vw;
					border-radius: 16px;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					margin: 0;
					width: 25vw;
					height: 50vh;
					transition: transform 0.3s ease, box-shadow 0.3s ease;
				}

				.aboutCard:hover {
					transform: translateY(-10px); /* Lift the card on hover */
					box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
				}

				.imageContainer {
					border-radius: 100%;
					overflow: hidden;
					width: 160px;
					height: 160px;
					border: 4px solid var(--color-beige); /* Border around the image using the global variable */
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Drop shadow on the border */
				}

				.circularImage {
					width: 160px;
					height: 160px;
					object-fit: cover;
					border-radius: 50%;
				}

				.aboutHeading {
					font-family: "Noto Sans Display", sans-serif;
					font-weight: 600; /* Semibold */
					font-size: 2.3rem;
					margin: 1.8vh 0;
				}

				.aboutDescription {
					font-family: "Noto Sans Display", sans-serif;
					font-weight: 400; /* Regular */
					font-size: 1.5rem;
					margin-top: 0;
					margin-bottom: 0;
				}

				/* Tablet media query for screens between 768px and 1080px */
				@media (min-width: 769px) and (max-width: 1500px) {
					.aboutCard {
						width: 50vw;
						height: 60vh;
						padding: 4vw;
					}

					.imageContainer {
						width: 120px;
						height: 120px;
					}

					.circularImage {
						width: 120px;
						height: 120px;
					}

					.aboutHeading {
						font-size: 2rem;
					}

					.aboutDescription {
						font-size: 1.3rem;
					}
				}

				@media (max-width: 768px) {
					.aboutCard {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 60vh;
						width: 100vw;
						padding: 5vw;
						margin: 0;
					}

					.imageContainer {
						width: 160px;
						height: 160px;
					}

					.circularImage {
						width: 160px;
						height: 160px;
					}

					.aboutHeading {
						font-size: 1.5rem;
					}

					.aboutDescription {
						font-size: 1rem;
					}
				}
			`}</style>
		</div>
	);
};

export default AboutCard;
