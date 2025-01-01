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

export default function Ideatotal() {
	const [barData, setBarData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Month mapping from number to short month name
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:5001/api/analytics/idea_by_month",
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();

				// Transform data into Chart.js format
				const labels = data.map(
					(item) => `${monthNames[item.Month - 1]} ${item.Year}`,
				);
				const counts = data.map((item) => item.Count);

				setBarData({
					labels,
					datasets: [
						{
							label: "Ideas Submitted",
							backgroundColor: "lightskyblue",
							borderColor: "rgba(0,0,0,1)",
							borderWidth: 2,
							data: counts,
							maxBarThickness: 50, // Ensure a consistent max bar width
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

	const barOptions = {
		plugins: {
			title: {
				display: true,
				text: "Ideas Submitted per Month",
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
