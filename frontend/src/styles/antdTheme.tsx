import { ThemeConfig } from 'antd';

export const ANTD_THEME: ThemeConfig = {
  token: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 28,
    fontWeightStrong: 400,
    borderRadius: 0,
    colorTextPlaceholder: 'black',
  },
  components: {
    Layout: {
      colorBgHeader: 'black',
      colorBgBody: 'white',
    },
    Button: {
      colorBorder: 'black',
      controlHeight: 50,
    },
    Typography: {
      titleMarginBottom: 0,
      fontWeightStrong: 500,
    },
  },
};
