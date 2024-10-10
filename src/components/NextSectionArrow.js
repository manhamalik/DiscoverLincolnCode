import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const NextSectionArrow = ({ nextSectionId, heightOffset = 0 }) => {
	const handleScrollDown = () => {
		const nextSection = document.getElementById(nextSectionId);
		if (nextSection) {
			const navbarHeight = 64;
			const sectionTop =
				nextSection.getBoundingClientRect().top +
				window.pageYOffset -
				navbarHeight +
				heightOffset;

			window.scrollTo({
				top: sectionTop,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			<div className="arrow">
				<FontAwesomeIcon
					icon={faAngleDown}
					onClick={handleScrollDown}
					size="5x"
				/>
			</div>

			<style jsx>{`
				.arrow {
					color: white;
					cursor: pointer;
					position: absolute;
					bottom: 20px;
					left: 50%;
					transform: translate(-50%, 0);
					transition: transform 0.3s ease;
				}
				.arrow:hover {
					transform: translateY(-5px) translate(-50%, 0);
				}
			`}</style>
		</>
	);
};

export default NextSectionArrow;
