var sqlDao = require("../dao/sql");
var path = require('path');
var fs = require('fs');

/* GET home page. */
exports.home = function(req,res,next){
	res.render("home",{msg:""});
};

exports.add = function(req, res, next){
	var name = req.fields.username;
    var age = parseInt(req.fields.age);
    var idcard = req.fields.idcard;
    var imgName = req.files.image.path.split("\\")[3];
    try{
        var reg = /^[\u4E00-\u9FA5]+$/;
        if(!reg.test(name)){
            throw new Error('姓名应该为中文');
        }
        if(age<0||age>150){
            throw new Error('年龄不合法');
        }
        if(reg.test(idcard)){
            throw new Error('证件号码不能为中文');
        }
        if(req.files.image.name==""){
            throw new Error('请上传头像');
        }
    }catch (e){
        fs.unlink(req.files.image.path);  //删除文件
        return res.render("home",{msg:e.message});
    }
	sqlDao.getDao.add(name, age,idcard,imgName,function(row){
		console.log(row);
        if(row&&row.affectedRows>0){
            res.redirect("/list");
        }else{
            fs.unlink(req.files.image.path);  //删除文件
            res.render("home",{msg:"注册失败"});
        }
	});
};

exports.list = function(req,res){
    sqlDao.getDao.queryAll(function(result){
		if(result){
		    console.log(result);
            res.render("list",{rows:result});
		}
	});
};

exports.del = function(req,res){
	console.log(req.params.id);
    sqlDao.getDao.queryById(req.params.id,function(row){
        var img = row[0].user_img;
        sqlDao.getDao.delete(req.params.id,function(row){
            console.log(row.affectedRows);
            if(row.affectedRows>0){
                fs.unlink("./file/"+img);
            }
            sqlDao.getDao.queryAll(function(result){
                console.log(result);
                res.render("list",{rows:result});
            });
        });
    });
};

exports.edit = function(req,res){
    console.log(req.params.id);
    sqlDao.getDao.queryById(req.params.id,function(row){
        console.log(row);
        var img = row[0].user_img;
        var name = row[0].user_cn_name;
        var age = row[0].user_age;
        var idcard = row[0].user_idcard;
        var id = row[0].id;
        res.render("updata",{ee:img,aa:name,bb:age,cc:idcard,dd:id});
    });
};

exports.update = function(req, res){
	var id = req.fields.id;
    var name = req.fields.username;
    var age = parseInt(req.fields.age);
    var idcard = req.fields.idcard;
    var img = req.files.userimg.path.split("\\")[3];
    sqlDao.getDao.queryById(id,function(row){
        var imgs = row[0].user_img;
        sqlDao.getDao.update(id,img,name, age,idcard,function(row){
            console.log(row);
            if(row&&row.affectedRows>0){
                fs.unlink("./file/"+imgs);
                res.redirect("/list");
            }else{
                fs.unlink(req.files.userimg.path);  //删除文件
            }
        });
    });
};