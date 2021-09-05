module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',

          },
        ],
      },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
    )
    return config
  }
}
