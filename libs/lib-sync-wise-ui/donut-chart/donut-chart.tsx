// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Doughnut} from 'react-chartjs-2';
import {ArcElement, Chart, Chart as ChartJS, Legend, Tooltip} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type PropType = {
    centerData: string,
    data: {
        datasets: Array<{ data: (null | number)[] }>;
        labels: string[];
    };
    options: object;
}

export function DonutChart({centerData, data, options}: PropType) {
    const centerText = {
        id: 'centerText',
        beforeDatasetsDraw(chart: Chart): boolean | void {
            const {ctx} = chart;
            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = 'bold 16px';
            ctx.fillStyle = '#140A3E';
            ctx.textAlign = 'center';
            ctx.fillText(centerData, xCoor, yCoor)
        }
    }

    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            <Doughnut data={data} options={options} plugins={[centerText]} />
        </div>
    );
}
