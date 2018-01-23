const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');/*压缩JS*/
const htmlPlugin = require('html-webpack-plugin');/*HTML文件的发布*/
const extractTextPlugin = require("extract-text-webpack-plugin"); /*分离css/less/sass*/

module.exports = {
  //入口文件的配置项
  entry:{
    entry:'./src/entery.js'//入口文件
  },
  //出口文件的配置项
  output:{
    path:path.resolve(__dirname,'dist'),//输出
    filename:'common.js',
    publicPath:'http://172.17.16.236:1717'
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules:[
      {
        test:/\.css$/,
        use: extractTextPlugin.extract({ //CSS分离
          fallback: "style-loader",
          use: "css-loader"
        }),
        /*use:['style-loader',"css-loader"]*/
      }, {
        test:/\.(jpg|png|gif)/, //图片路径修改
        use:[{
            loader:'url-loader',
            options:{
              limit:500000 //小于500000B的文件转为base64
            }
        }]
      }, {
        test:/\.less$/,
        use: extractTextPlugin.extract({ //less分离
          fallback: "style-loader",
          use: [{loader:'css-loader'}, {loader:'less-loader'}]
        }),
      }, {
        test:/\.(js|jsx)$/,/*babel配置*/
        use:{
          loader: "babel-loader",
          options: {
            presets:['env','react'] /*也可以使用['es2015','react']*/
          }
        },
        exclude:/node_modules/
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
      new uglify(), //js文件压缩
      new htmlPlugin({ //html文件发布
          minify:{
              removAttrbuteQuotes:true
          },
          hash:true,
          template:'./src/index.html'
      }),
      new extractTextPlugin('css/index.css'),//分离CSS
      new webpack.ProvidePlugin({ /* 全局配置$ */
        $:"jquery"
      })
  ],
  //配置webpack开发服务功能
  devServer:{
    contentBase:path.resolve(__dirname,'dist'),//配置环境
    compress:true,
    host:'172.17.16.236',
    port:1717
  }
}