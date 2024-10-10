import { useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function LoggerOutter() {
	const auth = useContext(AuthContext);

	useEffect(() => {
		// Check if the auth values are already empty to avoid redundant updates
		if (auth.jwt || auth.username) {
			auth.setter({ jwt: "", username: "", setter: auth.setter });
			localStorage.setItem("jwt", "");
			localStorage.setItem("username", "");
		}
	}, [auth]);

	return null;
}
