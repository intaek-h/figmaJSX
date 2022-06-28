/* eslint-disable no-undef */
const path = require("path");
const sass = require("sass");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  name: "figmajsx",
  mode: process.env.NODE_ENV || "development",
  devtool: process.env.NODE_ENV === "production" ? "hidden-source-map" : "eval",
  entry: {
    app: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.scss?$/,
        exclude: /node_module/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: true,
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new MiniCssExtractPlugin({ filename: `main.css` }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.[hash].js",
  },
  devServer: {
    port: 3000,
    hot: true,
  },
};
