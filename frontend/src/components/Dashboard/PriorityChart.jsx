import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PriorityChart = ({ data }) => {
    const chartData = {
        labels: ['Low Priority', 'Medium Priority', 'High Priority'],
        datasets: [
            {
                label: 'Tasks by Priority',
                data: [data.Low, data.Medium, data.High],
                backgroundColor: [
                    'rgba(72, 187, 120, 0.8)',
                    'rgba(237, 137, 54, 0.8)',
                    'rgba(245, 101, 101, 0.8)',
                ],
                borderColor: [
                    'rgba(72, 187, 120, 1)',
                    'rgba(237, 137, 54, 1)',
                    'rgba(245, 101, 101, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 13,
                        weight: '600',
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 13,
                },
            },
        },
    };

    return (
        <div style={{ height: '300px', padding: '20px' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default PriorityChart;
