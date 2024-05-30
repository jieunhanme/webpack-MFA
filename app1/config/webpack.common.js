import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

/** @type {import('webpack').Configuration} */
export default {
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
    fallback: {
      "portal/shareStates": false,
      "portal/i18n": false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html", publicPath: "/" }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CleanWebpackPlugin(),
  ],
};
