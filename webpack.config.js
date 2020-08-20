const path = require('path')
const defaults = require('@wordpress/scripts/config/webpack.config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  ...defaults,
  entry: {
    index: path.resolve(process.cwd(), 'src', 'index.js'),
    card: path.resolve(process.cwd(), 'src', 'gutenberg/card.js'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    ...defaults.module,
    rules: [
      ...defaults.module.rules,
      {
        test: /\.js$/,
        include: [/node_modules\\@kuworking\\block-landing-three/, /node_modules\\@kuworking\\methods/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-transform-modules-commonjs'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'files/',
            },
          },
        ],
      },
    ],
  },
}
