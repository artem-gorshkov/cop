import { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 28,
    fontWeightStrong: 400,
    borderRadius: 0,
  },
  components: {
    Layout: {
      colorBgHeader: 'black',
      colorBgBody: 'white',
    },
    Button: {
      colorBorder: 'black',
      buttonPaddingHorizontal: 10,
      controlHeight: 50,
    },
    Typography: {
      titleMarginBottom: 0,
      fontWeightStrong: 500,
    },
  },
};
