import { ReactElement } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AppWrapper from 'components/AppWrapper';
import { ROUTES } from 'constants/routes';
import AdminAuth from 'pages/AdminAuth';
import ExamList from 'pages/ExamList';
import Auth from "pages/Аuth";
import ExamCreate from "pages/ExamCreate";
import ExamEdit from "pages/ExamEdit";

const routes: RouteObject[] = [
  {
    element: <AppWrapper />,
    children: [
      { path: ROUTES.EXAM_LIST, element: <ExamList /> },
      { path: ROUTES.ADMIN_AUTH, element: <AdminAuth /> },
      { path: ROUTES.AUTH, element: <Auth /> },
      { path: ROUTES.CREATE, element: <ExamCreate /> },
      { path: `${ROUTES.EDIT}/:examId`, element: <ExamEdit /> },
    ],
  },
];

export default function Router(): ReactElement | null {
  return useRoutes(routes);
}
