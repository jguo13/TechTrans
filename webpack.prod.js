const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: {
    app: './test/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        // exclude: /node_modules/
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[name][hash].[ext]',
            },
          },
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'), // Source directory
          to: path.resolve(__dirname, 'dist'),     // Destination directory (output)
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     inject: 'head',
  //     template: './public/index.html'
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: 'styles.css'
  //   })
  // ]
};
