import express from 'express';
import jsonGraphqlExpress, { getPlainSchema } from 'json-graphql-server/node';
import data from '../data.cjs'

const PORT = 3000;
const app = express();

const plainSchema = getPlainSchema(data);

app.use('/graphql', jsonGraphqlExpress(data));
app.listen(PORT);