let config = {
  database: 'blah', // 使用哪个数据库
  username: 'root', // 用户名
  password: 'fuckmysql123', // 口令
  host: '172.18.53.203', // 主机名
  port: 3306, // 端口号，MySQL默认3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};

module.exports = config;