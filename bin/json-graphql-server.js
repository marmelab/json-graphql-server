#!/usr/bin/env node
require('reify');
const path = require('path');
const express = require('express');
const cors = require('cors');
const JsonGraphqlServer = require('../lib/json-graphql-server.node.min').default;

const dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
const data = require(path.join(process.cwd(), dataFilePath));
const PORT = 3000;
const app = express();

app.use(cors());
app.use('/', JsonGraphqlServer(data));
app.listen(PORT);
const msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line no-console

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
