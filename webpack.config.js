// webpack의 구성옵션 - nodeJS 환경에서 동작함
//import
const path = require('path') // path라는 전역 모듈을 가져옴
const HtmlPlugin = require('html-webpack-plugin') //  html 파일 읽어와서 개발서버 오픈
const CopyPlugin = require('copy-webpack-plugin') // 정적 파일 dist(변환 폴더)로 가져오기 - css 파일을 만약 static 폴더에 넣어놓으면 자동으로 dist로 가져올수 있다.

// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정 / 기존 parcel-bundler에서는 parcel index.html을 사용 했음.
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'), // __dirname은 현재파일에 있는 경로를 지칭함. / resolve 메소드로 첫번째 인수와 두번째 인수의 경로를 합쳐줌. 
    // filename: 'main.js',
    clean: true // 지정한 파일 외에 지워줌
  },
  
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // html 파일에 style태그에 해석된 내용을 삽입함.
          'css-loader', // js에서 css를 해석하기 위함
          'postcss-loader',
          'sass-loader' // 아래 있을수록 먼저 동작함
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({ // html 파일과 main.js를 병합하여 dist 폴더에 만들어줌
      template: './index.html'
    }),
    new CopyPlugin({ // static 파일을 dist폴더에 만들어줌
      patterns: [
        { from: 'static' }
      ]
    })
  ],
  devServer: { // 개발 서버 오픈시 설정해주는것
    host: 'localhost'
  } 
}

