import React from "react";
import { useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleArrowRight,
	faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const DetailImageCarousel = ({ imageArray }) => {
	const CustomArrowGroup = ({ next, previous, goToSlide, ...rest }) => {
		const {
			carouselState: { currentSlide },
		} = rest;
		return (
			<>
				<div className="buttonFill">
					<button className="hideButton buttonLeft" onClick={() => previous()}>
						<FontAwesomeIcon
							className="arrow"
							icon={faCircleArrowLeft}
							size={"3x"}
							color={"white"}
							style={{ border: "1px solid #EEEEEE", borderRadius: "200px" }}
						/>
					</button>
					<button className="hideButton buttonRight" onClick={() => next()}>
						<FontAwesomeIcon
							className="arrow"
							icon={faCircleArrowRight}
							size={"3x"}
							color={"white"}
							style={{ border: "1px solid #EEEEEE", borderRadius: "200px" }}
						/>
					</button>
				</div>
				<style jsx>{`
					.buttonFill {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: fit-content;
						position: absolute;
					}
					.hideButton {
						outline: none;
						border: none;
						cursor: pointer;
						overflow: hidden;
						background-color: transparent;
					}
					.buttonLeft {
						position: absolute;
						left: 20px;
					}
					.buttonRight {
						position: absolute;
						right: 20px;
					}
					.arrow {
						color: color-primary;
					}

					.buttonRight:hover,
					.buttonLeft:hover {
						filter: brightness(0.8);
					}
				`}</style>
			</>
		);
	};

	const CustomDots = ({ onClick, ...rest }) => {
		const {
			onMove,
			index,
			active,
			carouselState: { currentSlide, deviceType },
		} = rest;
		// onMove means if dragging or swiping in progress.
		// active is provided by this lib for checking if the item is active or not.
		return (
			<>
				<button className={"hideButton"} onClick={() => onClick()}>
					<div
						style={{
							backgroundColor: active ? "var(--color-primary)" : "#FFFFFF",
							width: "25px",
							height: "25px",
							margin: "10px 10px",
							borderRadius: "50%",
						}}
					></div>
				</button>
				<style jsx>{`
					.hideButton {
						outline: none;
						border: none;
						cursor: pointer;
						overflow: hidden;
						background-color: transparent;
					}
				`}</style>
			</>
		);
	};

	const responsiveProp = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
			slidesToSlide: 1,
		},

		tablet: {
			breakpoint: { max: 1024, min: 768 },
			items: 1,
			slidesToSlide: 1,
		},

		mobile: {
			breakpoint: { max: 3000, min: 0 },
			items: 1,
			slidesToSlide: 1,
		},
	};

	return (
		<>
			<div className="carousel-container">
				<Carousel
					swipeable={true}
					draggable={true}
					responsive={responsiveProp}
					transitionDuration={300}
					arrows={false}
					infinite={true}
					showDots={true}
					customButtonGroup={<CustomArrowGroup />}
					customDot={<CustomDots />}
				>
					{imageArray.map((image, i) => (
						<div className="detail-image-carousel">
							<img
								src={image}
								key={i}
								alt={`Image ${i + 1}`}
								width={"100%"}
								height={"100%"}
								style={{ objectFit: "cover", positon: "absolute" }}
								className="imgAfter"
							></img>
						</div>
					))}
				</Carousel>
			</div>
			<style jsx>{`
				.carousel-container {
					width: 50vw;
					height: calc(100vh - 64px);
				}
				.detail-image-carousel {
					width: 50vw;
					height: calc(100vh - 64px);
					overflow: hidden;
					position: relative;
					display: block;
				}
				@media only screen and (max-width: 768px) {
					.detail-image-carousel {
						width: 100vw;
						height: 24em;
					}
					.carousel-container {
						width: 100vw;
						height: 24em;
					}
				}
			`}</style>
		</>
	);
};

export default DetailImageCarousel;
