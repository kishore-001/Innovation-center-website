import "./Dashboard.css";
import images from "../../assets/images";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

import Ideatheme from "../../components/Charts/Pie/Idea-theme";
import Depttotal from "../../components/Charts/bar/dept-total";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
	const [ideaCount, setIdeaCount] = useState(0);
	const [statusCount, setStatusCount] = useState(0);

	useEffect(() => {
		const fetchIdeaCount = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5001/api/analytics/idea",
				);
				setIdeaCount(response.data.count);
			} catch (error) {
				console.error("Error fetching idea count:", error);
			}
		};

		const fetchStatusCount = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5001/api/analytics/status",
				);
				setStatusCount(response.data.count);
			} catch (error) {
				console.error("Error fetching status count:", error);
			}
		};

		fetchIdeaCount();
		fetchStatusCount();
	}, []);

	return (
		<>
			<Helmet>
				<title>Dashboard - Innovation Center</title>
			</Helmet>
			<div className="db-body">
				{/* SIDEBAR */}
				<Sidebar />
				<div className="db-container">
					{/* HEADER */}
					<Header />
					{/* CONTENT */}
					<div className="db-content">
						<div className="db-card">
							<img src={images.img3} alt="idea-img" />
							<p className="db-card-no">{ideaCount}</p>
							<p className="db-card-text">
								Total Number of Ideas Submitted
							</p>
						</div>
						<div className="db-card">
							<img src={images.img4} alt="completed" />
							<p className="db-card-no">{statusCount}</p>
							<p className="db-card-text">
								Total Number of Ideas Implemended
							</p>
						</div>
						<div className="db-card">
							<img src={images.img5} alt="submit" />
							<p className="db-card-text">Submit your ideas</p>
							<button
								type="button"
								className="db-submit"
								onClick={() => {
									window.location.href = "www.google.com"; // need to put the form data
								}}
							>
								Submit
							</button>
						</div>
						<div className="db-card">
							<div className="db-bar">
								<Depttotal />
								<p className="db-card-text">
									Department-wise idea analysis
								</p>
							</div>
							<div className="db-pie">
								<Ideatheme />
								<p className="db-card-text">Theme analysis</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
