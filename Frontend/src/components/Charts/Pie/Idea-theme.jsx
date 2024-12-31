import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Ideatheme() {
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        axios.get('http://localhost:5001/api/analytics/theme_pie')
            .then((response) => {
                const { labels, data } = response.data;
                setPieData({
                    labels: labels,
                    datasets: [
                        {
                            label: '# of Votes',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error('Error fetching pie chart data:', error);
            });
    }, []);

    const pieOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Votes Distribution',
                font: {
                    size: 30,
                },
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 25,
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '400px', width: '800px' }}>
            <Pie data={pieData} options={pieOptions} />
        </div>
    );
}
