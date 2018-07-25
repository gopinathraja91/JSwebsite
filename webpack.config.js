module.exports = {
    entry: './js/index.js',
    output: {
      filename: 'bundle.js'
    },
    devtool: 'cheap-eval-source-map',
    module: {
      rules: [{
          test: /\.scss$/,
          use: [
              "style-loader",
              "css-loader",
              "sass-loader"
          ]
      }]
    }
  };