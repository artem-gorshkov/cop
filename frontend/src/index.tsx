import { App } from 'antd';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <App>
        <Router />
      </App>
    </BrowserRouter>
  );
}
