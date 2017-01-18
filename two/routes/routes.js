var userRouter = require('../controller/usersController');

module.exports = function(app){
    /**
     * get请求
     */
    app.get("/",userRouter.home);
    app.get("/list",userRouter.list);
    app.get("/del:id",userRouter.del);
    app.get("/edit:id",userRouter.edit);

    /**
     * post请求
     */
    app.post("/add", userRouter.add);
    app.post("/update", userRouter.update);

    /**
     * api接口
     */
    app.post("/api/getAll", userRouter.getAll);
    app.post("/api/adduser", userRouter.addUser);
};
