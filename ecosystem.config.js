module.exports = {
  apps : [{
    name   : "master_v_balashihe_graphql_api",
    cwd: "/var/www/cms/master_v_balashihe_graphql_api",
    script : "./production-build.js",
    env: {
       NODE_ENV: "production"
    },
    max_memory_restart: "2G",
  },{
    name: "master_v_balashihe",
    cwd: "/var/www/cms/master_v_balashihe",
    script: 'npm start',
    env: {
       NODE_ENV: "production"
    },
    max_memory_restart: "2G",
  },]
}
