import React, { useEffect, useState } from "react";

export default function apitest() {
	const [dataFromStrapi, setDataFromStrapi] = useState(null);
	useEffect(() => {
		async function strapiTest() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/lincoln-guessr-locations`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				console.log(data);
				setDataFromStrapi(data.data);
			} catch (error) {
				console.error("Failed to fetch data from Strapi:", error);
				// Optionally set error state here or handle the error as needed
			}
		}

		strapiTest();
	}, []);
	return (
		<>
			<div>apitest</div>
			{dataFromStrapi &&
				dataFromStrapi.map((d) => {
					return <p>{d.attributes.Descriptor}</p>;
				})}
		</>
	);
}
