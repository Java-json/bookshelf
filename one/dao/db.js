var mysql = require("mysql");
var connection = mysql.createConnection({
	host:'192.168.2.135',
	user:'root',
	password:'rtqw998358',
	database:'p_mtc'
});

exports.getConnection = connection;