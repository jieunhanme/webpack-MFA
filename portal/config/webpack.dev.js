import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import DotenvWebpack from "dotenv-webpack";
import path from "path";

/** @type {import('webpack').Configuration} */
export default () => {
  return merge(common, {
    mode: "development",
    devServer: {
      hot: true, // hot reloading
      port: 3000, // port on which server will run
      open: true, // open browser automatically on start
      historyApiFallback: true,
      client: {
        overlay: {
          runtimeErrors: false,
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          loader: "esbuild-loader",
          options: {
            target: "ESNext",
            tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
      new DotenvWebpack({
        defaults: path.resolve(process.cwd(), ".env"),
        path: path.resolve(process.cwd(), ".env.dev"),
        expand: true,
        override: true,
      }),
    ],
  });
};
