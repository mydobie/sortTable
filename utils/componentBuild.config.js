// const webpack = require('webpack');
// This can be used to create a packaged dist version
// instead of just the component files
// use this command:  webpack --mode production --config componentBuild.config.js

// It is  being kept in the project for reference but it is not currently being used
const path = require('path');
const pkg = require('../package.json');

const libraryName = pkg.name;
module.exports = {
  entry: path.join(__dirname, './src/Components/index.jsx'),
  output: {
    path: path.join(__dirname, './compiled'),
    filename: 'bundle.js',
    library: libraryName,
    libraryTarget: 'umd',

    umdNamedDefine: true,
  },

  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    extensions: ['.jsx', '.js', '.json'],
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
};
