
命令：npx webpack  打包 

webpack 默认支持处理 JS 与 JSON 文件，其他类型都处理不了，这里必须借助 Loader 来对不同类型的文件的进行处理。

## Loader 就是将 Webpack 不认识的内容转化为认识的内容
css-loader 解析css文件
style-loader 就是将处理好的 css 通过 style 标签的形式添加到页面上 <style></style>

更多时候，我们都希望可以通过 CSS 文件的形式引入到页面上 <link src='xxx.css'>
mini-css-extract-plugin 

-- | -- | --
file-loader解决图片引入问题，并将图片 copy 到指定目录，默认为 disturl-loader解依赖 file-loader，当图片小于 limit 值的时候，会将图片转为 base64 编码，大于 limit 值的时候依然是使用 file-loader 进行拷贝img-loader压缩图片
-- | -- | --


## 插件（plugin）
与 Loader 用于转换特定类型的文件不同，插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务


html-webpack-plugin 解析html
clean-webpack-plugin 自动清空打包目录

cross-env 区分环境

webpack-dev-server 热部署


