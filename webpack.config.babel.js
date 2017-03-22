import path from 'path';

export default {
    entry: {
        'k-means': './src/k-means/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/', filename: '[name].bundle.js'
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
