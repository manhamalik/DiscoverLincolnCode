import React from "react";

export default function apitest({ dataFromStrapi }) {
	return (
		<>
			{console.log(dataFromStrapi)}
			<div>apitest</div>
			{dataFromStrapi &&
				dataFromStrapi.map((d) => {
					return <p key={d.id}>{d.attributes.Descriptor}</p>;
				})}
		</>
	);
}

// Fetch data server-side
export async function getServerSideProps() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/attractions&pagination[pageSize]=1000`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		// Pass the data to the page component via props
		return {
			props: {
				dataFromStrapi: data.data || [], // Ensuring there's always an array
			},
		};
	} catch (error) {
		console.error("Failed to fetch data from Strapi:", error);

		// Optionally return an error prop or empty array
		return {
			props: {
				dataFromStrapi: [],
			},
		};
	}
}
