
const fs = require('fs')
module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: "dist",
    // webpack-dev-server 相关配置
    productionSourceMap: false,
    lintOnSave: false,
    css: {//配置高于chainWebpack中关于css loader的配置
        //modules: true, // 是否开启支持‘foo.module.css’样式
        //extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入
        sourceMap: false,// 是否在构建样式地图，false将提高构建速度
        loaderOptions: {// css预设器配置项
			sass: {
                prependData:`
                @import "~@/assets/comm/mixin.scss";
                `
                // data: fs.readFileSync('./src/assets/comm/mixin.scss', 'utf-8')
                // data: `@import "./src/assets/comm/mixin.scss";`
			}
		}
    },
    chainWebpack:config=>{
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        // config.plugins.delete('preload');
    },
    devServer: {
        open: process.platform === 'darwin',
        // host: '127.0.0.1',
        port: 8889,
        https: false,
        hotOnly: false,
        proxy: {
            '/backend': {
                target: "http://47.106.155.169:83/",
                ws: true,
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': '/'
                // }
            }
        }, // 设置代理
        before: app => { }
    }
}