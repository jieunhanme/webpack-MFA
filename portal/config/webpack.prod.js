import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";
// import { EsbuildPlugin } from "esbuild-loader";
import Dotenv from "dotenv";
import DotenvExpand from "dotenv-expand";
import DotenvWebpack from "dotenv-webpack";

/** @type {import('webpack').Configuration} */
export default ({ TARGET_ENV }) => {
  const defaultEnvPath = path.resolve(process.cwd(), ".env");
  const targetEnvPath =
    TARGET_ENV !== undefined
      ? path.resolve(process.cwd(), `.env.${TARGET_ENV}`)
      : "";

  DotenvExpand.expand(
    Dotenv.config({
      path: [defaultEnvPath, targetEnvPath],
      override: true,
    })
  );

  return merge(common, {
    mode: "production",
    devtool:"source-map",
    // devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            target: "ESNext",
            legalComments: "eof", // ← 요거 중요!
            format: "esm",        // ← federation은 ESM 포맷을 선호
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        // name: process.env.APP_TITLE,
        name: "portal",
        filename: "remoteEntry.js",
        remotes: {
          app1: "app1@http://localhost:3001/remoteEntry.js",
        },
        exposes: {
          "./shareStates": "./src/states/shareStates",
          "./i18n": "./src/i18n/config",
          "./MenuRoot": "./src/Root",
          "./global.css": "./src/style/global.css", // CSS 파일 expose
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
          jotai: {},
          i18next: {
            singleton: true,
          },
          "react-i18next": {
            singleton: true,
          },
        },
      }),
      new MiniCssExtractPlugin(),
      new DotenvWebpack({
        defaults: defaultEnvPath,
        path: targetEnvPath,
        expand: true,
        override: true,
      }),
    ],
    optimization: {
      minimize: false, // 코드 압축 끄기
    },
    // optimization: {
    //   minimizer: [
    //     new EsbuildPlugin({
    //       target: "ESNext", // Syntax to transpile to (see options below for possible values)
    //       css: true,
    //     }),
    //   ],
    // },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  });
};
