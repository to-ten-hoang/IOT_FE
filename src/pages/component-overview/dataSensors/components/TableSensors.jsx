import React, { useState, useEffect } from 'react';
import { Table, Input, Select, DatePicker, Button, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { Text } = Typography;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Nhiệt độ',
    dataIndex: 'temperature',
    sorter: (a, b) => a.temperature - b.temperature,
  },
  {
    title: 'Độ ẩm',
    dataIndex: 'humidity',
    sorter: (a, b) => a.humidity - b.humidity,
  },
  {
    title: 'Ánh sáng',
    dataIndex: 'light',
    sorter: (a, b) => a.light - b.light,
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    sorter: (a, b) => new Date(a.time) - new Date(b.time),
    render: (text) => moment(text).format('HH:mm:ss DD/MM/YYYY'),
  }
];

const fieldLabels = {
  time: "Thời gian",
  temperature: "Nhiệt độ",
  humidity: "Độ ẩm",
  light: "Ánh sáng",
};

const TableSensors = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchField, setSearchField] = useState('time');
  const [searchDate, setSearchDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '20', '50'],
      total: 0,
    },
  });

  useEffect(() => {
    // Fetch all data on initial load
    const fetchData = async () => {
      try {
        const response = await axios.get('http://26.247.153.202:8080/api/sensordata');
        setOriginalData(response.data); // Store original data
        setData(response.data.slice(0, tableParams.pagination.pageSize));
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.length,
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;

    // Filter and sort originalData
    const filteredData = originalData
      .sort((a, b) => {
        if (!sorter.order) {
          return 0;
        }
        const compareFunc = columns.find(col => col.dataIndex === sorter.field).sorter;
        const compareResult = compareFunc(a, b);
        return sorter.order === 'ascend' ? compareResult : -compareResult;
      });

    setTableParams({
      pagination: {
        ...pagination,
        total: filteredData.length,
      },
      filters,
      sorter,
    });

    // Update data for the current page only
    setData(filteredData.slice((current - 1) * pageSize, current * pageSize));
  };

  const onSearch = async () => {
    let searchValue;

    // Determine search value based on field type
    if (searchField === 'time') {
      searchValue = searchDate ? searchDate.format('YYYY-MM-DD HH:mm:ss') : '';
    } else {
      searchValue = searchText;
    }

    try {
      if (!searchValue) {
        // Nếu không có giá trị tìm kiếm, tải lại dữ liệu ban đầu
        const response = await axios.get('http://26.247.153.202:8080/api/sensordata');
        setOriginalData(response.data);
        setData(response.data.slice(0, tableParams.pagination.pageSize));
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.length,
            current: 1,
          },
        });
      } else {
        // Nếu có giá trị tìm kiếm, gọi API với giá trị tìm kiếm
        const response = await axios.get(`http://26.247.153.202:8080/api/sensordata?field=${searchField}&term=${searchValue}`);
        setOriginalData(response.data);

        // Reset pagination to the first page after search
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.length,
            current: 1,
          },
        });

        // Update data for the first page
        setData(response.data.slice(0, tableParams.pagination.pageSize));
      }
    } catch (error) {
      console.error('Error searching data:', error);
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
            onPressEnter={onSearch} // Thêm sự kiện Enter để tìm kiếm khi nhấn Enter
            style={{
              width: 200,
            }}
          />
        ) : (
          <Input
            placeholder={`Tìm kiếm theo ${fieldLabels[searchField]}`}
            onChange={handleTextChange}
            onPressEnter={onSearch} // Thêm sự kiện Enter để tìm kiếm khi nhấn Enter
            style={{
              width: 200,
            }}
          />
        )}
        <Button type="primary" onClick={onSearch} style={{ marginLeft: '8px' }}>Tìm kiếm</Button>
      </div>
      <Text style={{ marginTop: 16, display: 'block' }}>
        Tổng số bản ghi: {tableParams.pagination.total}
      </Text>
      <div className='tableData'>
        <Table
          columns={columns}
          rowKey="id"
          dataSource={data}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default TableSensors;
