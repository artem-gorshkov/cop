import { App, ConfigProvider as AntdConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { antdTheme } from 'styles/antd-theme';
import Router from './Router';
import 'styles/global.scss';

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <AntdConfigProvider theme={antdTheme}>
        <App>
          <Router />
        </App>
      </AntdConfigProvider>
    </BrowserRouter>
  );
}
