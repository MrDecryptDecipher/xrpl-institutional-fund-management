module.exports = {
  apps: [
    {
      name: 'xrpl-frontend',
      script: 'node_modules/vite/bin/vite.js',
      args: '--port 5002 --host 0.0.0.0',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5002
      }
    },
    {
      name: 'xrpl-convex-dev',
      script: 'node_modules/.bin/convex',
      args: 'dev --typecheck=disable',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};