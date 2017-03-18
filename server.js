var express = require('express');
var app = express();
var sql = require('mssql');

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:80');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/server.js', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   res.send('Hello one!')
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
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
        console.dir(recordsent);
    }).catch(function(error) {

    });
});
