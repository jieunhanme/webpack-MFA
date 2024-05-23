import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import path from "path";
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

  const envs = DotenvExpand.expand(
    Dotenv.config({
      path: [defaultEnvPath, targetEnvPath],
      override: true,
    })
  );

  return merge(common(envs.parsed), {
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new DotenvWebpack({
        defaults: defaultEnvPath,
        path: targetEnvPath,
        expand: true,
        override: true,
      }),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  });
};
