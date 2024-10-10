import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXTwitter,
	faFacebook,
	faLinkedin,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";

const FooterComponent = ({showClipPath=true}) => {
	const [isMobile, setIsMobile] = useState(false);

	// Array for social icons and links
	const socialIcons = [
		{
			icon: faXTwitter,
			link: "https://twitter.com/TownofLincolnON?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
		},
		{
			icon: faFacebook,
			link: "https://www.facebook.com/TownofLincolnON/" },
		{
			icon: faLinkedin,
			link: "https://www.linkedin.com/company/town-of-lincoln/",
		},
		{
			icon: faInstagram,
			link: "https://www.instagram.com/townoflincolnon/?hl=en",
		},
	];

	// Check if screen width is mobile size (725px or less)
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Set the initial value
		handleResize();

		// Add event listener for resize
		window.addEventListener("resize", handleResize);

		// Clean up the event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="bottom" style={{pointerEvents: "none"}}>
			<footer className="footer" style={{pointerEvents: "auto"}}>
				<div className="footerContent">
					{isMobile ? (
						<>
							{/* Mobile View: Only FooterContact, Social Icons, and FooterCopyright */}
							<p className="footerContact">
								+1 (234)-567-8910 <br /> discoverlincoln@gmail.com <br /> Lincoln, Ontario, L0R

							</p>

							{/* <div className={"footerSocial"}>
								{socialIcons.map(({ icon, link }, index) => (
									<a href={link} key={index} className="socialLink">
										<FontAwesomeIcon icon={icon} />
									</a>
								))}
							</div> */}

							<div className="poweredAndCopyright">
								{/* <div className="footerPowered">
									<a
										href="https://www.civiconnect.ca/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="https://imgur.com/YvSBBFN.png"
											alt="Powered by CiviConnect"
											className="poweredImage"
										/>
									</a>
								</div> */}
								<div className={"footerSocial"}>
								{socialIcons.map(({ icon, link }, index) => (
									<a href={link} key={index} className="socialLink">
										<FontAwesomeIcon icon={icon} />
									</a>
								))}
							</div>
								<p className="footerCopyright">
									© 2024 Town of Lincoln. <br />
									All rights reserved.
								</p>
							</div>
						</>
					) : (
						<>
							{/* Desktop and Tablet View: Includes FooterTitle and TreeIcon */}
							<div className={`footerLeft footerSection`}>
								<h3 className="footerTitle">
									<FontAwesomeIcon icon={faTree} className="treeIcon" style={{marginRight: "8px"}}/>
									Discover Lincoln
								</h3>
								<p className="footerContact">
									+1 (234)-567-8910 | discoverlincoln@gmail.com | Lincoln, Ontario, L0R
								</p>
							</div>

							{/* <div className="footerSocial">
								{socialIcons.map(({ icon, link }, index) => (
									<a href={link} key={index} className="socialLink">
										<FontAwesomeIcon icon={icon} />
									</a>
								))}
							</div> */}

							<div className={`footerRight footerSection`}>
								{/* <div className="footerPowered">
									<a
										href="https://www.civiconnect.ca/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src="https://imgur.com/YvSBBFN.png"
											alt="Powered by CiviConnect"
											className="poweredImage"
										/>
									</a>
								</div> */}
								<div className={"footerSocial"}>
								{socialIcons.map(({ icon, link }, index) => (
									<a href={link} key={index} className="socialLink">
										<FontAwesomeIcon icon={icon} />
									</a>
								))}
							</div>
								<p className="footerCopyright">
									© 2024 Town of Lincoln. All rights reserved.
								</p>
							</div>
						</>
					)}
				</div>
			</footer>

			{/* SVG for clip-path */}
			{isMobile ? <svg width="0" height="0">
				<defs>
					<clipPath id="footer-clip" clipPathUnits="objectBoundingBox">
						{isMobile ? (
							<path d="M 0 0.51 C 0.5 0.66 0.5 0.66 1 0.51 L 1 1 L 0 1 Z" />
						) : (
							<path d="M 0 0.45 C 0.5 0.8 0.5 0.8 1 0.45 L 1 1 L 0 1 Z" />
						)}
					</clipPath>
				</defs>
			</svg> : showClipPath && <svg width="0" height="0">
				<defs>
					<clipPath id="footer-clip" clipPathUnits="objectBoundingBox">
						{isMobile ? (
							<path d="M 0 0.51 C 0.5 0.66 0.5 0.66 1 0.51 L 1 1 L 0 1 Z" />
						) : (
							<path d="M 0 0.45 C 0.5 0.8 0.5 0.8 1 0.45 L 1 1 L 0 1 Z" />
						)}
					</clipPath>
				</defs>
			</svg>}
			<style jsx>{`
				.bottom{
					position: absolute;
					display: flex;
					bottom: 0;
					pointer-events: none
				}
				.footer {
					background-color: var(--color-primary);
					height: ${showClipPath ? '70vh' : '15vh'};
					width: 100vw;
					color: white;
					display: flex;
					align-items: flex-end;
					clip-path: url(#footer-clip);
				}
				.footerContent {
					display: flex;
					width: 100vw;
					padding: 2vh 1vw;
					justify-content: space-between;
					align-items: flex-end;
					box-sizing: border-box;
					pointer-events: auto
				}

				.footerLeft {
					flex-direction: column;
					justify-content: flex-start;
					width: 50vw;
				}

				.footerRight {
					flex-direction: column;
					justify-content: flex-end;
					width: 50vw;
					text-align: right;
				}

				.footerSocial {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 1vw;
					color: white;
					margin: 0;
					padding-left:37.5vw;
					padding-right:0.5vw;
				}

				.footerSection {
					display: flex;
					flex-direction: column;
				}

				.treeIcon {
					margin-right: 0.8vw;
					font-size: 1.8rem;
					color: white;
				}

				.footerTitle {
					font-size: 1.6rem;
					margin-bottom: 0.8vw;
					display: flex;
					align-items: center;
				}

				.footerContact {
					margin: 0;
					font-size: 0.8rem;
					font-weight: bold;
				}

				.footerCopyright {
					margin: 0;
					font-size: 0.8rem;
					font-weight: bold;
					margin-right:3vw;
					width: 40vw;
					padding-left:9vw;
					padding-right:0vw;
					padding-top:12px;
				}

				.socialLink {
					text-decoration: none;
					color: white;
					font-size: 2rem;
					transition: transform 0.3s ease, color 0.3s ease;
				}

				.socialLink:hover {
					transform: scale(1.2);
				}

				/* CSS for Mobile (725px and smaller) */
				@media (max-width: 768px) {
					.footer {
						height: 100vh;
						width: 100vw;
						padding-top:0;
						margin-top:0;
					}

					.footerContent {
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 2vh;
						max-width: 90vw;
						// margin: 0 auto;
						padding-top:0;
						margin-top:0;
						padding-bottom:20vw;
					}

					.footerContact {
						font-size: 0.75rem;
						text-align: center;
						margin-bottom: 1.5vh;
					}

					.footerSocial {
						display: flex;
						justify-content: center;
						gap: 6.5vw; /* space between social icons */
						margin-bottom: 1.5vh;
						text-align: center;
						align-items: center;
						padding-left:0;
					}

					.socialLink {
						font-size: 1.9rem;
					}

					.socialLink:hover {
						transform: scale(1.2);
					}

					.poweredAndCopyright {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 100%;
						flex-direction: column;
						// max-width: 60vw;
					}

					.footerCopyright {
						font-size: 0.75rem;
						text-align: center;
						align-items: center;
						padding-top:22px;
					}

					.footerTitle,
					.treeIcon {
						display: none;
					}
				}
			`}</style>
		</div>
	);
};

export default FooterComponent;
