import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components for the Pie chart
ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function StatusImpr() {
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

				// Map the Status and Count into the Pie chart format
				const labels = data.map((item) => item.Status);
				const counts = data.map((item) => item.Count);

				// Set the Pie chart data
				setPieData({
					labels,
					datasets: [
						{
							label: "Innovation Status",
							data: counts,
							backgroundColor: [
								"rgba(75, 192, 192, 0.7)",
								"rgba(255, 99, 132, 0.7)",
							],
							borderColor: [
								"rgba(75, 192, 192, 1)",
								"rgba(255, 99, 132, 1)",
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
					size: 20,
				},
			},
			legend: {
				display: true,
				position: "right",
				labels: {
					font: {
						size: 15,
					},
					color: "#333", // Legend text color
				},
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const dataset = tooltipItem.dataset;
						const currentValue =
							dataset.data[tooltipItem.dataIndex];
						const total = dataset.data.reduce((a, b) => a + b, 0);
						const percentage = (
							(currentValue / total) *
							100
						).toFixed(2);
						return `${dataset.label}: ${currentValue} (${percentage}%)`;
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
