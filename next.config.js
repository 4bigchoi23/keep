const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true
});

module.exports = {
  /* config options here */
  env: {
    title: 'Keep',
    guest: {
      name: 'Guest',
      email: 'guest@anonymous.users',
      image: '/pfimg.svg'
    },
    sneak: {
      name: 'Sneak',
      email: 'sneak@anonymous.users',
      image: '/pfimg.svg'
    },
  },
}
