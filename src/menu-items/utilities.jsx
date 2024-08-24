// assets
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LineChartOutlined,
  SlidersOutlined,
} from '@ant-design/icons';

// icons
const icons = {
  AppstoreAddOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LineChartOutlined,
  SlidersOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  children: [
    {
      id: 'util-dashboardnew',
      title: 'Dashboardnew',
      type: 'item',
      url: '/dashboardnew',
      icon: icons.LineChartOutlined,  // Icon biểu đồ cho dashboard
    },
    {
      id: 'util-datasensors',
      title: 'Data Sensors',
      type: 'item',
      url: '/dataSensors',
      icon: icons.SlidersOutlined,  // Icon thanh trượt cho cảm biến dữ liệu
    },
    {
      id: 'util-actionHistory',
      title: 'Action History',
      type: 'item',
      url: '/actionHistory',
      icon: icons.HistoryOutlined,  // Icon lịch sử cho lịch sử hành động
    },
  ]
};

export default utilities;
