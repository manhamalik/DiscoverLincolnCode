import AttractionCard from "@/components/AttractionCard";
import BusinessCard from "@/components/BusinessCard";
import EventCard from "@/components/EventCard";
import PageComponent from "@/components/PageComponent";
import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = ({strapi, currentUser}) => {

	const {jwt, username} = useContext(AuthContext);

	const attractionsApproved = strapi.approved.data.attributes.attractions.data.map((attraction) => attraction.id);
	const businessesApproved = strapi.approved.data.attributes.businesses.data.map((business) => business.id);
	const eventsApproved = strapi.approved.data.attributes.events.data.map((event) => event.id);

	function processBusinesses(businesses) {
		return businesses
			.filter((business, i) => business?.attributes?.users_permissions_user?.data?.attributes?.username === username || false)
			.map((business, i) => 
				<BusinessCard key={i} 
					business={business} 
					hasDelete={true} 
					isPending={!businessesApproved.includes(business.id)}
				/>);
	}

	function processAttractions(attractions) {
		return attractions
			.filter((attraction, i) => attraction?.attributes?.users_permissions_user?.data?.attributes?.username === username || false)
			.map((attraction, i) => 
				<AttractionCard 
					key={i} 
					attraction={attraction} 
					hasDelete={true} 
					isPending={!attractionsApproved.includes(attraction.id)}
				/>);
	}
	
	function processEvents(events) {
		return events
			.filter((event, i) => event?.attributes?.users_permissions_user?.data?.attributes?.username === username || false)
			.map((event, i) => 
				<EventCard key={i} 
					event={event} 
					hasDelete={true} 
					isPending={!eventsApproved.includes(event.id)}
				/>);
	}

	return (
	<div className="content">
		<div className="signed-in-as">
			<span className="as">Signed in as: </span>
			<span className="login">{username}</span>
		</div>

		<div className="section">
			<span>Your Attractions</span>
			<div className="cards">
				{processAttractions(strapi.attractions.data)}
			</div>
		</div>

		<div className="section">
			<span>Your Businesses</span>
			<div className="cards">
				{processBusinesses(strapi.businesses.data)}
			</div>
		</div>

		<div className="section">
			<span>Your Events</span>
			<div className="cards">
				{processEvents(strapi.events.data)}
			</div>
		</div>
		<style jsx>{`
				.content {
					display: grid;
					gap: 24px;
				}
				.signed-in-as {
					border: 4px solid var(--color-primary);
					border-radius: 16px;
					padding: 8px;
					box-sizing: border-box;
					max-width: 300px;
					color: var(--color-primary);
					width: fit-content;
				}

				.login {
					color: #808080;
				}

				.section {
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.section span {
					font-weight: bold;
					font-size: 32px;
					text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
				}

				.section .cards {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					gap: 4px 0px;
				}

				@media only screen and (max-width: 1440px) {
					.section .cards {
						grid-template-columns: 1fr 1fr;
					}
				}

				@media only screen and (max-width: 1090px) {
					.section .cards {
						grid-template-columns: 1fr;
					}
				}
			`}</style>
	</div>
	)
}

export default function dashboard(props) {
	return (
		<>
			<PageComponent includePadding>
				<div><Toaster position="top-center"></Toaster></div>
				<Dashboard strapi={props}/>
			</PageComponent>
		</>
	);
}

export async function getServerSideProps() {
	try {
		const businesses = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/businesses?populate=*&pagination[pageSize]=1000`)

		const attractions = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/attractions?populate=*&pagination[pageSize]=1000`)
	
		const events = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/events?populate=*&pagination[pageSize]=1000`)

		const approved = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/approved-post?populate[attractions][fields]=id&populate[businesses][fields]=id&populate[events][fields]=id&pagination[pageSize]=1000`)

		return {
			props: {
				businesses: await businesses.json(),
				attractions: await attractions.json(),
				events: await events.json(),
				approved: await approved.json()
			},
		};
	} catch (error) {
		return {
			props: {
				businesses: [],
				attractions: [],
				events: [],
				approved: []
			},
		};
	}

}