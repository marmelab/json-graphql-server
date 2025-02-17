import express from 'express';
import jsonGraphqlExpress from '../../dist/json-graphql-server-node.js';
import data from '../data.mjs';

const PORT = 3000;
const app = express();

app.use('/graphql', jsonGraphqlExpress(data));
app.listen(PORT);
