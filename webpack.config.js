/*
 * @Author: E-Dreamer
 * @Date: 2022-01-17 13:28:45
 * @LastEditTime: 2022-01-17 16:59:00
 * @LastEditors: E-Dreamer
 * @Description:
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//mini-css-extract-plugin 2.5.0 会报错 MiniCssExtractPlugin is not constructor
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

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
  resolve: {
    //别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 //超过50kb不转 base64
          }
        }
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
    ],
  },
  plugins: [
    //配置插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      title:'哈哈哈哈哈'
    }),
    // 自动清空打包目录
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 添加插件
      filename: '[name].[hash:8].css',
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
