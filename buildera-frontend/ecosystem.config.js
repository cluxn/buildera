module.exports = {
  apps: [
    {
      name: "buildera-frontend",
      script: ".next/standalone/server.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
