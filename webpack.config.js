/*
 * @Author: E-Dreamer
 * @Date: 2022-01-17 13:28:45
 * @LastEditTime: 2022-01-18 15:44:36
 * @LastEditors: E-Dreamer
 * @Description:
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//mini-css-extract-plugin 2.5.0 会报错 MiniCssExtractPlugin is not constructor
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 构建结果分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//压缩js
const TerserPlugin = require('terser-webpack-plugin');
//会单独提取 CSS 并清除用不到的 CSS
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require('glob'); // 文件匹配模式

const path = require('path')

// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}
const PATHS = {
  src: resolve('src')
}

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
  mode: 'development', //模式
  entry: path.join(__dirname, 'src/main.js'), //打包入口文件
  // entry:'./src/main.js',
  output: {
    // filename: "app.[hash:16].js", //输出文件名
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist'),
    // publicPath: '/',
    // assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devtool: 'source-map',
  resolve: {
    //别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    //引入可不带扩展名
    extensions: ['.ts','.js','.jsx', '.json', '.wasm'],
    // 告诉 webpack 优先 src 目录下查找需要解析的文件，会大大节省查找时间
    modules: [resolve('src'), 'node_modules'],
  },
  optimization: {
    minimize: true,// 开启最小化
    minimizer: [
      // 添加 css 压缩配置
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({})
    ],
    //默认配置
    // splitChunks: {
    //   chunks: 'async', // 有效值为 `all`，`async` 和 `initial`
    //   minSize: 20000, // 生成 chunk 的最小体积（≈ 20kb)
    //   minRemainingSize: 0, // 确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
    //   minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
    //   maxAsyncRequests: 30, // 最大的按需(异步)加载次数
    //   maxInitialRequests: 30, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: { // 配置提取模块的方案
    //     defaultVendors: {
    //       test: /[\/]node_modules[\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
    splitChunks:{
      cacheGroups:{
        default: false,
        styles:{
          name: 'styles',
          test: /\.(s?css|less|sass)$/,
          chunks: 'all',
          enforce: true,
          priority: 10,
        },
        common: {
          name: 'chunk-common',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 2,
          enforce: true,
          reuseExistingChunk: true,
        }
      }
    }
  },
  module: {
    rules: [
      //转换规则
      // {
      //   test: /\.css$/i, //匹配所有css文件
      //   use: ['style-loader','css-loader','postcss-loader'], // use: 对应的 Loader 名称
      // },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // 将 JS 字符串生成为 style 节点
      //     'style-loader',
      //     // 将 CSS 转化成 CommonJS 模块
      //     'css-loader',
      //     // 将 Sass 编译成 CSS
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.less$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i, //匹配 scss|sass css
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          // 添加 loader
          'css-loader',
          'postcss-loader',
          'sass-loader',
          //'less-loader' 放在一起会报错 因为scss和less 变量 语法都不相同
        ],
      },
      // asset 资源模块 webpack5.x 新增 不在需要file-loader url-loader
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: '[name][hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, //超过50kb不转 base64
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过100kb不转 base64
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        },
      },
    ],
  },
  plugins: [
    //配置插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    // 自动清空打包目录
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 添加插件
      filename: '[name].[hash:8].css',
    }),
    new BundleAnalyzerPlugin({
      // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      // generateStatsFile: true, // 是否生成stats.json文件
    }),
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
    }),
  ],
  devServer: {
    // static: { //静态文件目录 这是webpack-dev-server >= 4.0.0的写法
    //   directory: path.join(__dirname, 'public'),
    // },
    contentBase: path.resolve(__dirname, 'public'), //静态文件目录
    compress: true, //是否开启压缩 gzip
    port: 8080, //端口号
    //open:true ,//自动打开浏览器
  },
}

module.exports = (env, argv) => {
  console.log('argv.mode=', argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config
}
