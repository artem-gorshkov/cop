const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const PROJECT_PATH = '/';

const DEFAULT_WEBPACK_PROPS = {
  changeOrigin: true,
  secure: false,
  ws: false,
  cookieDomainRewrite: 'localhost',
};

module.exports = (env, argv) => {
  const mode = (argv || {}).mode || 'development';
  const isLocal = mode === 'development';

  return {
    mode,
    entry: ['./src/index.tsx'],
    module: {
      rules: [
        { test: /\.(js|ts)x?$/, exclude: /node_modules/, use: ['babel-loader'] },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            isLocal ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: { localIdentName: '[name]_[local]_[hash:base64:5]' },
                importLoaders: 1,
                sourceMap: isLocal,
              },
            },
            'sass-loader',
          ],
        },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        { test: /\.(jpe?g|png|gif)$/, use: [{ loader: 'url-loader', options: { limit: 10000 } }] },
        { test: /\.svg$/, use: [{ loader: 'babel-loader' }, { loader: 'react-svg-loader', options: { jsx: true } }] },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({ filename: 'app_[chunkhash].css' }),
      new webpack.DefinePlugin({ 'process.env': { isLocal } }),
    ],
    optimization: {
      minimize: !isLocal,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@tanstack/react-query': path.join(__dirname, '/node_modules/@tanstack/react-query'),
        components: path.resolve(__dirname, './src/components'),
        constants: path.resolve(__dirname, './src/constants'),
        contexts: path.resolve(__dirname, './src/contexts'),
        hooks: path.resolve(__dirname, './src/hooks'),
        images: path.resolve(__dirname, './src/images'),
        pages: path.resolve(__dirname, './src/pages'),
        services: path.resolve(__dirname, './src/services'),
        styles: path.resolve(__dirname, './src/styles'),
        types: path.resolve(__dirname, './src/types'),
        utils: path.resolve(__dirname, './src/utils'),
      },
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: isLocal ? '/' : PROJECT_PATH,
    },
    devServer: {
      open: ['/'],
      historyApiFallback: true,
      proxy: [
        {
          context: ['/tester/api'],
          target: 'http://localhost:5000/',
          ...DEFAULT_WEBPACK_PROPS,
        },
      ],
      static: {
        directory: path.join(__dirname, 'static'),
        publicPath: PROJECT_PATH,
      },
    },
  };
};
