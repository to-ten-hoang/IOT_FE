// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'util-dashboardnew',
      title: 'Dashboardnew',
      type: 'item',
      url: '/dashboardnew',
      icon: icons.LineChartOutlined,  // Icon biểu đồ cho dashboard
    }
  ]
};

export default dashboard;
