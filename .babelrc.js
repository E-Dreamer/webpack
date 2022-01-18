/*
 * @Author: E-Dreamer
 * @Date: 2022-01-18 13:18:22
 * @LastEditTime: 2022-01-18 13:20:36
 * @LastEditors: E-Dreamer
 * @Description:  babel配置
 */
module.exports = {
  presets: [
    [
      // 用于将高级语法转换为低级语法
      '@babel/preset-env',
      {
        // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
        // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
        useBuiltIns: 'usage',
        corejs: '3.9.1', // 是 core-js 版本号
        targets: {
          chrome: '58',
          ie: '11',
        },
      },
    ],
  ],
}
