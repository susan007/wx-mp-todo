# min-vant-mpvue

> 基于mpvue、vue/vant实现的房贷计算器

## Build Setup
将项目直接导入`微信开发者工具`即可预览页面，然后选择顺手的开发工具开发即可。
``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn install

# 开发时构建
npm run dev

# 打包构建
npm run build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm run dev:wx
npm run dev:swan
npm run dev:tt
npm run dev:my

# 指定平台的打包构建
npm run build:wx
npm run build:swan
npm run build:tt
npm run build:my

# 生成 bundle 分析报告
npm run build --report
```
## 上线
* 选择上传代码，填写版本号及本次上传备注。
* 微信小程序后台选择`版本管理`->`提交审核`，等待审核通过即可上线。
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
