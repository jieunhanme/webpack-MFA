import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

/** @type {import('webpack').Configuration} */
export default (envs) => ({
  entry: path.resolve(process.cwd(), "src/main.tsx"),
  output: {
    publicPath: "auto",
    path: path.resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 5 * 1024, // 기준을 5KB 로 변경
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@src": path.resolve(process.cwd(), "src/"),
      "@img": path.resolve(process.cwd(), "public/assets/img/"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: envs.APP_TITLE,
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./shareStates": "./src/states/shareStates",
        // "./i18n": "./src/i18n/config",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-router-dom": {
          singleton: true,
        },
        i18next: {
          singleton: true,
        },
        "react-i18next": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      publicPath: "/",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CleanWebpackPlugin(),
  ],
});
