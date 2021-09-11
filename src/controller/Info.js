const { sign } = require('jsonwebtoken');
const secret = 'hevoon';
const jwt = require('koa-jwt')({ secret });


const model = require('../data/model/topic');
const Sequelize = require('sequelize');
const { findTopic,findFramework } = require('./utils')
module.exports = {
  //获取题目
  getTopic: async (ctx, next) => {
    try {
      const target1 = await model.min('weights')
      const target2 = await model.max('weights')
      const target = target1 + Math.floor((target2 - target1) / 2)
      console.log('sdsd', target)
      const res = await findTopic(target)
      const updateList = res.map((e) => ({ ...e, weights: e.weights + 1, update_time: new Date() }))
      await model.bulkCreate(updateList, { updateOnDuplicate: true })
      ctx.response.state = 200;
      ctx.response.message = 'success';
      ctx.response.type = 'json';
      ctx.response.body = res
    } catch (err) {
      console.log(err, 'getTopic error')
    }
  },
  //获取框架
  getFramework: async (ctx, next) => {
    try {
      const target1 = await model.min('weights')
      const target2 = await model.max('weights')
      const target = target1 + Math.floor((target2 - target1) / 2)
      const res = await findFramework(target)
      const updateList = res.map((e) => ({ ...e, weights: e.weights + 1, update_time: new Date() }))
      await model.bulkCreate(updateList, { updateOnDuplicate: true })
      ctx.response.state = 200;
      ctx.response.message = 'success';
      ctx.response.type = 'json';
      ctx.response.body = res
    } catch (err) {
      console.log(err, 'getTopic error')
    }
  },
  //添加题目
  addTopic: async (ctx, next) => {
    let query = ctx.request.body;
    try {
      await model.create({
        name: ctx.req.body.name,
        category: ctx.req.body.category,
        content: ctx.req.body.content,
        weights: 1,
        create_time: new Date(),
        update_time: new Date(),
      })
      ctx.response.state = 200;
      ctx.response.status = 200;
      ctx.response.message = 'success';
    } catch (err) {
      console.log(err)
    }
  },
  updateTopic: async (ctx, next) => {
    let query = ctx.request.body;
    console.log(ctx.req.body)
    await model.update({
      title: ctx.req.body.title,
      region: ctx.req.body.region,
      time: ctx.req.body.time,
      desc: ctx.req.body.desc,
    }, {
      where: {
        id: ctx.req.body.id
      }
    }).then(function (res) {
      console.log('done');
      ctx.response.state = 200;
      ctx.response.status = 200;
      ctx.response.message = 'success';
    }).catch((e) => {
      console.log(e)
    })
  },
  deleteTopic: async (ctx, next) => {
    let query = ctx.request.body;
    console.log(ctx.req.body)
    await model.destroy({
      where: {
        id: ctx.req.body.id
      }
    }).then(function (res) {
      console.log('done');
      ctx.response.state = 200;
      ctx.response.status = 200;
      ctx.response.message = 'success';
    }).catch((e) => {
      console.log(e)
    })
  }
};