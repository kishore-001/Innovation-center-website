import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

export default function Deptinno() {
	const [barData, setBarData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:5001/api/analytics/inno_pie_chart_data",
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();

				// Transform data into Chart.js format
				const labels = data.map((item) => item.Department);
				const counts = data.map((item) => item.Count);
				const colors = data.map(() => getRandomColor());

				setBarData({
					labels,
					datasets: [
						{
							label: "Ideas Submitted",
							backgroundColor: colors,
							borderColor: "rgba(0,0,0,1)",
							borderWidth: 2,
							data: counts,
							maxBarThickness: 50, // Set maximum bar width in pixels
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

	// Helper function to generate random colors
	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const barOptions = {
		plugins: {
			title: {
				display: true,
				text: "Ideas Submitted per Department",
				font: {
					size: 30,
				},
			},
			legend: null,
		},
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return <Bar data={barData} options={barOptions} />;
}
