import { ReactElement } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AppWrapper from 'components/AppWrapper';
import { ROUTES } from 'constants/routes';
import AdminAuth from 'pages/AdminAuth';
import TestList from 'pages/TestList';

const routes: RouteObject[] = [
  {
    element: <AppWrapper />,
    children: [
      { path: ROUTES.TEST_LIST, element: <TestList /> },
      { path: ROUTES.ADMIN_AUTH, element: <AdminAuth /> },
    ],
  },
];

export default function Router(): ReactElement | null {
  return useRoutes(routes);
}
