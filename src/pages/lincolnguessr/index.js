import Button from "@/components/Button";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import LincolnGuessrHelp from "@/components/LincolnGuessrHelp";
import {
	faClose,
	faMap,
	faMinus,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Timer from "@/components/Timer";
import Image from "next/image";
import Leaderboard from "@/components/Leaderboard";
import LincolnGuessrMap from "@/components/LincolnGuessrMap";
import toast from "react-hot-toast";

export default function index() {
	const router = useRouter();
	const [allLocations, setAllLocations] = useState(null);
	const [showExitConfirm, setShowExitConfirm] = useState(false);
	const [alias, setAlias] = useState("");
	const [gameState, setGameState] = useState(null); //null, playing, guessed, finished
	const [round, setRound] = useState(1);
	const [mapOpen, setMapOpen] = useState(false);
	const [totalScore, setTotalScore] = useState(0);
	const [roundScore, setRoundScore] = useState(0);
	const [roundDistanceKM, setRoundDistanceKM] = useState(0);
	const [pickedLocation, setPickedLocation] = useState(null); //[12,23] lat,long
	const [locations, setLocations] = useState(); //the 3 locations for the current game instance
	const [rank, setRank] = useState(null); //where the user score sits in the leaderboard

	useEffect(() => {
		getLocations();
	}, []);

	async function getLocations(onError = () => {}) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/lincoln-guessr-locations?populate=*&pagination[pageSize]=1000`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setAllLocations(data.data);
			console.log(data.data);
		} catch (error) {
			console.error("Failed to fetch data from Strapi:", error);
			onError();
		}
	}

	function getRandomEntries(arr, num) {
		// Shuffle the array
		const shuffled = arr.sort(() => 0.5 - Math.random());
		// Get the first 'num' elements from the shuffled array
		return shuffled.slice(0, num).map((location) => transformData(location));
	}

	function transformData(data) {
		return {
			name: data.attributes.Descriptor,
			imagePath: data.attributes.Image.data.attributes.url,
			lat: data.attributes.Location.Latitude,
			long: data.attributes.Location.Longitude,
			address: data.attributes.Location.Address,
		};
	}

	function handleStartGame() {
		//if no locations were loaded in the first useEffect we will have to try again
		if (allLocations === null) {
			const result = getLocations(() => {
				toast.error("Failed to load game. Please try again.");
				return -1;
			});

			if (result === -1) {
				return; //don't go any further, make them hit play again... again
			}
		}
		//pick three random locations
		setLocations(getRandomEntries(allLocations, 3));

		setGameState("playing");
		setRound(1);
		setPickedLocation(null);
		setMapOpen(false);
	}

	// Function to calculate distance between two lat/long points using the Haversine formula
	function calculateDistance(lat1, lon1, lat2, lon2) {
		const R = 6371; // Radius of the Earth in kilometers
		const dLat = ((lat2 - lat1) * Math.PI) / 180;
		const dLon = ((lon2 - lon1) * Math.PI) / 180;

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((lat2 * Math.PI) / 180) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c; // Distance in kilometers
		return distance;
	}

	// Calculate the score based on the distance
	function calculateScore(distance) {
		const maxScore = 5000;
		const maxDistance = 10; // Distance at which score starts to drop

		if (distance <= 0) return maxScore;

		// Score decreases as distance increases, up to a max distance of 10km.
		let score = maxScore - (distance / maxDistance) * maxScore;

		// Ensure score doesn't go below 0
		return Math.max(0, Math.round(score));
	}

	function handleGuessConfirmed(e) {
		e.preventDefault();
		e.stopPropagation();

		// Get the correct location (for the current round)
		const correctLocation = locations[round - 1];

		// Ensure the user has picked a location
		if (!pickedLocation) {
			return;
		}

		// Calculate the distance between the picked location and the correct location
		const distanceKM = calculateDistance(
			correctLocation.lat,
			correctLocation.long,
			pickedLocation[0], // pickedLocation[0] is latitude
			pickedLocation[1] // pickedLocation[1] is longitude
		);

		// Calculate the score based on distance
		const score = calculateScore(distanceKM);

		// Update state with the distance and score for this round
		setRoundDistanceKM(distanceKM.toFixed(2));
		setRoundScore(score);
		setTotalScore(totalScore + score);

		// Move to guessed state and close the map
		setGameState("guessed");
		setMapOpen(false);
	}

	async function handleStartNextRound() {
		if (round != 3) {
			setRound(round + 1);
			setRoundScore(0);
			setPickedLocation(null);
			setGameState("playing");
		} else {
			setGameState("finished");
			setPickedLocation(null);
			//figure out how the user placed
			//create the score entry
			async function saveScore() {
				//create the new score entry
				const newScore = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/lincoln-guessr-scores`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							data: {
								alias: alias,
								score: totalScore,
							},
						}),
					}
				)
					.then((response) => response.json())
					.then((data) => data.data); // Save the newly added score data

				//get all the scores
				const allScores = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/lincoln-guessr-scores?sort=score:desc&pagination[pageSize]=1000`
				)
					.then((response) => response.json())
					.then((data) => data.data);

				//determine the rank
				const newScoreId = newScore.id;
				let rank = -1;

				for (let i = 0; i < allScores.length; i++) {
					if (allScores[i].id === newScoreId) {
						rank = i + 1;
						break;
					}
				}

				setRank(rank);
			}

			await saveScore();
		}
	}

	function timeRanOut() {
		setRoundScore(0);
		setRoundDistanceKM(null);
		setGameState("guessed");
	}

	function handlePlayAgain() {
		setTotalScore(0);
		setRound(1);
		setRoundScore(0);
		setGameState("playing");
		setPickedLocation(null);
		setRank(null);
		//pick three random locations
		setLocations(getRandomEntries(allLocations, 3));
	}

	function handleLocationPicked(longLat) {
		setPickedLocation(longLat); //comes from the LincolnGuessrMap component
		console.log("from index", longLat);
	}

	//START SCREEN
	if (gameState === null) {
		return (
			<>
				<div className="page">
					<div className="help">
						<LincolnGuessrHelp />
					</div>

					<button
						className="close"
						onClick={() => setShowExitConfirm(!showExitConfirm)}
					>
						<FontAwesomeIcon icon={faClose} />
					</button>

					{showExitConfirm && (
						<ConfirmationPopup
							onCancel={() => setShowExitConfirm(false)}
							onConfirm={() => router.push("/")}
						/>
					)}

					<div className="start-div">
						<h1 className="header">Provide an Alias</h1>
						<input
							type="text"
							maxLength="20"
							value={alias}
							onChange={(e) => setAlias(e.target.value)}
						/>
						<div className="start-button">
							<Button onClick={handleStartGame} disabled={alias.length === 0}>
								START
							</Button>
						</div>
					</div>
				</div>
				<style jsx>{`
					.page {
						background-color: #161629;
						height: 100vh;
						width: 100vw;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.close {
						border: none;
						padding: 0;
						margin: 0;
						width: 24px;
						height: 24px;
						border-radius: 100%;
						background-color: #e66e6e;
						position: fixed;
						top: 24px;
						left: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
					}

					.close:hover,
					.help:hover {
						cursor: pointer;
					}

					.help {
						position: fixed;
						top: 24px;
						right: 24px;
					}

					.start-div {
						display: grid;
						gap: 16px;
						justify-content: center;
						justify-items: center;
					}

					.header {
						color: #ffce1c;
						text-align: center;
						margin: 0;
					}

					.start-div input {
						background: white;
						max-width: 700px;
						width: 90vw;
						height: 60px;
						border: none;
						border-radius: 8px;
						font-size: 2rem;
						padding: 8px;
						box-sizing: border-box;
					}

					.start-button {
						height: 40px;
						width: 212px;
						display: flex;
						justify-content: center;
					}
				`}</style>
			</>
		);
	}

	//PLAYING SCREEN
	else if (gameState === "playing") {
		return (
			<>
				<div className="page">
					<button
						className="close"
						onClick={() => setShowExitConfirm(!showExitConfirm)}
					>
						<FontAwesomeIcon icon={faClose} />
					</button>

					{showExitConfirm && (
						<ConfirmationPopup
							onCancel={() => setShowExitConfirm(false)}
							onConfirm={() => router.push("/")}
						/>
					)}

					<div className="round-indicator">
						<p>Round</p>
						<p>{round} / 3</p>
					</div>

					<div className="timer">
						<Timer outOfTime={timeRanOut} />
					</div>

					<div className="image-display">
						<div className="image-container">
							<Image
								src={locations[round - 1].imagePath}
								layout="fill" // Fills the parent container
								objectFit="cover" // Ensures the image covers the container without distortion
								quality={100}
								alt="Game Image"
								className="geo-image"
							/>
						</div>
					</div>
					{mapOpen ? (
						<div className="map">
							<LincolnGuessrMap
								onCurrentLocationChange={handleLocationPicked}
								canChooseLocation={true}
							/>
							<div className="guess-button">
								<Button
									type="green"
									disabled={pickedLocation === null}
									onClick={handleGuessConfirmed}
								>
									Confirm Guess
								</Button>
							</div>
							<button className="map-close" onClick={() => setMapOpen(false)}>
								<FontAwesomeIcon icon={faClose} />
							</button>
						</div>
					) : (
						<button className="map-button" onClick={() => setMapOpen(true)}>
							<FontAwesomeIcon icon={faMap} />
						</button>
					)}
				</div>
				<style jsx>{`
					.page {
						height: 100vh;
						width: 100vw;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.close {
						border: none;
						padding: 0;
						margin: 0;
						width: 24px;
						height: 24px;
						border-radius: 100%;
						background-color: #e66e6e;
						position: fixed;
						top: 24px;
						left: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
						z-index: 1;
					}

					.close:hover,
					.map-button:hover,
					.map-close:hover,
					.map-zoom-buttons button:hover {
						transform: scale(1.15);
						cursor: pointer;
					}

					.round-indicator {
						position: fixed;
						display: grid;
						justify-content: center;
						align-items: center;
						gap: 0;
						top: 48px;
						right: 0px;
						width: 200px;
						height: 80px;
						box-sizing: border-box;
						border-radius: 10px 0 0 10px;
						background-color: var(--color-primary);
						z-index: 1;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
					}

					.round-indicator p {
						font-weight: bold;
						font-size: 1.3rem;
						color: white;
						text-align: center;
						margin: 0;
						padding: 0;
					}

					.image-display {
						position: relative;
						width: 100vw;
						height: 100vh;
						overflow-x: hidden;
						z-index: 0;
					}

					.image-container {
						position: relative;
						width: 100vw;
						height: 100vh;
					}

					.geo-image {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}

					.timer {
						position: fixed;
						top: 72px;
						width: 150px;
						height: 50px;
						z-index: 1;
					}

					.map-button {
						background-color: #6dba29;
						width: 70px;
						height: 70px;
						border-radius: 100px;
						border: 1px solid white;
						position: fixed;
						bottom: 32px;
						right: 32px;
						color: white;
						display: flex;
						justify-content: center;
						align-items: center;
						transition: all 0.1s ease-out;
					}

					.map {
						background-color: white;
						width: 680px;
						height: 440px;
						position: fixed;
						bottom: 48px;
						right: 48px;
					}

					.map-close {
						border: none;
						padding: 0;
						margin: 0;
						width: 24px;
						height: 24px;
						border-radius: 100%;
						background-color: #e66e6e;
						position: absolute;
						top: 24px;
						right: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
						z-index: 900;
					}

					.guess-button {
						width: 280px;
						height: 40px;
						position: absolute;
						bottom: 24px;
						right: 8px;
						z-index: 900;
					}

					@media only screen and (max-width: 768px) {
						.round-indicator {
							top: 0;
							border-radius: 0 0 0 10px;
							display: flex;
							gap: 8px;
							width: 100px;
							height: 40px;
						}
						.round-indicator p {
							font-size: 0.9rem;
						}

						.image-display {
							overflow-x: scroll;
							overflow-y: hidden;
							width: 100vw;
							height: 100vh;
						}

						.image-container {
							width: 200vw; /* Twice the viewport width for scrolling */
							height: 100vh; /* Full height of viewport */
						}

						.geo-image {
							width: 100%; /* Ensure full container width */
							height: 100%; /* Take full container height */
						}

						.map {
							bottom: 0;
							right: 0;
							width: 100%;
						}
					}
				`}</style>
			</>
		);
	}

	//GUESS RESULT SCREEN
	else if (gameState === "guessed") {
		return (
			<>
				<div className="page">
					<div className="help">
						<LincolnGuessrHelp />
					</div>

					<button
						className="close"
						onClick={() => setShowExitConfirm(!showExitConfirm)}
					>
						<FontAwesomeIcon icon={faClose} />
					</button>

					{showExitConfirm && (
						<ConfirmationPopup
							onCancel={() => setShowExitConfirm(false)}
							onConfirm={() => router.push("/")}
						/>
					)}

					<div className="guess-div">
						<h1 className="header">ROUND {round} / 3</h1>
						<div className="map">
							<LincolnGuessrMap
								pickedLocation={pickedLocation}
								correctLocation={[
									locations[round - 1].lat,
									locations[round - 1].long,
								]}
								correctInfo={`${locations[round - 1].name} | ${
									locations[round - 1].address
								}`}
							/>
						</div>
						<span className="score-text">{roundScore} Points</span>
						<div className="score-bar">
							<div
								className="score-bar-fill"
								style={{ width: `${(roundScore / 5000) * 100}%` }}
							></div>
						</div>
						<span className="distance-summary">
							{roundDistanceKM != null
								? `Your guess was ${roundDistanceKM}km from the correct location.`
								: "You ran out of time before you could make a guess."}
						</span>
						<div className="start-button">
							<Button onClick={handleStartNextRound}>
								{round != 3 ? "Start Next Round" : "Continue"}
							</Button>
						</div>
					</div>
				</div>
				<style jsx>{`
					.page {
						background-color: #161629;
						height: 100vh;
						width: 100vw;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.guess-div h1 {
						font-size: 1.5rem;
					}

					.score-text {
						color: #ffce1c;
						font-weight: bold;
						font-size: 1.5rem;
					}

					.distance-summary {
						font-size: 1rem;
						color: white;
						font-weight: bold;
						text-align: center;
					}

					.close {
						border: none;
						padding: 0;
						margin: 0;
						width: 24px;
						height: 24px;
						border-radius: 100%;
						background-color: #e66e6e;
						position: fixed;
						top: 24px;
						left: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
					}

					.close:hover,
					.help:hover {
						cursor: pointer;
					}

					.help {
						position: fixed;
						top: 24px;
						right: 24px;
					}

					.guess-div {
						display: grid;
						gap: 8px;
						justify-content: center;
						justify-items: center;
					}

					.header {
						color: white;
						text-align: center;
						margin: 0;
					}

					.score-bar {
						background-color: #42424d;
						width: 98vw;
						max-width: 400px;
						height: 10px;
						border-radius: 4px;
						border: 1px solid black;
					}

					.score-bar-fill {
						background-color: #ffce1c;
						height: 10px;
						border-radius: 4px;
					}

					.map {
						width: 100vw;
						max-width: 680px;
						height: 330px;
						background-color: white;
						margin-bottom: 16px;
						z-index: 1;
					}

					.start-button {
						height: 40px;
						width: 212px;
						display: flex;
						justify-content: center;
					}
				`}</style>
			</>
		);
	}

	//FINAL SCREEN
	else if (gameState === "finished") {
		return (
			<>
				<div className="page">
					<button
						className="close"
						onClick={() => setShowExitConfirm(!showExitConfirm)}
					>
						<FontAwesomeIcon icon={faClose} />
					</button>

					{showExitConfirm && (
						<ConfirmationPopup
							onCancel={() => setShowExitConfirm(false)}
							onConfirm={() => router.push("/")}
						/>
					)}

					<div className="center-content">
						<span className="title">FINAL SCORE</span>
						<span className="score">{totalScore} Points</span>
						<div className="leaderboard">
							{rank !== null ? (
								<Leaderboard
									userScore={{
										place: rank,
										alias: "YOU",
										score: totalScore,
									}}
								/>
							) : (
								<div>Loading Scores...</div> // Placeholder while loading
							)}
						</div>
						<div className="play-again-btn">
							<Button onClick={handlePlayAgain}>Play Again</Button>
						</div>
					</div>
				</div>
				<style jsx>{`
					.page {
						background-color: #161629;
						height: 100vh;
						width: 100vw;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.leaderboard {
						width: 95vw;
						max-width: 640px;
						height: 260px;
					}
					.center-content {
						display: grid;
						gap: 4px;
						justify-content: center;
						justify-items: center;
					}

					.close {
						border: none;
						padding: 0;
						margin: 0;
						width: 24px;
						height: 24px;
						border-radius: 100%;
						background-color: #e66e6e;
						position: fixed;
						top: 24px;
						left: 24px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
					}

					.close:hover {
						cursor: pointer;
					}

					.title {
						color: white;
						font-weight: bold;
						text-align: center;
						font-size: 1.5rem;
					}

					.score {
						color: #ffce1c;
						font-weight: bold;
						text-align: center;
						font-size: 2rem;
					}

					.play-again-btn {
						width: 212px;
						height: 40px;
						display: flex;
					}
				`}</style>
			</>
		);
	}
}
