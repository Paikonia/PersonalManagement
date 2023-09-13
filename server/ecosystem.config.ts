module.exports = {
  apps: [
    {
      name: "Personal management backend",
      script: "./dist/app.js",
      env: {
        
        NODE_ENV: "production",
        API_KEY: "your_api_key_here",
        DB_PASSWORD: "KgMate24",
        DB_USER: "aiko",
        DB_HOST: "127.0.0.1",
        PORT: 6050,
        EMAIL_USER: "aikospersonalmanagement@aikosnotes.info",
        EMAIL_PASS: "NQJgGTcK0bza",
        MY_TOKEN_SECRET: "",
      },
    },
  ],
};
