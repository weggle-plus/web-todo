const path = require('path');

module.exports = {
  entry: './src/index.ts', // 엔트리 파일 (TypeScript 진입점)
  output: {
    filename: 'bundle.js', // 번들 파일 이름
    path: path.resolve(__dirname, 'dist'), // 출력 경로
  },
  resolve: {
    extensions: ['.ts', '.js'], // 처리할 파일 확장자
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // TypeScript 파일 처리
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development', // 개발 모드
};
