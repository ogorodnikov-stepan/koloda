import { Configuration as WebpackConfig } from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MiniSVGDataURI from 'mini-svg-data-uri';
import Dotenv from 'dotenv-webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import lightningcss from 'lightningcss';
import browserslist from 'browserslist';
import TerserPlugin from 'terser-webpack-plugin';

type Config = WebpackConfig & { devServer: DevServerConfig };

interface Env {
  mode: 'production' | 'development';
}

const config = ({ mode }: Env): Config => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    mode: mode || 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      clean: true,
      path: path.resolve(__dirname, 'build'),
      publicPath: 'auto',
      filename: '[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js'],
          },
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }),
                transpileOnly: isDev,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: ['autoprefixer'] } },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          type: 'asset/inline',
          generator: {
            dataUrl(content: any) {
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
          directory: path.resolve(__dirname, 'build'),
          publicPath: '/',
        },
      ],
    },
    devtool: isDev ? 'source-map' : undefined,
    stats: { errorDetails: true },
    optimization: {
      minimize: true,
      minimizer: <Config['plugins']>[
        new CssMinimizerPlugin<any>({
          minify: CssMinimizerPlugin.lightningCssMinify,
          minimizerOptions: {
            targets: lightningcss.browserslistToTargets(browserslist('> 0.3% and not dead')),
          },
        }),
        isProd && new TerserPlugin(),
      ].filter(Boolean),
    },
    plugins: <Config['plugins']>[
      new Dotenv({
        path: path.resolve(__dirname, `.env.${mode}`),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        base: isProd ? 'https://ogorodnikov-stepan.github.io/koloda/' : 'http://localhost/',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [{ from: 'public', to: './' }],
      }),
      new ForkTsCheckerWebpackPlugin(),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
};

export default config;
