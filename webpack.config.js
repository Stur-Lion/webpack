const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry:{
    entry:'./src/entery.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'common.js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
      new uglify(),
      new htmlPlugin({
          minify:{
              removAttrbuteQuotes:true
          },
          hash:true,
          template:'./src/index.html'
      })
  ],
  devServer:{
    contentBase:path.resolve(__dirname,'dist'),
    compress:true,
    host:'localhost',
    port:1717
  }
}