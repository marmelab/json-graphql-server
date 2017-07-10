# json-graphql-server

Get a full fake GraphQL API with zero coding in less than 30 seconds. Works on the browser and on the server.

## Motivation

> I'd love to learn GraphQL, but it seems that I first have to read a book about GraphQL Types and Queries, then install a gazillion npm packages.
> - About every developer

Start playing with GraphQL right away with `json-graphql-server`, a testing and mocking tool for GraphQL. All it takes is a JSON of your data.

## Usage

* In the browser

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/json-graphql-server/1.0.0/json-graphql-server.min.js"></script>
<script>
var data = {
    // ... your data
};
GraphQLClientServer(data); // starts a GraphQL Server in your browser
// now every call to http://localhost:3000/graphql will be intercepted
// and served with your data in GraphQL
</script>
```

* CLI

```sh
npm install -g json-graphql-server
json-graphql-server path/to/data.js
```

* Node

```js
import express from 'express';
import { GraphQlServer } from 'json-graphql-server';

const PORT = 3000;
const app = express();
const data = {
    // ... your data
};
app.use('/graphql', GraphQLServer(data));
app.listen(PORT);
```

## Example Data File

Your data file should be an object where the keys are the entity types. The values should be lists of entities, i.e. arrays of value objects with at lead an `id` key. For instance:

```json
{
    "posts": [
        {
            "id": 1,
            "title": "Lorem Ipsum",
            "views": 254,
            "user_id": 123,
            "tag_id": "foo"
        },
        {
            "id": 2,
            "title": "Sic Dolor amet",
            "views": 65,
            "user_id": 456,
            "tag_id": "bar"
        },
    ],
    "users": [
        {
            "id": 123,
            "name": "John Doe"
        },
        {
            "id": 456,
            "name": "Jane Doe"
        }
    ],
    "tags": [
        {
            "id": "foo",
            "name": "Foo"
        },
        {
            "id": "bar",
            "name": "Bar"
        }
    ]
}
```

## Generated Types and Queries

Based on your data, json-graphql-server will generate a schema with one type per entity, as well as 3 query types and 3 mutation types. For instance for the `Post` entity:

```graphql
type Post {
    id: ID!
    title: String!
    views: Int
    user_id: ID
    tag_id: ID
}
type Query {
  Post(id: ID!): Post
  allPosts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): [Customer]
  _allPostsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): ListMetadata
}
type Mutation {
  createPost(data: String): Post
  updatePost(data: String): Post
  removePost(id: ID!): Boolean
}
type ListMetadata {
    count: Int!
}
```

## GraphQL Usage

Here is how you can use the queries and mutations generated for your data, using `Post` as an example:

```graphql
// get a list of entities for a type
{
  allPosts {
    title
    views
  }
}
// produces
{
  "data": {
    "allPosts": [
      { "title": "Lorem Ipsum", views: 254 },
      { "title": "Sic Dolor amet", views: 65 }
    ]
  }
}

// get a single entity, by id
{
  Post(id: 1) {
    id
    title
    views
    user_id
    tag_id
  }
}
// produces
{
  "data": {
    "Post": {
        "id": 1,
        "title": "Lorem Ipsum",
        "views": 254,
        "user_id": 123,
        "tag_id": "foo"
    } 
  }
}
```

## Options

You can access the json-graphql-server from anywhere - CORS are configures to accept all inbound requests. Also, content is compressed using GZip.

### Browser Options

You can override the GraphQL endpoint and port using the second parameter:

```js
<script>
var data = {
    // ... your data
};
GraphQLClientServer(data, 'http://localhost:8080/graphql');
// now every call to http://localhost:8080/graphql will be intercepted
// and served with your data in GraphQL
</script>

### CLI Options

You can override the GraphQL server port using the `--port` (or `-p`) option:

```sh
json-graphql-server --port 8080 path/to/data.js
```

You can force a server restart every time the source JSON file changes using the `--watch` option:

```sh
json-graphql-server --watch path/to/data.js
```

You can start a https server instead of an http one using the `--https` (or `-s`) option:

```sh
json-graphql-server --https path/to/data.js
```

You can add a random delay to responses by specifying a maximum delay (in ms) using the `--delay` (or `-d`) option:

```sh
json-graphql-server --delay 1000 path/to/data.js
```

## Adding Authentication, Custom Routes, etc.

`json-graphql-server` doesn't deal with authentication or custom routes. But you can use your favorite middleware with Express:

```js
import express from 'express';
import { GraphQlServer } from 'json-graphql-server';

import OAuthSecurityMiddleWare from './path/to/OAuthSecurityMiddleWare';

const PORT = 3000;
const app = express();
const data = {
    // ... your data
};
app.use(OAuthSecurityMiddleWare());
app.use('/graphql', GraphQLServer(data));
app.listen(PORT);
```

## Deployment

Deploy with Heroku or Next.js.

## Contributing

Use Prettier formatting and make sure you include unit tests. The project includes a `Makefile` to automate usual developer tasks:

```sh
make install
make build
make test
make watch
make format
```

## License

Admin-on-rest is licensed under the [MIT Licence](https://github.com/marmelab/json-graphql-server/blob/master/LICENSE.md), sponsored and supported by [marmelab](http://marmelab.com).



