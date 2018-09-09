const {
  SENDGRID_API_KEY,
  EMAILS,
  VENTURES_LINK,
  APPLICATIONS_LINK,
} = process.env;

console.log('ENV SETUP', {
  SENDGRID_API_KEY,
  EMAILS,
  VENTURES_LINK,
  APPLICATIONS_LINK,
});

module.exports = {
  apps: [{
    name: 'youthhack',
    script: './index.js',
    env: {
      NODE_ENV: 'development',
      SENDGRID_API_KEY,
      EMAILS,
      VENTURES_LINK,
      APPLICATIONS_LINK,
    },
    env_production: {
      NODE_ENV: 'production',
      SENDGRID_API_KEY,
      EMAILS,
      VENTURES_LINK,
      APPLICATIONS_LINK,
    },
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-197-20-51.compute-1.amazonaws.com',
      key: '~/.ssh/cameron-keys.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ccabo1/youthhack.git',
      path: '/home/ubuntu/youthhack',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
