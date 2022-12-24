const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },
};
