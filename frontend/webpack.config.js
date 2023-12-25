/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assetFilename = '[name].[contenthash][ext][query]';

const DEV_SERVER_BACKEND_API = 'localhost:3002';

module.exports = (env) => {
   const isProduction = !!env.production;
   const rootPath = env?.root_path || '';

   return {
      entry: './src/index.js',
      target: 'web',
      devtool: 'source-map',
      output: {
         path: path.resolve(__dirname, 'build'),
         clean: true,
         publicPath: '/',
         filename: 'static/js/[name].js',
         chunkFilename: 'static/js/[name].chunk.js'
      },
      performance: {
         maxAssetSize: 1024000,
         maxEntrypointSize: 2048000,
         hints: false
      },
      watchOptions: {
         ignored: /node_modules/
      },
      plugins: [
         new CopyWebpackPlugin({
            patterns: [
               {
                  from: 'public/widget.html',
                  to: 'widget.html',
                  toType: 'file'
               }
            ]
         }),
         new webpack.ProvidePlugin({
            React: 'react'
         }),
         new HtmlWebpackPlugin({
            inject: true,
            hash: false,
            favicon: 'public/favicon.ico',
            filename: 'index.html',
            template: 'public/index.html',
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
         }),
         new webpack.DefinePlugin({
            'process.env.REACT_APP_ROOT_PATH': JSON.stringify(rootPath),
            'process.env.REACT_APP_MODE': JSON.stringify(
               isProduction ? 'production' : 'development'
            )
         })
      ],
      devServer: {
         compress: true,
         historyApiFallback: true,
         https: false,
         open: true,
         hot: true,
         static: {
            directory: path.join(__dirname, 'build')
         },
         proxy: {
            '/api': `http://${DEV_SERVER_BACKEND_API}`
         },
         port: 3000,
         devMiddleware: {
            writeToDisk: true
         }
      },
      stats: {
         children: false,
         chunks: false,
         chunkModules: false,
         chunkOrigins: false,
         modules: false
      },
      module: {
         rules: [
            {
               test: /\.(js|jsx)$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env', '@babel/preset-react']
                  }
               }
            },
            {
               test: /\.(sa|sc|c)ss$/,
               use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
               test: /.(png|svg|jpg|jpeg)$/i,
               type: 'asset/resource'
            },
            {
               test: /\.(woff|woff2|eot|ttf)$/i,
               generator: {
                  filename: `fonts/${assetFilename}`
               }
            }
         ]
      },
      resolve: {
         extensions: ['*', '.js', '.jsx'],
         alias: {
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entitles': path.resolve(__dirname, 'src/entitles')
         }
      }
   };
};
