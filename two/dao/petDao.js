var models = require('../model/model');

exports.petList = function(callback){
    models.Pet.forge().fetchAll().then(function(pet){
        console.log(pet.models);
        callback(pet);
    });
};

exports.petAdd = function(pet,callback){
    models.User.forge({
        pet_manger: pet.manger,
        pet_name:pet.name
    }).save().then(function(pet){
        callback(pet);
    }).catch(function(err){
        callback(err);
    });
};

exports.petUpdate = function(pet,callback){
    models.Pet.forge().where('id', '=', id).save({
        id: pet.id,
        pet_manger: pet.manger,
        pet_name:pet.name
    }, {patch: true}).then(function(pet) {
        callback(pet);
    }).catch(function(err) {
        callback(err);
    });
};

exports.petDel = function(id,callback){
    models.Pet.forge().where('pet_manger', '=', id).destroy().then(function(pet)
    {
        callback(pet);
    }).catch(function(err) {
        callback(err);
    });
};

exports.getById = function(id,callback){
    models.Pet.forge({
        id: id
    }).fetch().then(function(pet) {
        callback(pet);
    }).catch(function(err) {
        callback(err);
    });
};