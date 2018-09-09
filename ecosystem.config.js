module.exports = {
  apps: [{
    name: 'tutorial-2',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-197-20-51.compute-1.amazonaws.com',
      key: '~/.ssh/tutorial-2.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ccabo1/youthhack.git',
      path: '/home/ubuntu/tutorial-2',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
