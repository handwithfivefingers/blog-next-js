module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb+srv://hdme1995:hdme1995@todo1242021.hehew.mongodb.net/blog-nextjs?retryWrites=true&w=majority",
    WORDPRESS_API_URL: "https://truyenmai.com/graphql"
  },
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
