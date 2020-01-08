const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
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
			}
		}
    },
    chainWebpack:config=>{
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
    },
    configureWebpack:{
        plugins: [
            //服务器设置
            //gzip  on; 
            //gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/,//压缩那些文件
                threshold:10240,//超过10kb 就压缩
                deleteOriginalAssets:false//是否删除原文件
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({//在build 的时候才会使用此插件
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        }
                    }
                })
            ]
          }
    },
    devServer: {
        open: process.platform === 'darwin',
        // host: '127.0.0.1',
        port: 8889,
        https: false,
        hotOnly: false,
        proxy: {
            '/act/': {
                target: "http://credit.6699xt.com",
                ws: true,
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': '/'
                // }
            },
            '/api/': {
                target: "http://credit.6699xt.com",
                ws: true,
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': '/'
                // }
            },
            '/dataapi/': {
                target: "http://credit.6699xt.com",
                ws: true,
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': '/'
                // }
            }
        }, // 设置代理
        before: app => { }
        //新的开发分支
    }
}


