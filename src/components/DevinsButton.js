import React, { useEffect, useState } from "react";

export default function DevinsButton({ text }) {
	//useState example
	const [clicks, setClicks] = useState(0);

	//used in mapping example
	const Names = ["Arthur", "Devin", "Jackie", "Manha"];

	//when our 'clicks' state variable changes log to the console
	useEffect(() => {
		console.log("ooh that tickles");
	}, [clicks]);

	//ternary operator example
	const something =
		Names.length > 2
			? "Wow that's a lot of names"
			: "There are less then or equal to 2 names";

	return (
		<>
			{/* using properties and state variables in an html element */}
			<button onClick={() => setClicks(clicks + 1)}>
				{text} {clicks}
			</button>
			{/* map example */}
			{Names.filter((name) => name === "Devin").map((name) => (
				<p>{name}</p>
			))}
			{/* ternary operator example */}
			{clicks > 0 ? (
				<p>I've been clicked at least once</p>
			) : (
				<p>I have not been clicked</p>
			)}

			{/* truthy rendering thingy */}
			{clicks > 5 && <p>Okay please stop clicking me that's annoying</p>}

			{/* style jsx */}
			<style jsx>{`
				p {
					font-weight: bold;
				}
				button {
					background-color: var(--color-primary);
					color: white;
				}
			`}</style>
		</>
	);
}
