var path = require('path');
var fs = require('fs');
var models = require('../bookshelf/model');
var bookshelf = require("../dao/db");
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
    }catch (e){
        fs.unlink(req.files.image.path);  //删除文件
        return res.render("home",{msg:e.message});
    }

    bookshelf.transaction(function(){
        models.User.forge({
            user_cn_name: name,
            user_age: age,
            user_idcard: idcard,
            user_img: imgName,
        }).save().then(function(user){
            models.Pet.forge({
                pet_manger: user.id,
                pet_name:pet
            }).save().then(function(user){
                res.redirect("/list");
            }).catch(function(err){
                res.render("home",{msg:"注册失败"});
            });
        }).catch(function(err){
            console.log(err);
            fs.unlink(req.files.image.path);  //删除文件
            res.render("home",{msg:"注册失败"});
        });
    }).then(function(){

    }).catch(function(err){

    })
};

exports.list = function(req,res){
    models.User.forge().fetchAll().then(function(user){
        console.log(user.models);
        res.render("list",{rows:user.models});
    });
};

exports.del = function(req,res){
	console.log(req.params.id);
    bookshelf.transaction(function(){
        models.User.forge({
            id: req.params.id
        }).fetch().then(function(user) {
            console.log(user);
            var img = user.attributes.user_img;
            fs.unlink("./file/"+img);
            models.User.forge().where('id', '=', req.params.id).destroy().then(function(result)
            {
                models.Pet.forge().where('pet_manger', '=', req.params.id).destroy().then(function(result)
                {
                    res.redirect("/list");
                }).catch(function(err) {
                    console.log(5);
                });
            }).catch(function(err) {
                console.log(4);
            });
        }).catch(function(err) {
            console.log(err);
        });
    }).then(function(users){
        console.log(1);
    }).catch(function(error){
        res.redirect("/list");
        console.log(2);
    });


};

exports.edit = function(req,res){
    models.User.forge({
        id: req.params.id
    }).fetch().then(function(user) {
        console.log(user);
        var img = user.attributes.user_img;
        var name =user.attributes.user_cn_name;
        var age = user.attributes.user_age;
        var idcard = user.attributes.user_idcard;
        var id = user.attributes.id;
        res.render("updata",{ee:img,aa:name,bb:age,cc:idcard,dd:id});
    });
};

exports.update = function(req, res){
	var id = req.fields.id;
    var name = req.fields.username;
    var age = parseInt(req.fields.age);
    var idcard = req.fields.idcard;
    var oldimg = req.fields.oldimg;
    var img = req.files.userimg.path.split("\\")[req.files.userimg.path.split("\\").length-1];
    var newimg = img;
    if(req.files.userimg.name==""){
        img = oldimg;
    }
    models.User.forge({
        id: id
    }).fetch().then(function(user) {
        var imgs = user.attributes.user_img;
        models.User.forge().where('id', '=', id).save(
            {
                id: id,
                user_cn_name: name,
                user_age: age,
                user_idcard: idcard,
                user_img:img
            }, {patch: true}).then(function(reslut) {
            if(req.files.userimg.name!=""){
                fs.unlink("./file/"+imgs);
            }else{
                fs.unlink("./file/"+newimg);
            }
            res.redirect("/list");
        }).catch(function(err) {
            console.log(err);
            fs.unlink(req.files.userimg.path);  //删除文件
        });
    }).catch(function(err){
        console.log(err);
    });

};