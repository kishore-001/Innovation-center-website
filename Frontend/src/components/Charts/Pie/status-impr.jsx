import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components for the Pie chart
ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function Statusimpr() {
	const [pieData, setPieData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:5001/api/analytics/impr_pie_chart_data",
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();

				// Map the department names and counts into the Pie chart format
				const labels = data.map((item) => item.Department);
				const counts = data.map((item) => item.Count);

				// Set the Pie chart data
				setPieData({
					labels,
					datasets: [
						{
							label: "# of Ideas",
							data: counts,
							backgroundColor: [
								"rgba(75, 192, 192, 0.2)",
								"rgba(255, 159, 64, 0.2)",
								"rgba(153, 102, 255, 0.2)",
								"rgba(255, 99, 132, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(255, 206, 86, 0.2)",
								"rgba(75, 192, 192, 0.2)",
								"rgba(153, 102, 255, 0.2)", // Add more colors if needed
							],
							borderColor: [
								"rgba(75, 192, 192, 1)",
								"rgba(255, 159, 64, 1)",
								"rgba(153, 102, 255, 1)",
								"rgba(255, 99, 132, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(75, 192, 192, 1)",
								"rgba(153, 102, 255, 1)", // Add more colors if needed
							],
							borderWidth: 1,
						},
					],
				});
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const pieOptions = {
		plugins: {
			title: {
				display: true,
				text: "Department-wise Innovation Data",
				font: {
					size: 30,
				},
			},
			legend: {
				display: true,
				position: "right",
				labels: {
					font: {
						size: 25,
					},
				},
			},
		},
	};

	// Display loading state or error if occurred
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	// Render Pie chart once data is loaded
	return <Pie data={pieData} options={pieOptions} />;
}
