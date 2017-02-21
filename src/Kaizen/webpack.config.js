// The plugin that loads your source code in Aurelia.
var AureliaWebPackPlugin = require('aurelia-webpack-plugin');
// This is a node tool to resolve paths.
var path = require('path');
// We need this to use the CommonsChunkPlugin.
var webpack = require('webpack');
// The plugin that adds the script tags to our index.html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',
    entry: {
        app: './src/main'
    },
    output: {
        path: path.resolve('wwwroot'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map'
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },
    module: {
        loaders: [

            { test: /\.ts$/, loader: 'ts-loader' },
            //This loader reads our html templates that are referenced and bundles them with our javascript.
            { test: /\.html$/, loader: 'html-loader', exclude: path.resolve('Index.html') }
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
}