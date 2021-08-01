const Sequelize = require('sequelize')
const db = require('../data/db')

async function findTopic(target) {
  let res
  console.log(target,'---tyarget')
  try {
    res = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights='${target}' order by rand() limit 10;`, {
      type: Sequelize.QueryTypes.SELECT
    })

  } catch (err) {
    console.log('err ', err)
  }

  return res
}

module.exports = {
  findTopic
}
