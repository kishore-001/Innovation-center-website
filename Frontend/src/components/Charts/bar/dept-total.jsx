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
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

export default function Depttotal() {
	const [barData, setBarData] = useState({
		labels: [],
		datasets: [
			{
				label: "Ideas Submitted",
				backgroundColor: [
					"gold",
					"yellowgreen",
					"lightcoral",
					"lightskyblue",
					"lightgreen",
					"silver",
					"lightpink",
				],
				borderColor: "rgba(0,0,0,1)",
				borderWidth: 2,
				data: [],
			},
		],
	});

	useEffect(() => {
		axios
			.get("http://localhost:5001/api/analytics/dept_bar")
			.then((response) => {
				const { data, labels } = response.data;
				setBarData({
					labels: labels,
					datasets: [
						{
							label: "Ideas Submitted",
							backgroundColor: [
								"gold",
								"yellowgreen",
								"lightcoral",
								"lightskyblue",
								"lightgreen",
								"silver",
								"lightpink",
							],
							borderColor: "rgba(0,0,0,1)",
							borderWidth: 2,
							data: data,
						},
					],
				});
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	const barOptions = {
		plugins: {
			title: {
				display: true,
				text: "Ideas Submitted per Department",
				font: {
					size: 30,
				},
			},
			legend: {
				display: true,
				position: "right",
				labels: {
					font: {
						size: 20,
					},
				},
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<div style={{ height: "400px", width: "800px" }}>
			<Bar data={barData} options={barOptions} />
		</div>
	);
}
