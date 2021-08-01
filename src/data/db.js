const Sequelize = require('sequelize');
const mysqlConfig = require('../configs/config.js');
let seq = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool,
    port:mysqlConfig.port
});

function defineModel(name, attributes,attr) {
    return seq.define(name, attributes,attr);
}


exports.defineModel = defineModel;
exports.seq = seq;