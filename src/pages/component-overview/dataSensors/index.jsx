import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
import "./components/TableSensors"
import TableSensors from './components/TableSensors';
import "./dataSensors.scss";

const onSearch = (value, _e, info) => console.log(info?.source, value);

function dataSensors() {
  return (
    <div className='dataSensors'>
        <div className='search'>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <div className='tableData'>
          <TableSensors />
        </div>
    </div>
  )
}

export default dataSensors
