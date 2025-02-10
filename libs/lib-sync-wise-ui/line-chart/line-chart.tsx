import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

interface ChartProps {
  data: {
    datasets: Array<{ data: (null | number)[] }>;
    labels: string[];
  };
  options: object;
}

export function LineChart({ data, options }: ChartProps) {
  return <Line data={data} options={options}  />;
}
