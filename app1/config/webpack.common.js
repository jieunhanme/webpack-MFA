import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
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

  return {
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
      new HtmlWebpackPlugin({ template: "index.html", publicPath: "/", chunks: ['main'], 
        // 'remoteEntry.js'는 제외  
        }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new CleanWebpackPlugin(),
      new webpack.container.ModuleFederationPlugin({
        name: process.env.APP_TITLE,
        filename: "remoteEntry.js",
        remotes: {
          portal: "portal@http://localhost:3000/remoteEntry.js",
        },
        exposes: {
          "./Routes": "./src/routes",
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
      new DotenvWebpack({
        defaults: defaultEnvPath,
        path: targetEnvPath,
        expand: true,
        override: true,
      }),
    ],
  }
};
