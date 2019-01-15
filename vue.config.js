/**
 * vue 自定义配置文件
 * @type {{}}
 */
module.exports = {
  // 基本路径
  baseUrl: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  assetsDir: '',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // indexPath: 'topic.php',
  filenameHashing: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 1022,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
  },
  // 第三方插件配置
  pluginOptions: {}
}
