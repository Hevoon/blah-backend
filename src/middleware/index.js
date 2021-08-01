const path = require('path');
const statics = require('koa-static');
const bodyPar = require('koa-bodyparser');
const myDone = require('./myDone');
// const miSend = require('./miSend');
const history = require('koa2-history-api-fallback');
const cors = require('koa2-cors');

module.exports = (app) => {
    app.use(myDone());
    app.use(history({
        //选定url为index，而非/index
        index: '/',
        // rewrites: [
        //     {from: /\/$/, to: '/'},
        //     {from: /token$/, to: '/token'}
        // ]
    }));
    app.use(statics('.'));
    //跨域设置
    app.use(cors({
        origin: function (ctx) {
            return "*"; // 允许来自所有域名请求
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))
    app.use(bodyPar());
    // app.use(miSend());
};
