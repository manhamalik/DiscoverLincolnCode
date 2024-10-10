import React, { useState } from "react";

/*type: primary (white text blue back)
        inverted (blue text, white back)
        danger (white text, red back)
        green (white text, green back)
onClick => pass a function for something to actually happen when button clicked
*/

export default function Button({
	children,
	type = "primary",
	onClick = () => {},
	disabled,
}) {
	return (
		<>
			<div
				className={`button ${type} ` + `${disabled && " disabled"}`}
				onClick={!disabled ? onClick : () => {}}
				disabled={disabled}
			>
				{children}
			</div>
			<style jsx>{`
				.button {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: bold;
					border-radius: 10px;
					box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.25);
				}

				.button:hover {
					cursor: pointer;
					background-color: white;
					color: var(--color-primary);
				}

				.primary {
					background-color: var(--color-primary);
					color: white;
				}

				.inverted {
					background-color: white;
					color: var(--color-primary);
					border: 1px solid var(--color-primary);
				}
				.inverted:hover {
					background-color: var(--color-primary);
					color: white;
				}
				.green {
					background-color: var(--color-tertiary);
					color: white;
					border: 1px solid var(--color-tertiary);
					font-size:20px;
				}
				.green:hover {
					background-color: white;
					color: var(--color-tertiary);
				}
				.danger {
					background-color: #ff3c3c;
					color: white;
				}

				.disabled {
					background-color: grey;
				}

				.disabled:hover {
					filter: brightness(1);
					cursor: default;
				}
			`}</style>
		</>
	);
}
