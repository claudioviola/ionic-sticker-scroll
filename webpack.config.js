var path = require('path');
var webpack = require('webpack');

module.exports = {
    watch: true,
    entry: [
        './src/app.js'
    ],

    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    // inline-source-map eval-source-map cheap-module-source-map
    devtool: 'eval-source-map',
    module: {
        // loaders: [{
        //     test: /\.js?$/,
        //     include: [
        //         path.resolve(__dirname, 'src')
        //     ],
        //     exclude: /node_modules/,
        //     loaders: ['ng-annotate', 'babel-loader']
        // }]
        loaders: [{
              test: /\.js?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015']
              }
            }
          ]
    },
    resolve: {
        root: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({filename: './js/[name].map'}),
        new webpack.NoErrorsPlugin(),
    ]
};
