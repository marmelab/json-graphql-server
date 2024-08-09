#!/usr/bin/env node
require('reify');
var path = require('path');
var express = require('express');
var cors = require('cors');
var JsonGraphqlServer = require('../dist/json-graphql-server-node.cjs').default;
var dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
var data = require(path.resolve(process.cwd(), dataFilePath));
var PORT = process.env.NODE_PORT || 3000;
var HOST = process.env.NODE_HOST || 'localhost';
var app = express();

process.argv.forEach((arg, index) => {
    // allow a custom port via CLI
    if ((arg === '-p' || arg === '--port') && process.argv.length > index + 1) {
        PORT = process.argv[index + 1];
    }

    if ((arg === '-h' || arg === '--host') && process.argv.length > index + 1) {
        HOST = process.argv[index + 1];
    }
});

app.use(cors());
app.use('/', JsonGraphqlServer(data));
app.listen(PORT, HOST);
var msg = `GraphQL server running with your data at http://${HOST}:${PORT}/`;
console.log(msg); // eslint-disable-line no-console

process.on('unhandledRejection', (reason, p) => {
    // eslint-disable-next-line no-console
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
