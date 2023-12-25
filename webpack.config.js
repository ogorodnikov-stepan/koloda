const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniSVGDataURI = require('mini-svg-data-uri');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: './src/index.tsx',
  output: {
    path: `${__dirname}/dist/`,
    publicPath: '/',
    filename: 'bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          env.production ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        generator: {
          dataUrl(content) {
            return MiniSVGDataURI(content.toString());
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  devServer: {
    port: 4242,
    historyApiFallback: true,
    hot: true,
    static: [
      {
        directory: `${__dirname}/dist/`,
        publicPath: '/',
      },
      {
        directory: `${__dirname}/public/locales`,
        publicPath: '/locales',
      },
    ],
  },
  devtool: env.production ? undefined : 'source-map',
  stats: {
    errorDetails: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new Dotenv({
      path: './.env',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: './' },
      ],
    }),
  ],
});
