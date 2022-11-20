#!/usr/bin/env node
require('reify');
var path = require('path');
var express = require('express');
var cors = require('cors');
var JsonGraphqlServer = require('../lib/json-graphql-server.node.min').default;
var fs = require('fs');

var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = process.env.NODE_PORT || 3000;
var HOST = process.env.NODE_HOST || 'localhost';
var PERSISTENT = process.env.NODE_PERSISTENT || false;

var app = express();

process.argv.forEach((arg, index) => {
	console.log("arg", arg);
	console.log("argv",process.argv[index + 1]);
	console.log("index",index);
    // allow a custom port via CLI
    if (arg === '--p' && process.argv.length > index + 1) {
        PORT = process.argv[index + 1];
    }

    if (arg === '--h' && process.argv.length > index + 1) {
        HOST = process.argv[index + 1];
    }

    if (arg === '--persistent') {
        PERSISTENT = true;
    }

});
app.use(function(req, res, next) {
	console.log("before", data);
    	res.on("finish", function() {
	    console.log("after", data);
    	    if (PERSISTENT == true){
		var json = JSON.stringify(data);
	        console.log("content file will be :", json);
		fs.writeFile(dataFilePath, json, 'utf8',
			function(err) {
	    			if (err) {
        				console.error(err);
        				return;
    				};
    				console.log("File has been updated");
    			}
		);
	    }
    	});
    next();
  });
  
app.use(cors());
app.use('/', JsonGraphqlServer(data));
app.listen(PORT, HOST);
if (PERSISTENT==true){
	console.log("Your data will be saved in $dataFilePath")
}
var msg = `GraphQL server running with your data at http://${HOST}:${PORT}/`;
console.log(msg); // eslint-disable-line no-console

process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

