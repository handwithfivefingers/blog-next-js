const path = require('path')
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['bobo.muzlicdn.xyz']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
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
