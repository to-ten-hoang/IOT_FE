import React, { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import Chart from './components/Chart'; // Import component Chart
import ControlPanel from './components/ControlPanel'; // Import component ControlPanel
import InfoCards from './components/InfoCards'; // Import component InfoCards
import axios from 'axios'; // Import Axios
import "./dashboardNew.scss";

export default function DashboardNew() {
  const [data, setData] = useState([]); // Lưu trữ dữ liệu từ API
  const [devices, setDevices] = useState([]);

  // Gọi API để lấy dữ liệu thật
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://26.247.153.202:8080/api/');
        console.log(response.data);
        setData(response.data); // Lưu dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi API ngay khi component mount

    // Gọi API mỗi 5 giây để cập nhật dữ liệu
    const intervalId = setInterval(() => {
      fetchData();
    }, 500); // Gọi API mỗi 5 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []); // useEffect sẽ chỉ chạy một lần khi component mount

  // Lấy dữ liệu mới nhất từ mảng
  const latestData = data.length > 0 ? data[data.length - 1] : { temperature: 0, humidity: 0, light: 0 };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className='dashboardNew'>
      {/* Sử dụng dữ liệu mới nhất từ API */}
      <InfoCards 
        temperature={latestData.temperature} 
        humidity={latestData.humidity} 
        light={latestData.light} 
      />
      <Row gutter={20} className='chart-button'>
        <Col span={16}>
          <Card bordered={false} className="chart-container"> 
            <Chart data={data} /> {/* Sử dụng component Chart */}
          </Card>
        </Col>
        <Col span={8}>
          <ControlPanel onChange={onChange} /> {/* Sử dụng component ControlPanel */}
        </Col>
      </Row>
    </div>
  );
}
