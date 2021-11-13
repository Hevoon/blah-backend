const Sequelize = require('sequelize')
const db = require('../data/db')

async function findTopic(target, obj) {
  let res = []
  const { jian, ming, lun, zong } = obj
  let res1
  let res2
  let res3
  let res4
  try {
    res1 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights<'${target}' and category = '简答题' order by rand() limit ${jian};`, {
      type: Sequelize.QueryTypes.SELECT
    })
    if (!res1) {
      res1 = []
    }
    if (res1.length < jian) {
      const _res1 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights >= '${target}' and category = '简答题' order by rand() limit ${jian - res1.length};`, {
        type: Sequelize.QueryTypes.SELECT
      })
      res1 = res1.concat(_res1)
    }
    res2 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights<'${target}' and category = '名词解释' order by rand() limit ${ming};`, {
      type: Sequelize.QueryTypes.SELECT
    })
    if (!res2) {
      res2 = []
    }
    if (res2.length < ming) {
      const _res2 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights >= '${target}' and category = '名词解释' order by rand() limit ${ming - res2.length};`, {
        type: Sequelize.QueryTypes.SELECT
      })
      res2 = res2.concat(_res2)
    }
    res3 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where  weights<'${target}' and category = '论述题' order by rand() limit ${lun};`, {
      type: Sequelize.QueryTypes.SELECT
    })
    if (!res3) {
      res3 = []
    }
    if (res3.length < lun) {
      const _res3 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights >= '${target}' and category = '论述题' order by rand() limit ${lun - res3.length};`, {
        type: Sequelize.QueryTypes.SELECT
      })
      res3 = res3.concat(_res3)
    }
    res4 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where  weights< '${target}' and category = '综合题' order by rand() limit ${zong};`, {
      type: Sequelize.QueryTypes.SELECT
    })
    if (!res4) {
      res4 = []
    }
    if (res4.length < zong) {
      const _res4 = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights >= '${target}' and category = '综合题' order by rand() limit ${zong - res4.length};`, {
        type: Sequelize.QueryTypes.SELECT
      })
      res4 = res4.concat(_res4)
      console.log(res4, _res4)
    }

  } catch (err) {
    console.log('err ', err)
  }
  console.log(res1, res2, res3, res4)

  return res.concat(res2 || [], res1 || [], res3 || [], res4 || [])
}
async function findFramework(target) {
  let res = []
  try {
    res = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights<'${target}' and category = '框架' order by rand() limit 2;`, {
      type: Sequelize.QueryTypes.SELECT
    })
    if (!res) {
      res = []
    }
    if (res.length < 2) {
      const _res = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where weights >= '${target}' and category = '框架' order by rand() limit ${2 - res.length};`, {
        type: Sequelize.QueryTypes.SELECT
      })
      res = res.concat(_res)
    }
  } catch (err) {
    console.log('err ', err)
  }
  return res
}
async function findAllTopic(current, search) {
  let res = []
  let total = 0
  try {
    const totalList = await db.seq.query(`select id, name,content,update_time,create_time, category,weights from topic where name like '%${search}%' and category != '框架'`, {
      type: Sequelize.QueryTypes.SELECT
    })
    res = totalList.slice(current * 10, (current + 1) * 10)
    total = totalList.length || 0
    if (!res) {
      res = []
    }
  } catch (err) {
    console.log('err ', err)
  }
  return { res, total }
}

module.exports = {
  findTopic,
  findFramework,
  findAllTopic
}
