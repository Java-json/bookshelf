var path = require('path');
var fs = require('fs');
var userDao = require('../dao/usersDao');
var petDao = require('../dao/petDao');
var bookshelf = require("../datasourse/db");

/* GET home page. */
exports.home = function(req,res,next){
	res.render("home",{msg:""});
};

exports.add = function(req, res, next){
	var name = req.fields.username;
    var age = parseInt(req.fields.age);
    var idcard = req.fields.idcard;
    var pet = req.fields.pet;
    var imgName = req.files.image.path.split("\\")[req.files.image.path.split("\\").length-1];
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
        var user = {"name":name,"age":age,"idcard":idcard,"imgName":imgName};
        userDao.userAdd(user,function(reslut){
            var pet = {"manger":reslut.attributes.id,"name":pet};
            petDao.petAdd(pet,function(resl){
                console.log(resl);
                res.redirect("/list");
            });
        });
    }catch (e){
        fs.unlink(req.files.image.path);  //删除文件
        return res.render("home",{msg:e.message});
    }
};

exports.list = function(req,res){
    userDao.userList(function(user){
        res.render("list",{rows:user.models});
    });
};

exports.del = function(req,res){
	var id = req.params.id;
    userDao.getById(id,function(user){
        var img = user.attributes.user_img;
        fs.unlink("./file/"+img);
        userDao.userDel(id,function(){
            petDao.petDel(id,function(){
                res.redirect("/list");
            })
        })
    })
};

exports.edit = function(req,res){
    var id = req.params.id;
    userDao.getById(id,function(user){
        var img = user.attributes.user_img;
        var name =user.attributes.user_cn_name;
        var age = user.attributes.user_age;
        var idcard = user.attributes.user_idcard;
        var id = user.attributes.id;
        res.render("updata",{ee:img,aa:name,bb:age,cc:idcard,dd:id});
    })
};

exports.update = function(req, res){
	var id = req.fields.id;
    var name = req.fields.username;
    var age = parseInt(req.fields.age);
    var idcard = req.fields.idcard;
    var oldimg = req.fields.oldimg;
    var img = req.files.userimg.path.split("\\")[req.files.userimg.path.split("\\").length-1];
    var newimg = img;
    var users = {"id":id,"name":name,"age":age,"idcard":idcard,"img":img};
    if(req.files.userimg.name==""){
        img = oldimg;
    }
    userDao.getById(id,function(user){
        userDao.userUpdate(users,function(resl){
            if(req.files.userimg.name!=""){
                var imgs = user.attributes.user_img;
                fs.unlink("./file/"+imgs);
            }else{
                fs.unlink("./file/"+newimg);
            }
            res.redirect("/list");
        })
    })
};

exports.getAll = function(req,res){
    userDao.userList(function(user){
        res.json(user);
    })
};


exports.addUser = function(req, res, next){
    var name = req.fields.username;
    var age = parseInt(req.fields.age);
    var idcard = req.fields.idcard;
    var user = {"name":name,"age":age,"idcard":idcard};
    userDao.userAdd(user,function(re){
        userDao.userList(function(resl){
            res.json({msg:resl});
        })
    })
};