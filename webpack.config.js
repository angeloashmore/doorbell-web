var webpack = require("webpack");

module.exports = {
  devtool: 'sourcemap',

  entry: {
    main : [
      __dirname + "/node_modules/babel-core/browser-polyfill.js",
      "./js/app.js"
    ]
  },

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
      { test: /\.js?$/, loader: "babel", exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?stage=0"},
      { test: /\.json?$/, loader: "json" },
      { test: /\.css$/, loader: "style!css" }
    ],
    noParse : [
      /\/babel-core\/browser-polyfill\.js$/
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
