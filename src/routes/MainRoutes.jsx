import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
const DashboardNew = Loadable(lazy(() => import('pages/component-overview/dashboardNew/index')));
const DataSensors = Loadable(lazy(() => import('pages/component-overview/dataSensors/index')));
const ActionHistory = Loadable(lazy(() => import('pages/component-overview/actionHistory/index')));
const Profiles = Loadable(lazy(() => import('pages/component-overview/profiles/index')));
const Dashboard2 = Loadable(lazy(() => import('pages/component-overview/dashboard2/index')));

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
    },
    {
      path: 'profiles',
      element: <Profiles />
    },
    {
      path: 'dashboard2',
      element: <Dashboard2 />
    },
    {
      path: 'dashboard/default',
      element: <DashboardNew />
    }
  ]
};

export default MainRoutes;
