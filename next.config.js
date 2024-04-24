loadEnv(process.env.APP_ENV)
const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });
  //   return config;
  // },
}

/**
 * @param {string} appEnv
 */
function loadEnv(appEnv = 'local') {
  const env = {
    ...require(`./env/env.${appEnv}`),
    NEXT_PUBLIC_APP_ENV: appEnv,
  }

  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value
  })
}
