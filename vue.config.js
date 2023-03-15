module.exports = {
    lintOnSave: false,
    productionSourceMap: false, //打包的时候不生产map文件
    devServer: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换
                target: 'http://127.0.0.1:7070',
                //target: 'http://110.80.137.55:100/',
                //  target: 'http://bqfk.xmboq.com/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                args[0].title = "报表系统";
                return args;
            })
    },
}