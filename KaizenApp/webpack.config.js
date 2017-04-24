// The plugin that loads your source code in Aurelia.
var AureliaWebPackPlugin = require('aurelia-webpack-plugin');
// This is a node tool to resolve paths.
var path = require('path');
// We need this to use the CommonsChunkPlugin.
var webpack = require('webpack');
// The plugin that adds the script tags to our index.html
var HtmlWebpackPlugin = require('html-webpack-plugin');

var typescript = require('awesome-typescript-loader');

module.exports = {
    target: 'web',
    entry: {
        app: './src/main'
    },
    output: {
        path: path.resolve('wwwroot'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map'
    },
    // Turn on sourcemaps
    devtool: 'eval-source-map',
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ],
        plugins: [
            // this plugin must exceptionally be loaded from here
            // otherwise TS paths config will not work
            new typescript.TsConfigPathsPlugin()
        ],
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /\.d.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: path.resolve('Index.html')
            },
            {
                test: /\.css/,
                use: [
                    { loader: "style-loader", options: { sourceMap: true } },
                    { loader: "css-loader", options: { sourceMap: true } }
                ]
            },
            { test: /\.scss$/, loader: 'ignore-loader' },
            { test: /\.tt$/, loader: 'ignore-loader' },
            { test: /\.ttinclude$/, loader: 'ignore-loader' },
            { test: /\.d.ts$/, loader: 'ignore-loader' }
        ]
    },
    plugins: [
        //The Aurelia Plugin.
        new AureliaWebPackPlugin(),
        // This is what will create a separate bundle for the libs under 'aurelia' 
        // in our entry section.
        //new webpack.optimize.CommonsChunkPlugin({ name: ['aurelia'] }),
        // This plugin will add our bundles to the html file and copy it 
        // to the build folder.
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunksSortMode: 'dependency'
        }),
        new typescript.CheckerPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
        contentBase: "./wwwroot",
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                secure: false
            }
        }
    }
};