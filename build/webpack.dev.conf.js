'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const axios = require('axios');
const express = require('express');
const router = express.Router();
// const apiRoutes = express.Router();

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: config.dev.devtool,
  devtool:'source-map',
  // these devServer options should be customized in /config/index.js
  devServer: {
    // before(apiRoutes){
    //   apiRoutes.get('/api/getDiscList',(req,res)=>{
    //     const url = '/api/getDiscList';
    //   //  axios.get(url, {
    //       headers: {
    //         // referer: '配置api地址referer',
    //         // host: '配置api地址host'
    //       },
    //    //   params: req.query  //这是请求的query
    //    // }).then((response) => {
    //       //response是api地址返回的，数据在data里。
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e);
    //     })
    //   });
    //   // apiRoutes.use('/api', apiRoutes);
    // },

    before(router){
      const task='../json/task.json';
      router.get(task,(req,res)=>{
        res.json(task.data);
      });
      // const item='http://www.codinghou.com/liftVue/taskDetail/getDetailJson.action?userId=1&taskId=1';
      // router.get(item,(req,res)=>{
      //   res.jsonp(item.data);
      // });

    },

    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,

    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
