module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['bobo.muzlicdn.xyz']
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
        },
      ],
    })
    return config
  }
}
