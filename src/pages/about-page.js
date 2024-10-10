import React from "react";
import BackgroundSectionComponent from "../components/BackgroundSectionComponent";
import AboutCard from "../components/AboutCard";
import PageComponent from "../components/PageComponent";
import NextSectionArrow from "../components/NextSectionArrow"; // Import the component
import Button from "@/components/Button";
import { useRouter } from "next/router";

const BackgroundSectionPage = ({info}) => {
	const router = useRouter();
	console.log(info);
	return (
		<PageComponent includeBottomMargin={false}>
			{/* Background Section */}
			<div className="backgroundSectionWrapper">
				<BackgroundSectionComponent
					backgroundImage={`${info[0].attributes.imageLink}`}
					title={`${info[0].attributes.heading}`}
					subtitle={`${info[0].attributes.subHeading}`}
					nextSectionId={`${info[0].attributes.nextSection}`}
					brightness={0.5}
				/>
			</div>

			{/* Wine Country Section */}
			<div id="Wine-Country" className="nextSection">
				<div className="wineCountryImage" />
				<AboutCard
					imageSrc={`${info[1].attributes.imageLink}`}
					heading={`${info[1].attributes.heading}`}
					description={`${info[1].attributes.description}`}
				/>
				{/* Add the NextSectionArrow to scroll to the Natural Attractions Section */}
				<NextSectionArrow nextSectionId="Natural-Attractions" />
			</div>

			{/* Natural Attractions Section */}
			<div id="Natural-Attractions" className="otherSection">
				<div className="naturalAttractionsImage" />
				<AboutCard
					imageSrc={`${info[2].attributes.imageLink}`}
					heading={`${info[2].attributes.heading}`}
					description={`${info[2].attributes.description}`}
				/>
				{/* Add the NextSectionArrow to scroll to the Agriculture Section */}
				<NextSectionArrow nextSectionId="Agriculture" />
			</div>

			{/* Agriculture Section */}
			<div id="Agriculture" className="nextSection">
				<div className="agricultureImage" />
				<AboutCard
					imageSrc={`${info[3].attributes.imageLink}`}
					heading={`${info[3].attributes.heading}`}
					description={`${info[3].attributes.description}`}
				/>
				<NextSectionArrow nextSectionId="call-to-action" />
			</div>

			<div id="call-to-action" className="call-to-action">
				<div className="callToActionImg" />
				<div className="call-to-action-btn">
					<Button onClick={() => router.push("/")}>Explore Lincoln</Button>
				</div>
			</div>

			<style jsx>{`
				.backgroundSectionWrapper {
					position: relative;
					width: 100vw;
					height: calc(100vh - (64px + 0.6vw));
					margin-bottom: 0.6vw;
				}

				.nextSection {
					box-sizing: border-box;
					height: calc(100vh - (64px + 0.6vw));
					display: flex;
					align-items: center;
					justify-content: center;
					padding-right: 60vw;
					position: relative;
					margin-bottom: 0.6vw;
				}

				.call-to-action {
					box-sizing: border-box;
					height: calc(100vh - (64px + 0.6vw));
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					margin-bottom: 0.6vw;
				}

				.otherSection {
					box-sizing: border-box;
					height: calc(100vh - (64px + 0.6vw));
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 60vw;
					position: relative;
					margin-bottom: 0.6vw;
				}

				.callToActionImg,
				.wineCountryImage,
				.naturalAttractionsImage,
				.agricultureImage {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-size: cover;
					background-position: center;
					z-index: -1;
				}

				.wineCountryImage {
					background-image: url("https://imgur.com/5cOoHpJ.png");
					filter: brightness(0.85);
				}

				.naturalAttractionsImage {
					background-image: url("https://imgur.com/tqi8Huj.png");
					filter: brightness(0.85);
				}

				.agricultureImage {
					background-image: url("https://imgur.com/PcvpGCw.png");
					filter: brightness(1);
				}

				.callToActionImg {
					background-image: url("/images/sunrise.jpg");
					filter: brightness(0.8);
				}

				.call-to-action-btn {
					width: 300px;
					height: 40px;
				}

				// Tablet Version
				@media (min-width: 769px) and (max-width: 1500px) {
					.nextSection {
						padding-left: 4vw;
					}

					.otherSection {
						padding-right: 4vw;
					}
				}

				// Mobile Version
				@media (max-width: 768px) {
					.nextSection,
					.otherSection {
						padding-right: 3vw;
						padding-left: 3vw;

						margin-bottom: 2vw;
					}

					.call-to-action-btn{
						margin-top: 7em; 
						align-self: flex-start;
						gap: 4em;
					}

					.backgroundSectionWrapper,
					backgroundSection,
					WrappernextSection {
						margin-bottom: 3vw;
					}
				}
			`}</style>
		</PageComponent>
	);
};

export default BackgroundSectionPage;

export async function getServerSideProps() {
	try {
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about-page-infos`
			);

		if (!response.ok) {
			console.log(response.status);
			throw new Error(`HTTP error! Status: ${response.status}`);
		} else {
			console.log(response);
		}

		const data = await response.json();
		// Pass the data to the page component via props
		return {
			props: {
				info: data.data || [], // Ensuring there's always an array
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				info: [],
			},
		};
	}
}
