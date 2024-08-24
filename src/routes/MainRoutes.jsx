import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const DashboardNew = Loadable(lazy(() => import('pages/component-overview/dashboardNew/index')));
const DataSensors = Loadable(lazy(() => import('pages/component-overview/dataSensors/index')));
const ActionHistory = Loadable(lazy(() => import('pages/component-overview/actionHistory/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardNew />
    },
    {
      path: 'dashboardnew',
      element: <DashboardNew />
    },
    {
      path: 'dataSensors',
      element: <DataSensors />
    },
    {
      path: 'actionHistory',
      element: <ActionHistory />
    }
  ]
};

export default MainRoutes;
