const path = require("path")
const webpack = require('webpack')

const dotenv = require('dotenv');
const env = dotenv.config().parsed;

// const { styles } = require('@ckeditor/ckeditor5-dev-utils')

const resolve = loc => path.resolve(__dirname, loc);
module.exports = {
  pages: {
    index: {
      entry: resolve("src/pages/index/main.js"),
      template: resolve("public/index.html"),
      filename: 'index.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    signup: {
      entry: resolve("src/pages/signup/main.js"),
      template: resolve("public/index.html"),
      filename: 'signup.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'signup']
    },
    mypage: {
      entry: resolve("src/pages/mypage/main.js"),
      template: resolve("public/index.html"),
      filename: 'mypage.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'mypage']
    },
    otherpage: {
      entry: resolve("src/pages/otherpage/main.js"),
      template: resolve("public/index.html"),
      filename: 'otherpage.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'otherpage']
    },
    market: {
      entry: resolve("src/pages/market/main.js"),
      template: resolve("public/index.html"),
      filename: 'market.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'market']
    },
    activity: {
      entry: resolve("src/pages/activity/main.js"),
      template: resolve("public/index.html"),
      filename: 'activity.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'activity']
    },
    buycomplete: {
      entry: resolve("src/pages/buycomplete/main.js"),
      template: resolve("public/index.html"),
      filename: 'buycomplete.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'buycomplete']
    },
    authority: {
      entry: resolve("src/pages/authority/main.js"),
      template: resolve("public/index.html"),
      filename: 'login.html',
      title: 'Parula login',
      chunks: ['chunk-vendors', 'chunk-common', 'authority']
    },
    detail: {
      entry: resolve("src/pages/detailProduct/main.js"),
      template: resolve("public/index.html"),
      filename: 'detail.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'detail']
    },
    khj: {
      entry: resolve("src/pages/Test/khj/main.js"),
      template: resolve("public/index.html"),
      filename: 'khj.html',
      title: 'Parula',
      chunks: ['chunk-vendors', 'chunk-common', 'khj']
    },
    kjh: {
      entry: resolve("src/pages/Test/kjh/main.js"),
      template: resolve("public/index.html"),
      filename: 'kjh.html',
      title: 'NFT Front page',
      chunks: ['chunk-vendors', 'chunk-common', 'kjh']
    },
    jos: {
      entry: resolve("src/pages/Test/jos/main.js"),
      template: resolve("public/index.html"),
      filename: 'jos.html',
      title: 'NFT Front page',
      chunks: ['chunk-vendors', 'chunk-common', 'jos']
    },
  },
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        cash: 'cash-dom',
        Popper: '@popperjs/core'
      }),
      new webpack.DefinePlugin({
      }),
    ]
  },
  lintOnSave: false
}
