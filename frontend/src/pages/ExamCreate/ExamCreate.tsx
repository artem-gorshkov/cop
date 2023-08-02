'use client';

import { Button, Layout, notification, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useAppContext } from "contexts/AppContext";
import { STORAGE_KEYS } from "constants/storage";
import { useMutation } from "@tanstack/react-query";
import Api from "services/api";
import { useEffect } from "react";
import ExamDetail from "components/ExamDetail";
import { EMPTY_EXAM_DETAIL } from "constants/exam";

export default function ExamCreate() {
  const { isEntitled } = useAppContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isEntitled) navigate(ROUTES.EXAM_LIST);
  // }, [isEntitled]);

  function handleLogoutSuccess() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  function handleLogoutError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationKey: ['adminLogout'],
    mutationFn: Api.adminLogout,
    onError: handleLogoutError,
    onSuccess: handleLogoutSuccess,
  });

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Конструктор теста</Typography.Title>
        <ExamDetail initialValues={EMPTY_EXAM_DETAIL} onSave={console.log} isSaving={false}/>
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
