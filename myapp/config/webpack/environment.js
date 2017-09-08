const { environment } = require('@rails/webpacker')

environment.loaders.set(
    'expose jQuery object to global space',
    { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" }
)

const  webpack = require("webpack");
environment.plugins.set(
  'Provide Global Variables',
  new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
  })
)

module.exports = environment
