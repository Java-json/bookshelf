var express = require("express");
var morgan = require("morgan");
var path = require('path');
var ejs = require('ejs'); 
var bodyParser = require("body-parser");
var partials = require('express-partials');

var router =  require("./routes/route");

var app = express();

app.engine('ejs', ejs.__express); //设置ejs引擎
app.set('view engine', 'ejs'); //指定模板文件的后缀名为ejs
app.set('views', path.join(__dirname, './views'));//放置视图引擎的文件夹
app.locals._layoutFile = 'layout.ejs';   //设置母版

app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.static("./file"));
app.use(morgan());

app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'file'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

/**
 * get请求
 */
app.get("/",router.home);
app.get("/list",router.list);
app.get("/del:id",router.del);
app.get("/edit:id",router.edit);

/**
* post请求
*/
app.post("/add", router.add);
app.post("/update", router.update);


/**
 * 监听端口
 */
app.listen(8888,function(){
	console.log("run....");
});

module.exports = app;