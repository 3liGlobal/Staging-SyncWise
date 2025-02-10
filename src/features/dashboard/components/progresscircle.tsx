import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressCircleProps {
  value: number;
  icon: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ value, icon }) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['#4C2BBF', '#D8D8FC'],
        borderWidth: 0,
        borderRadius:[10,0]
      },
    ],
  };

  const options = {
    cutout: '90%',
    rotation: 0,
    circumference: 360,
    plugins: {
    },
  };

  return (
    <div style={{ width: '100px', height: '100px', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: '#3e98c7',
        }}
      >
        <img src={icon} className="mt-2 ml-1" />
      </div>
    </div>
  );
};

export default ProgressCircle;
