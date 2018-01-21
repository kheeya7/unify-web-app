const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|svg)$/,
            //     loader: 'url-loader?limit=100000'
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test:/\.less$/,
                exclude:'/node_modules',
                loader:"style-loader!css-loader!less-loader"
            }
        ]
    }
};
