const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
        transpileDependencies: true,
        chainWebpack: config => {
            config.module
                .rule('less')
                .test(/\.less$/)
                .use('style-loader')
                .loader('style-loader')
                .end()
                .use('css-loader')
                .loader('css-loader')
                .end()
                .use('less-loader')
                .loader('less-loader')
                .options({
                    // 在这里添加 Less 相关的配置选项
                })
                .end()
        }
    }
)
