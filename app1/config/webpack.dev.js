import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
// import DotenvWebpack from "dotenv-webpack";
import path from "path";
import ESLintPlugin from "eslint-webpack-plugin";

/** @type {import('webpack').Configuration} */
export default ({ TARGET_ENV }) => {
  return merge(common({ TARGET_ENV }), {
    mode: "development",
    devServer: {
      hot: true, // hot reloading
      port: 3001, // port on which server will run
      // open: true, // open browser automatically on start
      // historyApiFallback: true,
      historyApiFallback: {
        index: "/index.html", // (1) 기본 fallback 타겟 명시
        disableDotRule: true, // (2) URL에 .이 있어도 무조건 index.html로
      },
      client: {
        overlay: {
          runtimeErrors: false,
          warnings: false,
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
            legalComments: "eof", // ← 요거 중요!
            format: "esm", // ← federation은 ESM 포맷을 선호
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
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
        emitWarning: true, // 경고도 출력 (빌드 실패하지 않도록)
        failOnError: false, // 오류 발생 시 빌드 실패
      }),
      // new DotenvWebpack({
      //   defaults: path.resolve(process.cwd(), ".env"),
      //   path: path.resolve(process.cwd(), ".env.dev"),
      //   expand: true,
      //   override: true,
      // }),
    ],
  });
};
