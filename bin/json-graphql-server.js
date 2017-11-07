#!/usr/bin/env node

const path = require('path');
const express = require('express');
const cors = require('cors');
const JsonGraphqlServer = require('../src/');

// fixme the build fails without those
global.window = false;
global.document = false;
global.navigator = false;

var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = 3000;
var app = express();

app.use(cors());
app.use('/', JsonGraphqlServer.jsonGraphqlExpress(data));
app.listen(PORT);
var msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line no-console
