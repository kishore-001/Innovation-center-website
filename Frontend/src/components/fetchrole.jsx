import { useState, useEffect } from "react";
import axios from "axios";

const FetchRole = () => {
	const [role, setRole] = useState("");

	const [username, setUsername] = useState("");

	useEffect(() => {
		const fetchRole = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5001/api/decode",
					{
						withCredentials: true,
					},
				);
				if (!response.data.role || !response.data.username) {
					setRole("visitor");
					setUsername("visitor");
					return;
				}
				setRole(response.data.role);
				setUsername(response.data.username);
			} catch (error) {
				console.error("Error fetching role and username:", error);
			}
		};

		fetchRole();
	}, []);

	return { username: username, role: role };
};

export default FetchRole;
