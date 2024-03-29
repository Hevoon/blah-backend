const Koa = require('koa');
const Router = require('./router');
const middleware = require('./src/middleware');
const app = new Koa();

middleware(app);
Router(app);


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});

