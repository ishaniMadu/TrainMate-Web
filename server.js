var express = require('express');
var app = express();
var sql = require('mssql');

app.get('/', function(req, res) {
    res.send('Hello Worlddw!')
})

app.listen(process.env.PORT||80, function() {
    console.log('Example app listening on port 3000!')
})

var config = {

    user: 'kasun@trainmate',
    password: 'Trainmate123',
    server: 'trainmate.database.windows.net',
    database: 'trainmate',
    options: {
        encrypt: true
    }
}

sql.connect(config).then(function() {
    console.log('opening connection');
    new sql.Request().query('Select * from customers').then(function(recordset) {

        console.dir(recordset);
    }).catch(function(error) {

    });
});
