var models = require('../model/model');

exports.userList = function(callback){
    models.User.forge().fetchAll().then(function(user){
        console.log(user.models);
        callback(user);
    });
};

exports.userAdd = function(user,callback){
    models.User.forge({
        user_cn_name: user.name,
        user_age: user.age,
        user_idcard: user.idcard,
        user_img: user.imgName,
    }).save().then(function(user){
        callback(user);
    }).catch(function(err){
        callback(err);
    });
};

exports.userUpdate = function(user,callback){
    models.User.forge().where('id', '=', user.id).save({
        id: user.id,
        user_cn_name: user.name,
        user_age: user.age,
        user_idcard: user.idcard,
        user_img:user.img
    }, {patch: true}).then(function(user) {
        callback(user);
    }).catch(function(err) {
        callback(err);
    });
};

exports.userDel = function(id,callback){
    models.User.forge().where('id', '=', id).destroy().then(function(user)
    {
        callback(user);
    }).catch(function(err) {
        callback(err);
    });
};

exports.getById = function(id,callback){
    models.User.forge({
        id: id
    }).fetch().then(function(user) {
        callback(user);
    }).catch(function(err) {
        callback(err);
    });
};