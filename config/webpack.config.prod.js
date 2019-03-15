'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
//进度条 花里胡哨版本
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
//进度条 朴实无华版本
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
//WebPACK使用“publicPath”来确定应用程序的服务位置。
// Webpack uses `publicPath` to determine where the app is being served from.
//它需要一个尾随斜杠，否则文件资产将得到错误的路径。
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
//有些应用程序不使用推送状态的客户端路由
// Some apps do not use client-side routing with pushState.
//对于这些，“主页”可以设置为“.”以启用相对路径
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
//源映射是重量级资源，并且可能导致大的源文件的内存不足问题
// Source maps are resource heavy and can cause out of memory issue for large source files.

// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const shouldUseSourceMap = false;
//“publicUrl”就像“publicPath”，但我们会把它提供给我们的应用程序
// `publicUrl` is just like `publicPath`, but we will provide it to our app
//就像在JavaScript中的“process.env.PUBLIC_URL”和“index.html”中的%PUBLIC_URL%
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
//省略尾随斜杠为%PUBLIC_URL%/xyz看起来比%PUBLIC_URL%xyz好。
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
//获取环境变量来注入我们的应用程序
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
//断言这只是为了安全
// Assert this just to be safe.
//React开发环境构建缓慢且不适合生产
// Development builds of React are slow and not intended for production.
// if (env.stringified['process.env'].NODE_ENV === ('test'||'uat'||'production')) {
//   throw new Error('Production builds must have NODE_ENV=production.');
// }
//笔记:在这里定义因为它会被多次用到
// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';
//ExtractTextPlugin希望生成输出是平坦的
// ExtractTextPlugin expects the build output to be flat.
//(查看https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
//但是，我们的输出是用CSS、JS和媒体文件夹构成的
// However, our output is structured with css, js and media folders.
//要使该结构以相对路径工作，我们必须使用自定义选项
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? //确保公共路径返回到构建文件夹
    // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};
//这是生产环境的配置
// This is the production configuration.
//它编译缓慢，并专注于产生一个快速和最小束
// It compiles slowly and is focused on producing a fast and minimal bundle.
//开发配置不同，并且存在于单独的文件中
// The development configuration is different and lives in a separate file.
module.exports = {
  //如果有错误，不要试图继续
  // Don't attempt to continue if there are any errors.
  bail: true,
  //我们在生产环境产生sourcemaps。这很慢，但效果很好。
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: shouldUseSourceMap ? 'source-map' : false,
  //在生产中，我们只需要加载polyfills和应用程序代码
  // In production, we only want to load the polyfills and the app code.
  // entry: [require.resolve('./polyfills'), paths.appIndexJs],
  entry:{
      app:[require.resolve('./polyfills'), paths.appIndexJs,],
      vendor: ['react', 'react-dom', 'react-Router','react-Router-dom', 'mobx', 'mobx-react','antd','axios']
    },
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common Component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {

      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
               // This is a feature of `babel-loader` for webpack (not Babel itself).
               // It enables caching results in ./node_modules/.cache/babel-loader/
               // directory for faster rebuilds.
               presets: ['es2015','react','stage-1'],
               plugins: ['transform-decorators-legacy','transform-decorators'],
               cacheDirectory: true,
            },
          },
          // The notation here is somewhat confusing.
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader normally turns CSS into JS modules injecting <style>,
          // but unlike in development configuration, we do something different.
          // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
          // (second argument), then grabs the result CSS and puts it into a
          // separate file in our build process. This way we actually ship
          // a single CSS file in production instead of JS code injecting <style>
          // tags. If you use code splitting, however, any async bundles will still
          // use the "style" loader inside the async code so CSS from them won't be
          // in the main CSS file.
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    },
                  ],
                },
                extractTextPluginOptions
              )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },{
                test:/\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            },
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
     new NyanProgressPlugin({
         nyanCatSays(progress, messages){
            if(progress<1){
              return (progress*100).toFixed(2)+'%'
            }else{
              return  'done,more feature,more bug'
            }
         }
     }),
     new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor','runtime'],
        filename: 'static/js/[name].[hash:8].js',
        minChunks: Infinity
      }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
        drop_debugger: true,
        drop_console: true
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
