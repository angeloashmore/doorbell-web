var webpack = require("webpack");

module.exports = {
  devtool: 'sourcemap',

  entry: [
    "webpack/hot/only-dev-server",
    "./js/app.js"
  ],

  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  resolve: {
    modulesDirectories: ["node_modules", "./js"],
    extensions: ["", ".js", ".json"]
  },

  module: {
    loaders: [
      { test: /\.js?$/, loaders: ["react-hot", "babel"], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?stage=0"},
      { test: /\.json?$/, loader: "json", exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css" }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
