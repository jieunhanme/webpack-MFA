# react-ts-webpack

basic setting of webpack + ts + react

0. npx init -y

1. init webpack
   webpack config 작성시, 자동 완성 적용
   /\*_ @type {import('webpack').Configuration} _/

2. inti react
   https://dev.to/vvkkumar06/react-webpack-5-setup-understand-everything-you-need-to-know-3idp

3. init typescript
   npx tsc --init

4. webpack.config 용도에 맞게 분리

5. HMR적용
   devServer > hot automatically true 지만 아래와 같은 문구 떄문에 추가
   [webpack-dev-server] "hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.

6. tailwindcss 적용 및 css 최적화

### MiniCssExtractPlugin

개발 모드에서는 CSS를 여러 번 수정하고 DOM에 <style> 요소의 코드로 주입하는 것이 훨씬 빨리 작동하므로 "style-loader"를 사용하고, 배포 모드에서는 MiniCssExtractPlugin.loader를 사용
https://yamoo9.gitbook.io/webpack/webpack/webpack-plugins/extract-css-files

### CssMinimizerPlugin

CSS 파일의 코드 최적화(압축)

7. path alias 적용

8. image loader 적용

9. .env file
   dotenv, dotenv-expand: webpack.config.js 에서 환경 변수를 사용하기 위함
   dotenv-webpack: react프로젝트에서 환경 변수를 사용하기 위함

10. add CleanWebpackPlugin
    build시 dist폴더의 초기화를 진행하도록 설정

TODO

1. devtool
   https://webpack.kr/configuration/devtool/#root
   https://victor-log.vercel.app/post/js-file-minimize-with-webpack-mode-optimization-devtool/

2. module federation
   <%= env %>
