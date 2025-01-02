import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components for the Pie chart
ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function Ideainnov() {
	const [pieData, setPieData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:5001/api/analytics/innovation_vs_improvement",
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();

				// Ensure data properties exist and are valid numbers
				const {
					innovation = 0,
					improvement = 0,
					duplication = 0,
				} = data;

				// Transform the fetched data into Pie chart format
				setPieData({
					labels: ["Innovation", "Improvement", "Duplication"],
					datasets: [
						{
							label: "# of Ideas",
							data: [innovation, improvement, duplication],
							backgroundColor: [
								"rgba(75, 192, 192, 0.5)",
								"rgba(255, 159, 64, 0.5)",
								"rgba(153, 102, 255, 0.5)",
							],
							borderColor: [
								"rgba(75, 192, 192, 1)",
								"rgba(255, 159, 64, 1)",
								"rgba(153, 102, 255, 1)",
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
				text: "Innovation vs Improvement Distribution",
				font: {
					size: 24,
				},
			},
			legend: {
				display: true,
				position: "right",
				labels: {
					font: {
						size: 16,
					},
				},
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const dataset = tooltipItem.dataset;
						const value = dataset.data[tooltipItem.dataIndex];
						const total = dataset.data.reduce(
							(acc, cur) => acc + cur,
							0,
						);
						const percentage = ((value / total) * 100).toFixed(2);
						return `${tooltipItem.label}: ${value} (${percentage}%)`;
					},
				},
			},
		},
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return <Pie data={pieData} options={pieOptions} />;
}
