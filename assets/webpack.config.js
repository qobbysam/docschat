const path = require('path');
//files complile out to static/assets. 

module.exports = {
  entry: {
    websocket: './websocket/js/index.js',
    upload: './upload/js/index.js',
    generate: './generate/js/index.js',
    paperchat: './paperchat/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../static/assets'),
    publicPath: (chunkData) => {
        const appPublicPaths = {
          websocket: '/static/assets',
          upload: '/static/assets',
          generate: '/static/assets',
          paperchat: '/static/assets'
        };
        const appKey = chunkData.chunk.name;
  
        return appPublicPaths[appKey];
      },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
