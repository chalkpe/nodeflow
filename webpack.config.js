import path from 'path';

export default {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/', filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true
    },
    devtool: '#eval-source-map'
};
