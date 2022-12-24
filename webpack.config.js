const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { VuetifyLoaderPlugin } = require("vuetify-loader");

module.exports = (env = {}) => ({
  mode: env.prod ? "production" : "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "static/img",
              esModule: false, // <- here
            },
          },
        ],
      },

      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new VuetifyLoaderPlugin()],
  devServer: {
    client: {
      overlay: true,
    },
    liveReload: false,
    static: {
      directory: path.join(__dirname, "public"),
    },
    static: __dirname,
    port: 8081,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
