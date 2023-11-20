module.exports = {
  // ... other webpack configurations

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/, use: ['raw-loader'] },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/, use: ['style-loader', 'css-loader']
      },
      { test: /public[\//]stylesheets[\//].+\.css$/, use: ['style-loader', 'css-loader'] }
    ],
  },
};