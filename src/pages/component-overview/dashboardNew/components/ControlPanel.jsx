import React, { useEffect, useState } from 'react';
import { Card, Switch, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan, faLightbulb, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import './ControlPanel.scss';
import axios from 'axios';

const ControlPanel = ({ onChange }) => {
  const [fanOn, setFanOn] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [loading, setLoading] = useState({
    fan: false,
    ac: false,
    light: false,
  });

  // Hàm lấy trạng thái ban đầu từ API
  const fetchInitialStatus = async () => {
    try {
      const response = await axios.get('http://26.247.153.202:8080/api/alldevice');
      const devices = response.data;

      devices.forEach(device => {
        if (device.name === 'FAN') setFanOn(device.status);
        if (device.name === 'LED') setLightOn(device.status);
        if (device.name === 'AC') setAcOn(device.status);
      });
    } catch (error) {
      console.error('Error fetching initial status:', error);
    }
  };

  // Gọi hàm lấy trạng thái khi component được tải
  useEffect(() => {
    fetchInitialStatus();
  }, []);

  // Hàm bật/tắt Quạt
  const handleFanChange = async (checked) => {
    setLoading(prev => ({ ...prev, fan: true }));
    try {
      await axios.get(`http://26.247.153.202:8080/api/led?id=1&action=${checked}`);
      setFanOn(checked);
      onChange(checked);
      message.success(`Quạt đã được ${checked ? 'bật' : 'tắt'} thành công.`);
    } catch (error) {
      console.error('Error updating fan status:', error);
      message.error(`Không thể ${checked ? 'bật' : 'tắt'} quạt. Vui lòng thử lại.`);
    } finally {
      setLoading(prev => ({ ...prev, fan: false }));
    }
  };

  // Hàm bật/tắt Điều hòa
  const handleAcChange = async (checked) => {
    setLoading(prev => ({ ...prev, ac: true }));
    try {
      await axios.get(`http://26.247.153.202:8080/api/led?id=3&action=${checked}`);
      setAcOn(checked);
      onChange(checked);
      message.success(`Điều hòa đã được ${checked ? 'bật' : 'tắt'} thành công.`);
    } catch (error) {
      console.error('Error updating AC status:', error);
      message.error(`Không thể ${checked ? 'bật' : 'tắt'} điều hòa. Vui lòng thử lại.`);
    } finally {
      setLoading(prev => ({ ...prev, ac: false }));
    }
  };

  // Hàm bật/tắt Bóng đèn
  const handleLightChange = async (checked) => {
    setLoading(prev => ({ ...prev, light: true }));
    try {
      await axios.get(`http://26.247.153.202:8080/api/led?id=2&action=${checked}`);
      setLightOn(checked);
      onChange(checked);
      message.success(`Bóng đèn đã được ${checked ? 'bật' : 'tắt'} thành công.`);
    } catch (error) {
      console.error('Error updating light status:', error);
      message.error(`Không thể ${checked ? 'bật' : 'tắt'} bóng đèn. Vui lòng thử lại.`);
    } finally {
      setLoading(prev => ({ ...prev, light: false }));
    }
  };

  return (
    <div className='listCard-button'>
      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon
            icon={faFan}
            className={`icon ${fanOn ? 'spinning fan-lit' : ''}`}
          /> Quạt
        </div>
        <Switch
          checked={fanOn}
          onChange={handleFanChange}
          className='switch'
          loading={loading.fan}
        />
      </Card>

      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon
            icon={faSnowflake}
            className={`icon ${acOn ? 'cool' : ''}`}
          /> Điều hòa
        </div>
        <Switch
          checked={acOn}
          onChange={handleAcChange}
          className='switch'
          loading={loading.ac}
        />
      </Card>

      <Card bordered={false} className='card-button'>
        <div>
          <FontAwesomeIcon
            icon={faLightbulb}
            className={`icon ${lightOn ? 'light-lit' : ''}`}
          /> Bóng đèn
        </div>
        <Switch
          checked={lightOn}
          onChange={handleLightChange}
          className='switch'
          loading={loading.light}
        />
      </Card>
    </div>
  );
};

export default ControlPanel;
