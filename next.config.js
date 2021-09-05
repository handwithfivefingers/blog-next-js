module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/strick-css/:path*',
        destination: '/tricks-css/:path*',
        permanent: false
      },
    ]
  },
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
