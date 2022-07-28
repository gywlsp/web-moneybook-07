const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['./src/frontend/index.js'],
  output: {
    path: path.resolve(__dirname, 'src/frontend/public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(
    {
      title: '우아한 가계부',
      favicon: path.resolve(__dirname, "src/frontend/assets/favicon.ico"),
    }
  )],
}
