const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');

const packageInfo = require('./package.json');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  context: SRC_DIR,
  entry: './index.jsx',
  output: {
    path: OUT_DIR,
    filename: '[name].bundle.[contenthash].js',
    chunkFilename: '[name].chunk.[contenthash].js',
    assetModuleFilename: '[path][name].[contenthash][ext][query]',
    hashDigestLength: 8,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [SRC_DIR],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      title: packageInfo.description,
      template: './index.html',
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[contenthash].css',
      chunkFilename: '[name].chunk.[contenthash].css',
    }),
    new RelativeCiAgentWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
