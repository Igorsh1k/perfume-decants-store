module.exports = {
  apps: [
    {
      name: 'perfume-store',
      script: '.next/standalone/server.js',
      cwd: '/var/www/perfume-decants-store',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/pm2/perfume-store-error.log',
      out_file: '/var/log/pm2/perfume-store-out.log',
    },
  ],
};
