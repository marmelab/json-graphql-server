#!/usr/bin/env node
require('reify');
var path = require('path');
var express = require('express');
var cors = require('cors');
var JsonGraphqlServer = require('../lib/json-graphql-server.node.min').default;
var fs = require('fs');
var path = require('path');
 
var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = process.env.NODE_PORT || 3000;
var HOST = process.env.NODE_HOST || 'localhost';
var PERSISTENT = process.env.NODE_PERSISTENT || false;
var PERSITENT_DIR = process.env.NODE_PERSITENT_DIR || ".";
var KEEP_CHANGE_HISTORY = process.env.NODE_KEEP_CHANGE_HISTORY || false;
var VERBOSE = process.env.NODE_VERBOSE || false;

var app = express();

process.argv.forEach((arg, index) => {
    // allow a custom port via CLI
    if (arg === '--p' && process.argv.length > index + 1) {
        PORT = process.argv[index + 1];
    }

    if (arg === '--h' && process.argv.length > index + 1) {
        HOST = process.argv[index + 1];
    }
	if (arg === '--persistent-dir' && process.argv.length > index + 1) {
        PERSITENT_DIR = process.argv[index + 1];
    }
    if (arg === '--persistent') {
        PERSISTENT = true;
    }
	if (arg === '--keep-change-history') {
        KEEP_CHANGE_HISTORY = true;
    }
	if (arg === '--verbose') {
        VERBOSE = true;
    }

});
app.use(function(req, res, next) {
	if (VERBOSE == true){
		console.log("before", data);
	}
	fs.readdir(".", (err, files) => {
		files.forEach(file => {
		  console.log(file);
		});
	  });
    res.on("finish", function() {
		if (VERBOSE == true){
			console.log("after", data);
		}    	    
		if (PERSISTENT == true){
			var json = JSON.stringify(data);
			if (VERBOSE == true){
	        	console.log("File content will be :", json);
			}
			
			if(KEEP_CHANGE_HISTORY == true){
				var destFile = dataFilePath.replace(/^.*[\\\/]/, '')
				var timestamp = Date.now()
				var destFilename = destFile.concat("-",timestamp)
				var backupDirFilename = path.join(PERSITENT_DIR, destFilename);
				console.log(backupDirFilename)
				fs.copyFile(dataFilePath, backupDirFilename, (err) => {
					if (err) {
        				console.error(err);
        				return;
    				};
					console.log('File was copied to ' + backupDirFilename );

				});
			}
			
			fs.writeFile(dataFilePath, json, 'utf8',
				function(err) {
	    			if (err) {
        				console.error(err);
        				return;
    				};
    				console.log("File " + dataFilePath + " has been updated");
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
	console.log("Your data will be saved in " + dataFilePath)
}
if (KEEP_CHANGE_HISTORY==true){
	console.log("Your data changes will be saved in " + PERSITENT_DIR)
}
var msg = `GraphQL server running with your data at http://${HOST}:${PORT}/`;
console.log(msg); // eslint-disable-line no-console

process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

