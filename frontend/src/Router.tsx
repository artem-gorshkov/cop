import { ReactElement } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AppWrapper from 'components/AppWrapper';
import { ROUTES } from 'constants/routes';
import AdminAuth from 'pages/AdminAuth';
import TestListPage from 'pages/TestListPage';
import Auth from "pages/Аuth";

const routes: RouteObject[] = [
  {
    element: <AppWrapper />,
    children: [
      { path: ROUTES.TEST_LIST, element: <TestListPage /> },
      { path: ROUTES.ADMIN_AUTH, element: <AdminAuth /> },
      { path: ROUTES.AUTH, element: <Auth /> },
    ],
  },
];

export default function Router(): ReactElement | null {
  return useRoutes(routes);
}
