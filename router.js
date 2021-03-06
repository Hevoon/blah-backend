const Router = require('koa-router');
const homeController = require('./src/controller/Info');
const multiparty = require('koa2-multiparty');
const router = Router();
module.exports = (app) => {
    router.get('/getTopic', homeController.getTopic);
    router.get('/getAll', homeController.getAllTopic);
    router.get('/getFramework', homeController.getFramework);
    // router.get('/getall', homeController.getall);
    router.post('/addTopic', multiparty(), homeController.addTopic);
    // router.post('/login', homeController.login);
    router.post('/update', multiparty(), homeController.updateTopic);
    // router.post('/sign', homeController.sign);
    router.post('/delete', multiparty(), homeController.deleteTopic);
    // // router.post('/deleteRegion', multiparty(), homeController.deleteRegion);
    // router.get('/region', homeController.getRegion);
    // router.post('/create_region', multiparty(), homeController.createRegion);
    app.use(router.routes()).use(router.allowedMethods());
};