import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: 'index' as const
    },
    scales: {
        x: {
            grid: {
                display: false,
                offset: true,
            }
        },
        y: {
            grid: {
                display: false,
            }
        }
    },
    plugins: {
        tooltip: {
            displayColors: false,
            callbacks: {
                title: function (context) {
                    return '';
                },
                label: function (context) {
                    return '' + context.label + "s: " + context.parsed.y;;
                }
            }
        },
        legend: {
            display: false,
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


// export const data = {
//     labels,
//     datasets: [
//         {
//             // label: 'Dataset 1',
//             data: labels.map(() => 25),
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//     ],
// };

const YearGraph = ({ yearData }: { yearData: any }) => {
    //console.log("[YearGraph]: " + Object.keys(yearData));
    const plotData = {
        labels: Object.keys(yearData),
        datasets: [
            {
                data: Object.values(yearData)
            }
        ]
    }
    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'stretch', alignContent: 'stretch' }}>
            <Bar options={options} data={plotData} style={{ flexGrow: 1 }} />
        </div>
    )
}

export default YearGraph;