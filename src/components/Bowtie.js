import React from "react";

export default function Bowtie() {
	return (
		<div className="svg-container">
			<svg
				width="100vw"
				height="auto"
				viewBox="0 0 1920 482"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1920 0C960 241 960 241 0 0V241H1920V0Z"
					fill="url(#paint0_linear_560_2778)"
				/>
				<path
					d="M0 482C960 241 960 241 1920 482V241H0V482Z"
					fill="url(#paint1_linear_560_2778)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_560_2778"
						x1="960"
						y1="482"
						x2="960"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0.511594" stop-color="#244D9B" />
						<stop
							offset="0.546694"
							stop-color="#244E9E"
							stop-opacity="0.983372"
						/>
						<stop offset="0.95" stop-color="#3470E2" stop-opacity="0.5" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_560_2778"
						x1="960"
						y1="241"
						x2="960"
						y2="482"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#244D9B" />
						<stop offset="0.9999" stop-color="#3470E2" stop-opacity="0.5" />
						<stop offset="1" stop-color="#3470E2" stop-opacity="0.5" />
					</linearGradient>
				</defs>
			</svg>

			<style jsx>
				{`
					.svg-container {
						display: flex;
						flex-direction: column;
						z-index: 100;
						position: relative;
						pointer-events: none;
					}
					svg {
						pointer-events: none;
					}
				`}
			</style>
		</div>
	);
}
