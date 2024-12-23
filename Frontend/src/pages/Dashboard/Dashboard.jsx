import "./Dashboard.css"
import images from "../../assets/images"
import { Helmet } from "react-helmet"
import Sidebar from "../../components/sidebar"
import Header from "../../components/header"
import { Bar,Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

export default function Dashboard() {

    // Bar chart data

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Ideas Submitted',
                backgroundColor: ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue', 'lightgreen', 'silver', 'lightpink'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    const barOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Ideas Submitted per Month',
                font: {
                    size: 30, // Correctly nested font size
                },
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 25, // Change this value to adjust the legend font size
                    },
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: (value) => value,
                font: {
                    size: 30,
                },
            },
        },
    };
    
    // Pie chart data

    const pieData = {
        labels: ['Quality', 'Cost', 'Safety', 'Time'],
        datasets: [{
            data: [25, 35, 20, 20], // Example data
            backgroundColor: ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue'],
            hoverBackgroundColor: ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']
        }]
    };

    const pieOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 25, // Change this value to adjust the legend font size
                    },
                },
            },
            datalabels: {
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${value}%`;
                },
                font: {
                    size: 30,
                },
            },
        },
    };

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
                            <p className="db-card-no">1234</p>
                            <p className="db-card-text">Total Number of Ideas Submitted</p>
                        </div>
                        <div className="db-card">
                            <img src={images.img4} alt="completed" />
                            <p className="db-card-no">234</p>
                            <p className="db-card-text">Total Number of Ideas Implemended</p>
                        </div>
                        <div className="db-card">
                            <img src={images.img5} alt="submit" />
                            <p className="db-card-text">Submit your ideas</p>
                            <button type="button" className="db-submit" >Submit</button>
                        </div>
                        <div className="db-card">
                            <div className="db-bar">
                                <Bar data={barData} options={barOptions} />
                                <p className="db-card-text">Department-wise idea analysis</p>
                            </div>
                            <div className="db-pie">
                                <Pie data={pieData} options={pieOptions} />
                                <p className="db-card-text">Theme analysis</p>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}