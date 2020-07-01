const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~routes': path.resolve(__dirname, 'src/routes'),
      '~models': path.resolve(__dirname, 'src/models'),
      '~controllers': path.resolve(__dirname, 'src/controllers')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      nodeArgs: '--inspect=0.0.0.0:9229',
      verbose: true
    })
  ],
  externals: [nodeExternals()],
  watch: true,
  devtool: 'inline-source-map'
};
