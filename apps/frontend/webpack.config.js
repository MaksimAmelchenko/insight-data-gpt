const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), config => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // prevent source-map-loader from processing hast-util-raw to avoid the following error:
  // Module Warning (from ../../node_modules/source-map-loader/dist/cjs.js):
  // Failed to parse source map from '/node_modules/hast-util-raw/node_modules/parse5/dist/common/doctype.js.map'
  config.module.rules = config.module.rules.map(rule => {
    if (rule.loader && rule.loader.includes('source-map-loader')) {

      return {
        ...rule,
        exclude: /node_modules\/hast-util-raw/,
      };
    }
    return rule;
  });

  return config;
});
