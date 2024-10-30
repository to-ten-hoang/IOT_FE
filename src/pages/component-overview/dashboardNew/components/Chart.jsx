import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text } from 'recharts';

const Chart = ({ data }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Nhiệt độ, Độ ẩm, và Ánh sáng theo thời gian</h3>
      <LineChart width={600} height={400} data={data} 
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#e4534f" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
        <Line type="monotone" dataKey="light" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default Chart;
