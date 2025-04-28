import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import path from "path";
// import webpack from "webpack";
import { EsbuildPlugin } from "esbuild-loader";
// import Dotenv from "dotenv";
// import DotenvExpand from "dotenv-expand";
// import DotenvWebpack from "dotenv-webpack";

/** @type {import('webpack').Configuration} */
export default ({ TARGET_ENV }) => {
  // const defaultEnvPath = path.resolve(process.cwd(), ".env");
  // const targetEnvPath =
  //   TARGET_ENV !== undefined
  //     ? path.resolve(process.cwd(), `.env.${TARGET_ENV}`)
  //     : "";

  // DotenvExpand.expand(
  //   Dotenv.config({
  //     path: [defaultEnvPath, targetEnvPath],
  //     override: true,
  //   })
  // );

  return merge(common({ TARGET_ENV }), {
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            target: "ESNext",
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      // new webpack.container.ModuleFederationPlugin({
      //   name: process.env.APP_TITLE,
      //   filename: "remoteEntry.js",
      //   remotes: {
      //     portal: "portal@http://localhost:3000/remoteEntry.js",
      //   },
      //   exposes: {
      //     "./Routes": "./src/routes",
      //   },
      //   shared: {
      //     react: {
      //       singleton: true,
      //       requiredVersion: "^18.3.1",
      //     },
      //     "react-dom": {
      //       singleton: true,
      //       requiredVersion: "^18.3.1",
      //     },
      //     "react-router-dom": {
      //       singleton: true,
      //     },
      //     jotai: {},
      //     i18next: {
      //       singleton: true,
      //     },
      //     "react-i18next": {
      //       singleton: true,
      //     },
      //   },
      // }),
      new MiniCssExtractPlugin(),
      // new DotenvWebpack({
      //   defaults: defaultEnvPath,
      //   path: targetEnvPath,
      //   expand: true,
      //   override: true,
      // }),
    ],
    optimization: {
      minimizer: [
        new EsbuildPlugin({
          target: "ESNext", // Syntax to transpile to (see options below for possible values)
          css: true,
        }),
      ],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  });
};
