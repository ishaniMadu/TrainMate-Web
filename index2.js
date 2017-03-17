var fs = require('fs'),
http = require('http');


	var httpServer = http.createServer(onRequest).listen(process.env.PORT ||80, function(){
		console.log("Listening at: http://localhost:80");
		console.log("Server is up");
	});

