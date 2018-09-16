var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ledbettc',
  password        : '7734',
  database        : 'cs340_ledbettc'
});

module.exports.pool = pool;
