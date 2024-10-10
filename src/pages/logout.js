import PageComponent from "@/components/PageComponent";
import BackgroundSectionComponent from "@/components/BackgroundSectionComponent";
import Link from "next/link";
import React from "react";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";

const LoggerOutter = dynamic(() => import("@/components/LoggerOutter"), {
	ssr: false,
}); // i hate react

export default function index() {
	const LoggedOutWindow = (
		<>
			<div className="main-container login-window">
				<div className="left-container">
					<div className="mobile-only mobile-banner">
						<FontAwesomeIcon icon={faTree} size="6x"></FontAwesomeIcon>
					</div>
					<h1>You've been logged out.</h1>
					<div className="mobile-only" style={{ marginTop: "24px" }}>
						<Link href="/login-signup">
							<button
								className="redirect-button mobile-only"
								onClick={() => {}}
							>
								Log in
							</button>
						</Link>
					</div>
				</div>
				<div className="right-container">
					<FontAwesomeIcon icon={faTree} size="6x"></FontAwesomeIcon>
					<h1>Discover Lincoln</h1>
					<p style={{ width: "18em" }}>
						Enjoy a seamless experience exploring Lincoln’s top attractions,
						exciting events, and local businesses. Gain easy access to
						everything Lincoln has to offer, all in one place!
					</p>
					Want to sign back in?
					<Link href="/login-signup">
						<button className="redirect-button">Return to Login</button>
					</Link>
				</div>
			</div>
		</>
	);

	const combinedWindow = [LoggedOutWindow];

	return (
		<>
			<style jsx global>
				{`
					.main-container {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						height: 34em;
						width: 60vw;
						border-radius: 15px;
						transition: all 0.3s;
						position: absolute;
					}
					.login-window {
						opacity: 1;
					}
					.left-container {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 32em;
						background-color: white;
						border-left: 8px solid var(--color-primary);
						border-radius: 15px 0px 0px 15px;
						transition: inherit;
					}
					.right-container {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 32em;
						background-color: var(--color-primary);
						border-radius: 0px 15px 15px 0px;
						color: white;
						transition: inherit;
					}
					form {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}
					input {
						margin: 10px;
						width: 21em;
						height: 2.5em;
						padding-left: 8px;
						padding-right: 8px;
						padding-top: 4px;
						padding-bottom: 4px;
						border-radius: 15px;
						border: 2px solid black;
					}
					h3 {
						margin: 2px;
					}
					button {
						opacity: 1;
						font-size: 1.25em;
						font-weight: bold;
						border-radius: 15px;
						padding: 10px 20px;
						border-outline: none;
						border: none;
						box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
						cursor: pointer;
						margin-top: 10px;
						margin-bottom: 1.34em;
						transition: all 0.1s;
					}
					button:disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}
					button:hover {
						opacity: 0.9;
					}
					.submit-button {
						width: 12em;
						background-color: var(--color-primary);
						color: white;
					}
					.redirect-button {
						width: 12em;
						background-color: white;
						color: var(--color-primary);
						margin-top: 20px;
					}
					.filler {
						height: 38vh;
					}
					.mobile-only {
						display: none;
					}
					@media (max-width: 768px) {
						.main-container {
							width: 65vw;
							height: auto;
							border-radius: 15px;
							position: absolute;
							align-self: center;
							justify-self: center;
						}
						.filler {
							height: 80vh;
						}
						.left-container {
							border-left: 0px;
							border-radius: 15px;
							width: 65vw;
							height: auto;
							padding-bottom: 36px;
						}
						.right-container {
							display: none;
						}
						input {
							width: 90%;
						}
						.mobile-only {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
						}
						.mobile-banner {
							color: var(--color-primary);
							margin-top: 36px;
						}
						.redirect-button {
							border: 2px solid var(--color-primary);
						}
						h1 {
							color: var(--color-primary);
						}
					}
				`}
			</style>
			<PageComponent includeBottomMargin={false}>
				<LoggerOutter />
				<div className="mobile-only" style={{ height: "10vh" }}></div>
				<BackgroundSectionComponent
					backgroundImage="https://imgur.com/Bog9VIz.gif"
					brightness={0.8}
					includeArrow={false}
					children={combinedWindow}
					overflow="visible"
				></BackgroundSectionComponent>
				<div className="filler"></div>
			</PageComponent>
		</>
	);
}
