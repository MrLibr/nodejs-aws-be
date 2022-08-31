const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (async () => {
  return {
    context: __dirname,
    entry: slsw.lib.entries,
    target: 'node',

    resolve: {
        extensions: ['.js', '.json', '.ts'],
        symlinks: false,
        cacheWithContext: false,
    },

    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },

    externals: [nodeExternals()],

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
              test: /\.(tsx?)$/,
              loader: 'ts-loader',
              exclude: [
                [
                  path.resolve(__dirname, 'node_modules'),
                  path.resolve(__dirname, '.serverless'),
                  path.resolve(__dirname, '.webpack'),
                ],
              ],
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
    }
  };
})();
