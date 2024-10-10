import React, { useState } from "react";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LincolnGuessrHelp() {
	const [isShowing, setIsShowing] = useState(false);
	return (
		<>
			<div className="help">
				<FontAwesomeIcon
					className="icon"
					icon={faCircleQuestion}
					onClick={() => setIsShowing(!isShowing)}
				/>
				{isShowing && (
					<div className="help-bubble">
						<span>
							Guess the location of a provided image. Choose the location on the
							map and see how close you were!
						</span>
					</div>
				)}
			</div>

			<style jsx>{`
				.help {
					color: white;
				}
				.help-bubble {
					width: 260px;
					height: 100px;
					padding: 8px;
					background-color: white;
					color: black;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					align-items: center;
					position: fixed;
					right: 24px;
					cursor: default;
				}
			`}</style>
		</>
	);
}
