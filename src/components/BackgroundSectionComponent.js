import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import NextSectionArrow from "./NextSectionArrow";

const BackgroundSectionComponent = ({
	backgroundImage,
	title,
	subtitle,
	children,
	nextSectionId,
	brightness = 1, //number between 0 and 1
	includeArrow = true,
	overflow = "hidden",
	heightOffset = 0,
}) => {
	return (
		<>
			<Image
				src={backgroundImage}
				alt="Background image"
				layout="fill"
				objectFit="cover"
				objectPosition="center"
				style={{ filter: `brightness(${brightness})` }}
			/>
			<div className="background-section">
				<h1 className="title">{title}</h1>
				{subtitle && <h3 className="subtitle">{subtitle}</h3>}{" "}
				{/* Add subtitle here */}
				{children}
				{includeArrow && (
					<NextSectionArrow
						nextSectionId={nextSectionId}
						heightOffset={heightOffset}
					/>
				)}
				<style jsx>{`
					.background-section {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						text-align: center;
						height: calc(100vh - 64px); /* Subtract the navbar height */
						width: 100vw;
						position: relative;
						overflow: ${overflow};
					}

					.title {
						color: white;
						font-size: clamp(3rem, 5vw, 6rem);
						text-align: center;
						margin-bottom: 0;
						text-shadow: 0.1vw 0.2vh 0.3vw rgba(0, 0, 0, 0.5);
						max-width: 90%;
						padding: 0 5%;
					}

					.subtitle {
						color: white;
						font-size: clamp(1.5rem, 2.5vw, 3rem);
						text-shadow: 0.1vw 0.2vh 0.3vw rgba(0, 0, 0, 0.7);
						margin-top: 0;
					}

					@media (max-width: 768px) {
						.title {
							white-space: normal;
							line-height: 1.2;
							word-break: break-word;
						}
					}

					@keyframes bounce {
						0%,
						20%,
						50%,
						80%,
						100% {
							transform: translateY(0);
						}
						40% {
							transform: translateY(-10px);
						}
						60% {
							transform: translateY(-5px);
						}
					}
				`}</style>
			</div>
		</>
	);
};

export default BackgroundSectionComponent;
