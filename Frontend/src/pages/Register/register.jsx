import "./register.css";
import icons from "../../assets//icons";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const username = event.target["reg-username"].value.toUpperCase();
		const password = event.target["reg-password"].value;
		fetch("http://localhost:5001/api/fetch/allowed_user")
			.then((response) => response.json())
			.then((data) => {
				if (data[username]) {
					fetch("http://localhost:5001/api/register", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, password }),
					})
						.then((response) => {
							if (response.ok) {
								alert("Registration Success");
								navigate("/signin");
							} else {
								throw new Error("Registration failed");
							}
						})
						.catch((error) => {
							console.error("Error:", error);
							alert("Registration failed 2");
						});
				} else {
					alert("You are not permitted");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("Failed to fetch allowed usernames");
			});
	};
	return (
		<div className="reg-container">
			<Helmet>
				{" "}
				<title>Register - Innovation Center</title>{" "}
			</Helmet>
			<div className="reg-box">
				<img
					src={icons.icon3}
					alt="Renault Nissan Logo"
					className="reg-logo"
				/>
				<p className="reg-para">
					Welcome to Innovation Center
					<br />
					&emsp;&ensp;<span>Sign&nbsp;</span>into your account
				</p>
				<form onSubmit={handleSubmit}>
					<div className="reg-input-group">
						<label htmlFor="reg-username">Username</label>
						<input
							type="text"
							id="reg-username"
							name="reg-username"
							placeholder="Enter your username"
						/>
					</div>
					<div className="reg-input-group">
						<label htmlFor="reg-password">Password</label>
						<input
							type="password"
							id="reg-password"
							name="reg-password"
							placeholder="Enter your password"
						/>
					</div>
					<button type="submit" className="reg-button">
						Register
					</button>
				</form>
				<p className="reg-link">
					have an account? <a href="/signin">Sign in</a>
				</p>
				<p className="reg-guest">
					Sign in as{" "}
					<a
						onClick={() => {
							window.location.href = "/";
							document.cookie = "token=; path=/; max-age=0";
						}}
					>
						Guest
					</a>
				</p>
			</div>
			<div className="reg-image">
				<img src={images.img2} alt="Car Showroom" />
			</div>
		</div>
	);
}
