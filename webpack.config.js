"use strict";
const WebpackShellPlugin = require("webpack-shell-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./App.ts",
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "wcforge.js",
    publicPath: "pathOrUrlWhenProductionBuild",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
        //  'style-loader', // creates style nodes from JS strings
          // {
          //   loader: 'css-loader', // translates CSS into CommonJS
          //   options: {
          //     importLoaders: 1
          //   }
          // },
          {
            loader:'sass-loader',
            options: { 
              sassOptions:{
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          },
          //'postcss-loader', // post process the compiled CSS
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js" , ".css" , ".scss"],
  },
  devServer: {
    contentBase: path.join(__dirname, "."),
    compress: true,
    port: 9000,
    open: true,
    liveReload: true,
  },
  devtool: "source-map",
};
