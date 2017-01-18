var bookshelf = require("../datasourse/db");

var User = bookshelf.Model.extend({
    tableName: "user",
    pet:function(){
        return this.hasMany(Pet);
    }
});

var Pet = bookshelf.Model.extend({
    tableName: "pet",
    user: function() {
        return this.belongsTo(User);
    }
});

var model = {};
model.User = User;
model.Pet = Pet;
module.exports = model;