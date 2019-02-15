#!/usr/bin/env node
require('reify');
var path = require('path');
var express = require('express');
var cors = require('cors');
var JsonGraphqlServer = require('../lib/json-graphql-server.node.min').default;

var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
var data = require(path.join(process.cwd(), dataFilePath));
var PORT = process.env.NODE_PORT || 3000;
var app = express();
var options = {};

process.argv.forEach((arg, index) => {
    // allow a custom port via CLI
    if (arg === '--p' && process.argv.length > index + 1) {
        PORT = process.argv[index + 1];
    }
    // Allow declaring the API as readonly
    if (arg === '--readonly') {
        options.readonly = true;
    }
});

app.use(cors());
app.use('/', JsonGraphqlServer(data, options));
app.listen(PORT);
var msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line no-console

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
