# json-graphql-server

Get a full fake GraphQL API with zero coding in less than 30 seconds.

## Motivation

> I'd love to learn GraphQL, but it seems that I first have to read a book about GraphQL Types and Queries, then install a gazillion npm packages.
> - About every developer

Start playing with GraphQL right away with `json-graphql-server`, a testing and mocking tool for GraphQL. All it takes is a JSON of your data.

## Usage

* CLI

```sh
npm install -g json-graphql-server
json-graphql-server path/to/data.js
```

* Node

```js
import express from 'express';
import { jsonGraphqlExpress } from 'json-graphql-server';

const PORT = 3000;
const app = express();
const data = {
    // ... your data
};
app.use('/graphql', jsonGraphqlExpress(data));
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

<table>
    <tr>
        <th>Query / Mutation</th>
        <th>Result</th>
    </tr>
    <tr>
        <td>
            <pre>
// get a list of entities for a type
{
  allPosts {
    title
    views
  }
}
            </pre>
        </td>
        <td>
            <pre>
{
  "data": {
    "allPosts": [
      { "title": "Lorem Ipsum", views: 254 },
      { "title": "Sic Dolor amet", views: 65 }
    ]
  }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
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
            </pre>
        </td>
        <td>
            <pre>
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
            </pre>
        </td>
    </tr>
</table>

## Adding Authentication, Custom Routes, etc.

`json-graphql-server` doesn't deal with authentication or custom routes. But you can use your favorite middleware with Express:

```js
import express from 'express';
import { jsonGraphqlExpress } from 'json-graphql-server';

import OAuthSecurityMiddleWare from './path/to/OAuthSecurityMiddleWare';

const PORT = 3000;
const app = express();
const data = {
    // ... your data
};
app.use(OAuthSecurityMiddleWare());
app.use('/graphql', jsonGraphqlExpress(data));
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



