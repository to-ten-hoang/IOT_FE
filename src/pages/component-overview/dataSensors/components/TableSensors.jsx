import React, { useState, useEffect } from 'react';
import { Table, Input, Select, DatePicker, Button, Typography } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { Text } = Typography;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    // sorter: true,
  },
  {
    title: 'Nhiệt độ',
    dataIndex: 'temperature',
    sorter: true,
  },
  {
    title: 'Độ ẩm',
    dataIndex: 'humidity',
    sorter: true,
  },
  {
    title: 'Ánh sáng',
    dataIndex: 'light',
    sorter: true,
  },
  {
    title: 'Thời gian',
    dataIndex: 'timeConvert',
    sorter: true,
    render: (text) => {
      const date = new Date(text);
      return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
    },
  },
];

const fieldLabels = {
  time: 'Thời gian',
  temperature: 'Nhiệt độ',
  humidity: 'Độ ẩm',
  light: 'Ánh sáng',
};

const TableSensors = () => {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('time');
  const [searchDate, setSearchDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // Hàm để định dạng ngày giờ theo đúng định dạng "YYYY-MM-DD HH:mm:ss"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Hàm gọi API mặc định
  const fetchDefaultData = async () => {
    try {
      const response = await axios.get('http://26.247.153.202:8080/api/sensordata');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching default data:', error);
    }
  };

  // Hàm gọi API với điều kiện tìm kiếm
  const fetchData = async () => {
    try {
      const term = searchField === 'time' && searchDate ? formatDate(searchDate.toDate()) : searchText;
      const params = {
        field: searchField,
        term,
        order,
      };

      const queryString = `field=${encodeURIComponent(params.field)}&term=${encodeURIComponent(term).replace(
        /\+/g,
        ' '
      )}${order ? `&order=${encodeURIComponent(params.order)}` : ''}`;

      const url = `http://26.247.153.202:8080/api/sensordata?${queryString}`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect để gọi API mặc định khi không có điều kiện tìm kiếm
  useEffect(() => {
    if (!isSearching) {
      fetchDefaultData();
      const interval = setInterval(fetchDefaultData, 2000);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  // useEffect để gọi API tìm kiếm khi có điều kiện tìm kiếm
  useEffect(() => {
    if (isSearching) {
      fetchData();
      const interval = setInterval(fetchData, 2000);
      return () => clearInterval(interval);
    }
  }, [isSearching, searchField, searchDate, searchText, order]);

  const onSearch = () => {
    if (
      (searchField !== 'time' && !searchText.trim()) ||
      (searchField === 'time' && !searchDate)
    ) {
      setIsSearching(false);
      fetchDefaultData();
    } else {
      setIsSearching(true);
      fetchData();
    }
  };

  const handleFieldChange = (value) => {
    setSearchField(value);
    setSearchText('');
    setSearchDate(null);
  };

  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      setOrder(sorter.order === 'ascend' ? 'ASC' : 'DESC');
    } else {
      setOrder(null);
    }
    setPagination(pagination);
    fetchData();
  };

  return (
    <div className='dataSensors'>
      <div className='search'>
        <Select
          defaultValue="time"
          style={{ width: 150, marginRight: 8 }}
          onChange={handleFieldChange}
        >
          <Option value="time">Thời gian</Option>
          <Option value="temperature">Nhiệt độ</Option>
          <Option value="humidity">Độ ẩm</Option>
          <Option value="light">Ánh sáng</Option>
        </Select>
        {searchField === 'time' ? (
          <DatePicker
            showTime
            placeholder={`Tìm kiếm theo ${fieldLabels[searchField]}`}
            onChange={handleDateChange}
            style={{ width: 200 }}
          />
        ) : (
          <Input
            placeholder={`Tìm kiếm theo ${fieldLabels[searchField]}`}
            onChange={handleTextChange}
            style={{ width: 200 }}
          />
        )}
        <Button type="primary" onClick={onSearch} style={{ marginLeft: '8px' }}>
          Tìm kiếm
        </Button>
      </div>
      <Text style={{ marginTop: 16, display: 'block' }}>
        Tổng số bản ghi: {data.length}
      </Text>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        pagination={{
          ...pagination,
          pageSizeOptions: ['5', '10', '15', '20'],
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default TableSensors;
