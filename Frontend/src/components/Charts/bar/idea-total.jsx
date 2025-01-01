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
	const barData = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
		],
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
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		],
	};

	const barOptions = {
		plugins: {
			title: {
				display: true,
				text: "Ideas Submitted per Month",
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
	};

	return <Bar data={barData} options={barOptions} />;
}
