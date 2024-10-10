import React, { useState, useEffect } from "react";
import PageComponent from "@/components/PageComponent";
import Bowtie from "@/components/Bowtie";
import BackgroundSectionComponent from "@/components/BackgroundSectionComponent";
import LandingAttractionCard from "@/components/LandingAttractionCard";
import LandingBusinessCard from "@/components/LandingBusinessCard";
import LandingEventCard from "@/components/LandingEventCard";
import Leaderboard from "@/components/Leaderboard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NextSectionArrow from "@/components/NextSectionArrow";
import TypingAnimation from "@/components/TypingAnimation";

export async function getServerSideProps() {
    try {
        // Fetch featured events
        const featuredEvents = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/featured-post?populate[events][populate]=*`
        );

        if (!featuredEvents.ok) {
            throw new Error("Failed to fetch featured events data");
        }

        const featuredEventsData = await featuredEvents.json();
        const events = featuredEventsData.data?.attributes?.events?.data || [];

        // Fetch featured attractions
        const featuredAttractions = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/featured-post?populate[attractions][populate]=*`
        );

        if (!featuredAttractions.ok) {
            throw new Error("Failed to fetch featured attractions data");
        }

        const featuredAttractionsData = await featuredAttractions.json();
        const attractions =
            featuredAttractionsData.data?.attributes?.attractions?.data || [];

        // Fetch featured businesses
        const featuredBusinesses = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/featured-post?populate[businesses][populate]=*`
        );

        if (!featuredBusinesses.ok) {
            throw new Error("Failed to fetch featured businesses data");
        }

        const featuredBusinessesData = await featuredBusinesses.json();
        const businesses =
            featuredBusinessesData.data?.attributes?.businesses?.data || [];

        return {
            props: {
                events,
                attractions,
                businesses,
            },
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return {
            props: {
                events: [],
                attractions: [],
                businesses: [],
            },
        };
    }
}

export default function index({ events, attractions, businesses }) {
    const attractionHref = "/attractions";
    const businessHref = "/businesses";
    const eventsHref = "/events";

    const CustomArrowGroup = ({ next, previous }) => {
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
                    @media only screen and (max-width: 768px) {
                        .buttonRight,
                        .buttonLeft {
                            display: none;
                        }
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
                            backgroundColor: active ? "var(--color-secondary)" : "#FFFFFF",
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
        mobile: {
            breakpoint: { max: 1920, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    return (
        <>
            <style jsx global>
                {`
                    .blue-section {
                        position: relative;
                        width: 100vw;
                        height: calc(100vh - 64px);
                        background-image: url("https://imgur.com/MBbPGif.png");
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                    }
                    .content-box {
                        position: relative;
                        z-index: 2;
                        max-width: 100%;
                        color: white;
                        font-weight: bold;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .title {
                        font-size: 6em;
                        margin-bottom: 0;
                        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
                    }
                    .description {
                        font-size: 1.2em;
                        margin-top: 0;
                        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
                    }
                    .custom-arrow-position {
                        position: absolute;
                        bottom: 20px;
						z-index: 3;
                    }
                    .bowtie-container {
                        position: absolute;
                        top: 0;
                        transform: translate(0%, -50%);
                        pointer-events: none;
                    }
                    .image-div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        height: 100vh;
                        min-height: 960px;
                        width: 100vw;
                        position: relative;
                        background-image: url("https://imgur.com/acl4BGw.png");
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        border-bottom: 8px solid white;
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    .events {
                        background-image: url("https://imgur.com/6PdyLGk.jpeg");
                    }
                    .attractions {
                        background-image: url("https://imgur.com/dfpHrC9.jpg");
                    }
                    .businesses {
                        background-image: url("https://imgur.com/Uvyu6yy.jpg");
                    }
                    .lincolnguesser {
                        background-image: url("https://imgur.com/dctSUBn.jpg");
                    }
                    .carousel-container {
                        height: 624px;
                        width: 100vw;
                        overflow: hidden;
                    }
                    .carousel-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: auto;
                        width: auto;
                        overflow: visible;
                    }
                    h1 {
                        margin: 0;
                        margin-bottom: -35px;
                        font-size: 4em;
                        color: white;
                        text-shadow: 1px 1px 2px black;
                    }
                    #landing-lincolnguesser .leaderboard-div h1 { 
                        margin: 0;
                        margin-bottom: 20px;
                        font-size: 4em;
                        color: white;
                        text-shadow: 1px 1px 2px black;
						word-wrap: break-word;
                    }
                    .see-all {
                        font-size: 1.5em;
                        font-weight: 500;
                        border-radius: 12px;
                        padding: 10px 20px;
                        border-outline: none;
                        border: none;
                        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                        background-color: var(--color-secondary);
                        color: white;
                        cursor: pointer;
                        margin-top: 15px;
                        marign-bottom: 15px;
                        min-width: 12.5em;
                        transition: all 0.1s;
                    }
                    button:hover {
                        background-color: white;
                        color: var(--color-primary);
                        border: 1px solid var(--color-primary);
                    }
                    @media only screen and (max-width: 768px) {
                        .filler-bottom {
                            height: 30vh;
                        }
                    
						.see-all {
                        min-width: 10em;
                    }
				}
					.leaderboard-div {
                        width: 98%;
                        max-width: 600px;
                        height: 400px;
                        box-sizing: border-box;
                        transform: translate(0, -20%);
                    }
                    .leaderboard-div h2 {
                        color: white;
                        font-size: 1.8rem;
                    }
					@media (max-width: 320px) {
						h1 {
							font-size: 2.75em; /* Smaller font size for small screens */
							word-wrap: break-word; /* Ensure text wraps */
							line-height: 1.2; /* Adjust line height if needed for better readability */
						}
						#landing-lincolnguesser .leaderboard-div h1 { 
                        font-size: 2.75em;
                    }
					}
                `}
            </style>
      <PageComponent includeBottomMargin={false}>
        <div className="blue-section">
          <div className="content-box">
            <TypingAnimation/>
          </div>
          <div className="custom-arrow-position">
            <NextSectionArrow nextSectionId="landing-events" />
          </div>
        </div>
                <div className="image-div events" id="landing-events">
                    <div className="bowtie-container">
                        <Bowtie />
                    </div>
                    <h1>Events</h1>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        responsive={responsiveProp}
                        transitionDuration={300}
                        arrows={false}
                        infinite={true}
                        showDots={true}
                        autoplay={true}
                        customButtonGroup={<CustomArrowGroup />}
                        customDot={<CustomDots />}
                        itemClass="carousel-item"
                        containerClass="carousel-container"
                        sliderClass="carousel-slider"
                    >
                        {events.map((event, i) => (
                            <LandingEventCard event={event} key={i} />
                        ))}
                    </Carousel>
                    <Link href={eventsHref}>
                        <button className="see-all">See All</button>
                    </Link>
                    <NextSectionArrow
                        nextSectionId="landing-attractions"
                        heightOffset={100}
                    />
                </div>
                <div className="image-div attractions" id="landing-attractions">
                    <h1>Attractions</h1>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        responsive={responsiveProp}
                        transitionDuration={300}
                        arrows={false}
                        infinite={true}
                        showDots={true}
                        autoplay={true}
                        customButtonGroup={<CustomArrowGroup />}
                        customDot={<CustomDots />}
                        itemClass="carousel-item"
                        containerClass="carousel-container"
                    >
                        {attractions.map((attraction, i) => (
                            <LandingAttractionCard attraction={attraction} key={i} />
                        ))}
                    </Carousel>
                    <Link href={attractionHref}>
                        <button className="see-all">See All</button>
                    </Link>
                    <NextSectionArrow
                        nextSectionId="landing-businesses"
                        heightOffset={100}
                    />
                </div>
                <div className="image-div businesses" id="landing-businesses">
                    <h1>Businesses</h1>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        responsive={responsiveProp}
                        transitionDuration={300}
                        arrows={false}
                        infinite={true}
                        showDots={true}
                        autoplay={true}
                        customButtonGroup={<CustomArrowGroup />}
                        customDot={<CustomDots />}
                        itemClass="carousel-item"
                        containerClass="carousel-container"
                    >
                        {businesses.map((business, i) => (
                            <LandingBusinessCard business={business} key={i} />
                        ))}
                    </Carousel>
                    <Link href={businessHref}>
                        <button className="see-all">See All</button>
                    </Link>
                    <NextSectionArrow
                        nextSectionId="landing-lincolnguesser"
                        heightOffset={100}
                    />
                </div>
                <div className="image-div lincolnguesser" id="landing-lincolnguesser">
                    <div className="leaderboard-div">
                        <h1>LincolnGuessr</h1>
                        <Leaderboard mode={1} />
                    </div>
                </div>
                <div className="filler-bottom"></div>
            </PageComponent>
        </>
    );
}


