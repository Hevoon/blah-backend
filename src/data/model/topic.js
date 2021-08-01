let db = require('../db');
let Sequelize = require('sequelize');
let moment = require('moment');

let Model = db.defineModel('topic', {
  // id: Sequelize.INTEGER,
  name: Sequelize.STRING,
  weights: Sequelize.INTEGER,
  category: Sequelize.STRING,
  content: Sequelize.STRING,
  create_time: Sequelize.DATE,
  update_time: Sequelize.DATE,
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Model;