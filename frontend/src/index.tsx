import { App, ConfigProvider as AntdConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { antdTheme } from 'styles/antd-theme';
import Router from './Router';
import 'styles/global.scss';

const rootNode = document.getElementById('root');

const QUERY_CLIENT_DEFAULT_OPTIONS = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: true,
  },
};

if (rootNode) {
  const queryClient = new QueryClient({
    defaultOptions: QUERY_CLIENT_DEFAULT_OPTIONS,
  });

  createRoot(rootNode).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AntdConfigProvider theme={antdTheme}>
          <App>
            <Router />
          </App>
        </AntdConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
