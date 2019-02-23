const Webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const configurator = {
  entries: function(){
    var entries = {
      application: [
        "./assets/js/application.js",
        "./node_modules/jquery-ujs/src/rails.js",
        "./assets/css/application.scss"
      ],
    }
    return entries
  },
  plugins() {
    var plugins = [
      new CleanObsoleteChunks(),
      new Webpack.ProvidePlugin({$: "jquery",jQuery: "jquery"}),
      new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
      new CopyWebpackPlugin([{from: "./assets",to: ""}], {copyUnmodified: true,ignore: ["css/**", "js/**", "src/**"] }),
      new Webpack.LoaderOptionsPlugin({minimize: true,debug: false}),
      new ManifestPlugin({fileName: "manifest.json"}),
      new VueLoaderPlugin()
    ];

    return plugins
  },

  moduleOptions: function() {
    return {
      rules: [
        {test: /\.html$/, loader: "raw-loader"},
        {test: /\.vue/, loader: "vue-loader"},
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: {sourceMap: true}},
            { loader: "sass-loader", options: {sourceMap: true}}
          ]
        },
        { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/},
        { test: /\.jsx?$/,loader: "babel-loader",exclude: /node_modules/ },
        { test: /\.(woff|woff2|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,use: "url-loader"},
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,use: "file-loader" },
        { test: require.resolve("jquery"),use: "expose-loader?jQuery!expose-loader?$"},
        { test: /\.go$/, use: "gopherjs-loader"}
      ]
    }
  },
  buildConfig: function(){
    // NOTE: If you are having issues with this not being set "properly", make
    // sure your GO_ENV is set properly as `buffalo build` overrides NODE_ENV
    // with whatever GO_ENV is set to or "development".
    const env = process.env.NODE_ENV || "development";

    var config = {
      mode: env,
      entry: configurator.entries(),
      output: {filename: "[name].[hash].js", path: `${__dirname}/public/assets`},
      plugins: configurator.plugins(),
      module: configurator.moduleOptions(),
      resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
          vue$: `${__dirname}/node_modules/vue/dist/vue.esm.js`,
          router$: `${__dirname}/node_modules/vue-router/dist/vue-router.esm.js`
        }
      },
    }

    if( env === "development" ){
      config.plugins.push(new LiveReloadPlugin({appendScriptTag: true}))
      return config
    }

    const uglifier = new UglifyJsPlugin({
      uglifyOptions: {
        beautify: false,
        mangle: {keep_fnames: true},
        output: {comments: false},
        compress: {}
      }
    })

    config.optimization = {
      minimizer: [uglifier]
    }

    return config
  }
}

module.exports = configurator.buildConfig()