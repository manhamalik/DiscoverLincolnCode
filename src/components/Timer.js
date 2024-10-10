import React, { useState, useEffect } from "react";

//outOfTime => pass a function for what happens when the timer runs out
//lengthInMS => length of the timer in MS

export default function Timer({ outOfTime = () => {}, lengthInMS = 120000 }) {
	const [timeRemaining, setTimeRemaining] = useState(lengthInMS); // 2 minutes in milliseconds

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev > 1000) {
					return prev - 1000;
				} else {
					clearInterval(interval);
					outOfTime();
					return 0; // Ensure it doesn't go below 0
				}
			});
		}, 1000);

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	// Format time as MM:SS
	const formatTime = (ms) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<>
			<div className="timer">{formatTime(timeRemaining)}</div>
			<style jsx>{`
				.timer {
					background-color: rgba(0, 0, 0, 0.71);
					color: white;
					font-weight: bold;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 2rem;
					border-radius: 52100px;
				}
			`}</style>
		</>
	);
}
