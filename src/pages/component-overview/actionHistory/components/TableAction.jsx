import React, { useState } from 'react';
import { Table, Input, Select, DatePicker, Button, Typography } from 'antd';
import moment from 'moment';
import fakeData from './fakeData';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const TableAction = () => {
  const [filteredData, setFilteredData] = useState(fakeData);
  const [searchField, setSearchField] = useState('timeConvert');
  const [searchDate, setSearchDate] = useState(null);
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'LED', value: 'LED' },
        { text: 'FAN', value: 'FAN' },
        { text: 'AIR', value: 'AIR' },
      ],
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: 100,
      filters: [
        { text: 'Bật', value: true },
        { text: 'Tắt', value: false },
      ],
      onFilter: (value, record) => record.action === value,
      render: (action) => (action ? 'Bật' : 'Tắt'),
    },
    {
      title: 'Thời gian',
      dataIndex: 'timeConvert',
      width: 180,
      render: (text) => moment(text).format('HH:mm:ss DD/MM/YYYY'),
    },
  ];

  const onSearch = () => {
    let result = fakeData;

    if (searchField === 'timeConvert' && searchDate) {
      result = result.filter((item) =>
        moment(item.timeConvert).isSame(searchDate, 'day')
      );
    } else if (searchField === 'action') {
      const actionValue = searchText.toLowerCase() === 'bật' ? true : searchText.toLowerCase() === 'tắt' ? false : null;
      if (actionValue !== null) {
        result = result.filter((item) => item.action === actionValue);
      }
    } else if (searchText) {
      result = result.filter((item) =>
        item[searchField].toString().toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    setFilteredData(result);
  };

  const handleFieldChange = (value) => {
    setSearchField(value);
    setSearchText('');
    setSearchDate(null);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select
          defaultValue="timeConvert"
          style={{ width: 150, marginRight: 8 }}
          onChange={handleFieldChange}
        >
          <Option value="timeConvert">Thời gian</Option>
          <Option value="name">Tên thiết bị</Option>
          <Option value="action">Hành động</Option>
        </Select>

        {searchField === 'timeConvert' ? (
          <DatePicker
            showTime
            placeholder="Tìm kiếm theo thời gian"
            onChange={(date) => setSearchDate(date)}
            style={{ width: 200, marginRight: 8 }}
          />
        ) : (
          <Search
            placeholder={`Tìm kiếm theo ${searchField}`}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={onSearch}
            style={{ width: 200, marginRight: 8 }}
          />
        )}
        <Button type="primary" onClick={onSearch}>Tìm kiếm</Button>
      </div>

      <Text style={{ marginBottom: 16 }}>Tổng số bản ghi: {filteredData.length}</Text>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20'],
        }}
        scroll={{
          y: 500,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default TableAction;
