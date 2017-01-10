var connection = require("./db");

var sql = {
	insert:'INSERT INTO user(id,user_img,user_cn_name, user_age, user_idcard) VALUES(0,?,?,?,?)',
	update:'update user set user_img=?, user_cn_name=?, user_age=?,user_idcard=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};

exports.getDao = {
	add: function (username, age,idcard,imgName,callback) {
        connection.getConnection.query(sql.insert,[imgName,username,age,idcard],function(err,reslut){
            callback(reslut);
        });
	} ,
	delete: function (id, callback) {
        connection.getConnection.query(sql.delete,id,function(err, row){
        	console.log(row.affectedRows);
            callback(row);
		});
	},
	update: function (id,img,name, age,idcard, callback) {
        connection.getConnection.query(sql.update, [img,name, age,idcard,id], function(err, result) {
            callback(result);
		});
	},
	queryById: function (id, callback) {
        connection.getConnection.query(sql.queryById, id, function(err, result) {
            callback(result);
		});
	},
	queryAll: function (callback) {
        connection.getConnection.query(sql.queryAll, function(err, result) {
            callback(result);
		});
	}
};