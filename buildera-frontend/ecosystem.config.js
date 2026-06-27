module.exports = {
  apps: [
    {
      name: "buildera-frontend",
      script: "node_modules/.bin/next",
      args: "start",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
