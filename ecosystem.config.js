module.exports = {
  apps : [{
    name      : 'szhmqd21_node',
    script    : './src/app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : 'root',
      host : '39.108.131.40',
      ref  : 'origin/master',
      repo : 'git@github.com:Duanzihuang/szhmqd21_node.git',
      path : '/ftp/node/production',
      'post-deploy' : 'git pull && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
