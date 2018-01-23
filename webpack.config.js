const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry:{
    entry:'./src/entery.js'//入口文件
  },
  output:{
    path:path.resolve(__dirname,'dist'),//输出
    filename:'common.js',
    publicPath:'http://172.17.16.236:1717'
  },
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
      }
    ]
  },
  plugins:[
      new uglify(), //js文件压缩
      new htmlPlugin({ //html文件发布
          minify:{
              removAttrbuteQuotes:true
          },
          hash:true,
          template:'./src/index.html'
      }),
      new extractTextPlugin('css/index.css')//分离CSS
  ],
  devServer:{
    contentBase:path.resolve(__dirname,'dist'),//配置环境
    compress:true,
    host:'172.17.16.236',
    port:1717
  }
}