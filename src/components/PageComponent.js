import React from "react";
import FooterComponent from "./FooterComponent";
import NavBar from "./NavBar";
import { AuthProvider } from "@/contexts/AuthContext";

export default function PageComponent({
	pageName = "Discover Lincoln",
	children,
	includePadding = false,
	includeBottomMargin = true,
	showClipPath = true,
}) {
	return (
		<div>
			<style jsx>
				{`
					.page-layout {
						min-height: 100vh;
						display: flex;
						flex-direction: column;
						position: relative;
						overflow-x: hidden;
						overflow-x: visible;
					}

					.content {
						box-sizing: border-box;
						width: 100%;
						position: relative;
						min-height: 100vh;
						margin-bottom: ${includeBottomMargin ? "60vh" : "0vh"};
					}
				`}
			</style>
			<AuthProvider>
				<div className="page-layout">
					<NavBar pageName={pageName} />
					<div
						className="content"
						style={{ padding: includePadding ? "2em" : "" }}
					>
						{children}
					</div>
					<FooterComponent showClipPath={showClipPath} />
				</div>
			</AuthProvider>
			</div>

	);
}
