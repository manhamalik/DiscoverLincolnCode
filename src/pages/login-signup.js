import PageComponent from "@/components/PageComponent";
import BackgroundSectionComponent from "@/components/BackgroundSectionComponent";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTree } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function index() {
	const [isLogin, setIsLogin] = useState(true);
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirm, setRegisterConfirm] = useState("error");
	const [registerName, setRegisterName] = useState("");
	const [passwordReqOpen, setPasswordReqOpen] = useState(false);

	const toggleLogin = () => {
		setIsLogin(!isLogin);
	};

	const changeLoginEmail = (e) => {
		setLoginEmail(e.target.value);
	};

	const changeLoginPassword = (e) => {
		setLoginPassword(e.target.value);
	};

	const changeRegisterEmail = (e) => {
		setRegisterEmail(e.target.value);
	};

	const changeRegisterPassword = (e) => {
		setRegisterPassword(e.target.value);
	};

	const changeRegisterConfirm = (e) => {
		setRegisterConfirm(e.target.value);
	};

	const changeRegisterName = (e) => {
		setRegisterName(e.target.value);
	};

	const togglePasswordReq = () => {
		setPasswordReqOpen(!passwordReqOpen);
	};

	// a regex for every email possibly ever from stackoverflow
	const emailRegex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	// at least 8 characters, 1 uppercase, 1 lowercase, 1 number
	function validPassword(password) {
		return (
			password.length >= 8 &&
			/[A-Z]+/.test(password) &&
			/[a-z]+/.test(password) &&
			/[0-9]+/.test(password)
		);
	}

	const LoginWindow = (
		<>
			<div className="main-container login-window">
				<div className="left-container">
					<div className="mobile-only mobile-banner">
						<FontAwesomeIcon icon={faTree} size="6x"></FontAwesomeIcon>
					</div>
					<h1>Log In</h1>
					<form>
						<h3>
							Email
							{!emailRegex.test(loginEmail) && (
								<span style={{ color: "red" }}>*</span>
							)}
						</h3>
						<input type="email" onChange={changeLoginEmail}></input>
						<h3>
							Password
							{!validPassword(loginPassword) && (
								<span style={{ color: "red" }}>*</span>
							)}
						</h3>
						<input type="password" onChange={changeLoginPassword}></input>
						<button
							className="submit-button"
							disabled={
								!(emailRegex.test(loginEmail) && validPassword(loginPassword))
							}
							onClick={(e) => {
								e.preventDefault();
								onLogin({ identifier: loginEmail, password: loginPassword });
							}}
						>
							Login
						</button>
					</form>
					<div className="mobile-only" style={{ marginTop: "24px" }}>
						Don't have an account?
						<button
							className="redirect-button mobile-only"
							onClick={toggleLogin}
						>
							Register
						</button>
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
					Don't have an account?
					<button className="redirect-button" onClick={toggleLogin}>
						Register
					</button>
				</div>
			</div>
		</>
	);

	const RegisterWindow = (
		<>
			<div className="main-container register-window">
				<div className="left-container">
					<div className="mobile-only mobile-banner">
						<FontAwesomeIcon icon={faTree} size="6x"></FontAwesomeIcon>
					</div>
					<h1>Register</h1>
					<form>
						<h3>
							Email
							{!registerEmail.match(emailRegex) && (
								<span style={{ color: "red" }}>*</span>
							)}
						</h3>
						<input type="email" onChange={changeRegisterEmail}></input>
						<h3>
							Username
							{registerName === "" && <span style={{ color: "red" }}>*</span>}
						</h3>
						<input type="text" onChange={changeRegisterName}></input>
						<h3 style={{ position: "relative" }}>
							Password
							{!validPassword(registerPassword) && (
								<span style={{ color: "red" }}>*</span>
							)}
							<FontAwesomeIcon
								icon={faChevronDown}
								onClick={togglePasswordReq}
								style={{
									marginLeft: "3px",
									cursor: "pointer",
									transition: "all 0.2s ease",
									transform: passwordReqOpen ? "rotate(0.5turn)" : "",
								}}
							></FontAwesomeIcon>
						</h3>
						<div className="password-reqs">
							<span>
								- At least 8 characters long
								{registerPassword.length <= 7 && (
									<span style={{ color: "red" }}>*</span>
								)}
							</span>
							<span>
								- At least one uppercase letter
								{!/[A-Z]+/.test(registerPassword) && (
									<span style={{ color: "red" }}>*</span>
								)}
							</span>
							<span>
								- At least one lowercase letter
								{!/[a-z]+/.test(registerPassword) && (
									<span style={{ color: "red" }}>*</span>
								)}
							</span>
							<span>
								- At least one number
								{!/[0-9]+/.test(registerPassword) && (
									<span style={{ color: "red" }}>*</span>
								)}
							</span>
						</div>
						<input type="password" onChange={changeRegisterPassword}></input>
						<h3>
							Confirm Password
							{registerConfirm !== registerPassword && (
								<span style={{ color: "red" }}>*</span>
							)}
						</h3>
						<input
							type="password"
							id="confirm-password"
							onChange={changeRegisterConfirm}
						></input>
						<button
							className="submit-button"
							disabled={
								!(
									emailRegex.test(registerEmail) &&
									registerPassword === registerConfirm &&
									validPassword(registerPassword) &&
									registerName !== ""
								)
							}
							onClick={(e) => {
								e.preventDefault();
								onSignup({
									email: registerEmail,
									password: registerPassword,
									username: registerName,
									role: 1,
								});
							}}
						>
							Submit
						</button>
					</form>
					<div className="mobile-only" style={{ marginTop: "24px" }}>
						Already have an account?
						<button
							className="redirect-button mobile-only"
							onClick={toggleLogin}
						>
							Login
						</button>
					</div>
				</div>
				<div className="right-container">
					<FontAwesomeIcon icon={faTree} size="6x"></FontAwesomeIcon>
					<h1>Discover Lincoln</h1>
					<p style={{ maxWidth: "18em" }}>
						Sign up for an account to unlock a seamless experience exploring
						Lincoln’s top attractions, exciting events, and local businesses.
						Gain easy access to everything Lincoln has to offer, all in one
						place!
					</p>
					Already have an account?
					<button className="redirect-button" onClick={toggleLogin}>
						Login
					</button>
				</div>
			</div>
		</>
	);

	// keep these components in this specific order in this array or else RegisterWindow will be on top of LoginWindow and you won't be able to click the latter
	const combinedWindow = [RegisterWindow, LoginWindow];

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
						opacity: ${isLogin ? 1 : 0};
						display: ${isLogin ? "flex" : "none"};
						left: ${isLogin ? "20vw" : "80vw"};
					}
					.register-window {
						opacity: ${!isLogin ? 1 : 0};
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
					.password-reqs {
						display: flex;
						flex-direction: column;
						justify-content: start;
						align-items: center;
						border-radius: 15px;
						height: ${passwordReqOpen ? "100px" : "0px"};
						gap: 2px;
						color: gray;
						width: 250px;
						transition: all ease 0.3s;
						background-color: #ebebeb;
						position: absolute;
						top: 300px;
						overflow: hidden;
						drop-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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

async function onSignup(data) {
	const fetchData = {
		method: "POST",
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI3ODc4ODAyLCJleHAiOjE3MzA0NzA4MDJ9.eIRjv4jr_8FoQDmCebuWh1yLciXSoWZwRERuTmA6jGw`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	try {
		const response = await toast.promise(
			fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users`, fetchData)
				.then(async (res) => {
					if (res.ok === false) {
						let error = await res.json().then((e) => {
							return e.error.message;
						});
						throw new Error(error);
					} else {
						return res.json();
					}
				})
				.then((data) => {
					console.log(data);
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				}),
			{
				loading: "Creating account...",
				success: "Account created! Please sign in.",
				error: "Error creating account.",
				toastId: "signup-toast",
				position: "bottom-center",
			},
			{
				toastId: "login-toast",
				position: "bottom-center",
			}
		);
	} catch (error) {
		toast.error(error.message, { position: "bottom-center" });
	}
}

async function onLogin(data) {
	const fetchData = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	try {
		const response = await toast.promise(
			fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
				fetchData
			)
				.then(async (res) => {
					if (res.ok === false) {
						let error = await res.json().then((e) => {
							return e.error.message;
						});
						throw new Error(error);
					} else {
						return res.json();
					}
				})
				.then((data) => {
					console.log(data);
					localStorage.setItem("jwt", data.jwt);
					localStorage.setItem("username", data.user.username);
					console.log(localStorage.getItem("jwt"));
					console.log(localStorage.getItem("username"));
					setTimeout(function () {
						window.location.replace("/dashboard");
					}, 1000);
				}),
			{
				loading: "Logging in...",
				success: "Logged in successfully.",
				error: "Error logging in.",
			},
			{
				toastId: "login-toast",
				position: "bottom-center",
			}
		);
	} catch (error) {
		toast.error(error.message, { position: "bottom-center" });
	}
}
