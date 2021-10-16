module.exports = {
  reactStrictMode: true,
  // basePath: '/apps/blog-nextjs',
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
    )
    return config
  }
}
