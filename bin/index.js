#!/usr/bin/env node
var path = require('path');
var JsonGraphqlServer = require('./../lib/');
var express = require('express');

var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = 3000;
var app = express();

app.use('/', JsonGraphqlServer.jsonGraphqlExpress(data));
app.listen(PORT);
var msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line no-console
