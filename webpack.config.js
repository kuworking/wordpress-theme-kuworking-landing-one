const path = require('path')
const defaults = require('@wordpress/scripts/config/webpack.config')
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
}
