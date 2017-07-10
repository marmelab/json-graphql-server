#!/usr/bin/env node
import { join } from 'path';
import jsonGraphqlExpress from '../jsonGraphqlExpress';
import express from 'express';

const dataFilePath = process.argv.length > 2 ? process.argv[2] : './data.json';
const data = require(join(process.cwd(), dataFilePath));
const PORT = 3000;
var app = express();

app.use('/', jsonGraphqlExpress(data));
app.listen(PORT);
const msg = `GraphQL server running with your data at http://localhost:${PORT}/`;
console.log(msg); // eslint-disable-line no-console
