// import path from 'path'
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/client/client.jsx", // входная точка - исходный файл
    output:{
        path: path.join(path.resolve(),'./dist/server/public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/server/public/',
        filename: "bundle.js"       // название создаваемого файла
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    plugins: ["@babel/plugin-proposal-class-properties"],
                    presets:[
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]  // используемые плагины
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ttf|eot|woff)$/,
                exclude: /(node_modules)/,
                use: [
                    'url-loader',
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src', 'assets', 'fonts'),
                    to: 'fonts',
                },
                {
                    from: path.resolve('src', 'assets', 'photo'),
                    to: 'photo',
                },
                {
                    from: path.resolve('src', 'assets', 'colors'),
                    to: 'colors',
                }
            ],
        }),
    ],
};
