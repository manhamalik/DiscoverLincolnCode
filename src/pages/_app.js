import "@/styles/globals.css";
import React from "react";
import { Noto_Sans } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
	return (
		<main className={notoSans.className}>
			<Component {...pageProps} />
			<Script
				src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBE23iNt4PAV20b1mseRNhI3EY7swSt90U&libraries=places`}
				strategy="beforeInteractive"
				onLoad={() => console.log("Google Maps API script loaded successfully")}
			/>
			<Toaster
				position="bottom-left"
				toastOptions={{
					duration: 5000,
				}}
			/>
		</main>
	);
}
