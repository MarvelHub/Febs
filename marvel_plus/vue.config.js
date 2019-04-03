const path = require("path");
module.exports = {
    outputDir: process.env.VUE_APP_OUT_PUT_DIR,//打包后所存放的目录名称
    lintOnSave: undefined,// 取消 eslint 验证
    devServer: {
        open: true, //浏览器自动打开页面
        port: 8889 // 端口
    },

    configureWebpack: () => ({
        resolve: {
            alias: {
                "@": path.resolve("./src")
            }
        }
    }),

    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"].REQUEST_BASE_URL = JSON.stringify(process.env.REQUEST_BASE_URL);
            return args;
        });
    },
};
