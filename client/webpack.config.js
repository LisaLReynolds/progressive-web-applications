const HtmlWebpackPlugin = require('html-webpack-plugin');  //create our index.html in our dist bundle
const WebpackPwaManifest = require('webpack-pwa-manifest');//create our manifest.json file in our bundle
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');//create our service worker

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E",
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
        
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'text editor that saves even when offline',
        background_color: '#ffffff',
        start_url: '/',
        publicPath: "/",
        fingerprints: false, 
        inject: true, 
        icons: [
          {
      src: path.resolve('src/images/logo.png'),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      destination: path.join("assets", "icons"),
          },
          {

          }
        ]
      })
    ],
// rules for css and babel
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  };
};
