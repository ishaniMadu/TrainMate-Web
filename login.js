var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./database').db_connection;
var sql = require('mssql');

var app = express();

var request = new sql.Request(connection);

request.query('select * from customers', function(err, rs) {
    rs.forEach(function(row) {
        console.log("ff");
    });
});
