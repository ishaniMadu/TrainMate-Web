var express = require('express');
var app = express();
var sql = require('mssql');

var config = {

    user: 'kasun@trainmate',
    password: 'Trainmate123',
    server: 'trainmate.database.windows.net',
    database: 'trainmate',
    options: {
        encrypt: true
    }
}

app.get('/', function(req, res) {
    res.send('Hello Worlddw!')

    sql.connect(config).then(function() {
        console.log('opening connection');
        new sql.Request().query('Select * from customers').then(function(recordset) {

            res.send('Hello Worlddw!')
        }).catch(function(error) {

        });
    });

})

app.listen(process.env.PORT||80, function() {
    console.log('Example app listening on port 3000!')
})



app.use(express.bodyParser());

app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});
