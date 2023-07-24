import { ReactElement } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import TestList from 'pages/TestList';

const routes: RouteObject[] = [{ path: ROUTES.TEST_LIST, element: <TestList /> }];

export default function Router(): ReactElement | null {
  return useRoutes(routes);
}
