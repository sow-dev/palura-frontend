const resolve = loc => path.resolve(__dirname, loc);
const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const { styles } = require('@ckeditor/ckeditor5-dev-utils')

module.exports = {
  pages: {
    wallet: {
      entry: resolve("src/pages/wallet/main.js"),
      template: resolve("public/index.html"),
      filename: 'wallet.html',
      title: 'Parula remote service',
      chunks: ['chunk-vendors', 'chunk-common', 'wallet']
    },
    product: {
      entry: resolve("src/pages/product/main.js"),
      template: resolve("public/index.html"),
      filename: 'product.html',
      title: 'Parula remote service',
      chunks: ['chunk-vendors', 'chunk-common', 'product']
    },
    order: {
      entry: resolve("src/pages/order/main.js"),
      template: resolve("public/index.html"),
      filename: 'order.html',
      title: 'Parula remote service',
      chunks: ['chunk-vendors', 'chunk-common', 'order']
    }
  },
  parallel: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        cash: 'cash-dom',
        Popper: '@popperjs/core'
      }),
      new webpack.DefinePlugin({}),
    ]
  },
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'))
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')

    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return {
          postcssOptions: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
            },
            minify: true
          })
        }
      })
  },

  lintOnSave: false
}
