# json-to-graphql-schema

Guess a GraphQL schema from json data.

## Installation

`npm install --save json-to-graphql-schema`

or

`yarn json-to-graphql-schema`

## Usage

```js
import getSchemaFromData from 'json-to-graphql-schema';
import { printSchema } from 'graphql';

const data = {
    posts: [
        { id: 1, title: "Lorem Ipsum", views: 254, user_id: 123 },
        { id: 2, title: "Sic Dolor amet", views: 65, user_id: 456 },
    ],
    users: [
        { id: 123, name: "John Doe" },
        { id: 456, name: "Jane Doe" }
    ],
    comments: [
        { id: 987, post_id: 1, body: "Consectetur adipiscing elit", date: new Date('2017-07-03') },
        { id: 995, post_id: 1, body: "Nam molestie pellentesque dui", date: new Date('2017-08-17') }
    ]
}

// Get the schema as a JSON object
const schema = getSchemaFromData(data);

// Print the GQL for this schema
console.log(printSchema(schema));
```

## Generated Types and Queries

Based on your data, `json-to-graphql-schema` will generate a schema with one type per entity, as well as 3 query types and 3 mutation types. For instance for the `Post` entity:

```graphql
type Query {
    Post(id: ID!): Post
    allPosts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter): [Post]
    _allPostsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter): ListMetadata
}
type Mutation {
    createPost(data: String): Post
    updatePost(data: String): Post
    removePost(id: ID!): Boolean
}
type Post {
    id: ID!
    title: String!
    views: Int!
    user_id: ID!
    User: User
    Comments: [Comment]
}
type PostFilter {
    q: String
    id: ID
    title: String
    views: Int
    views_lt: Int
    views_lte: Int
    views_gt: Int
    views_gte: Int
    user_id: ID
}
type ListMetadata {
    count: Int!
}
scalar Date
```

By convention, `json-to-graphql-schema` expects all entities to have an `id` field that is unique for their type - it's the entity primary key. The type of every field is inferred from the values, so for instance, `Post.title` is a `String!`, and `Post.views` is an `Int!`. When all entities have a value for a field, `json-to-graphql-schema` makes the field type non nullable (that's why `Post.views` type is `Int!` and not `Int`).

For every field named `*_id`, `json-to-graphql-schema` creates a two-way relationship, to let you fetch related entities from both sides. For instance, the presence of the `user_id` field in the `posts` entity leads to the ability to fetch the related `User` for a `Post` - and the related `Posts` for a `User`.

The `all*` queries accept parameters to let you sort, paginate, and filter the list of results. You can filter by any field, not just the primary key. For instance, you can get the posts written by user `123`. `json-to-graphql-schema` also adds a full-text query field named `q`, and created range filter fields for numeric and date fields. The detail of all available filters can be seen in the generated `*Filter` type.

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
// get a single entity, by id
{
    Post(id: 1) {
        id
        title
        views
        user_id
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
            "user_id": 123
        }
    }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
// include many-to-one relationships
{
    Post(id: 1) {
        title
        User {
            name
        }
    }
}
            </pre>
        </td>
        <td>
            <pre>
{
    "data": {
        "Post": {
            "title": "Lorem Ipsum",
            "User": {
                "name": "John Doe"
            }
        }
    }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
// include one-to-many relationships
{
    Post(id: 1) {
        title
        Comments {
            body
        }
    }
}
            </pre>
        </td>
        <td>
            <pre>
{
    "data": {
        "Post": {
            "title": "Lorem Ipsum",
            "Comments": [
                { "body": "Consectetur adipiscing elit" },
                { "body": "Nam molestie pellentesque dui" },
            ]
        }
    }
}
            </pre>
        </td>
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
// paginate the results
{
    allPosts(page: 0, perPage: 1) {
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
        ]
    }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
// sort the results by field
{
    allPosts(sortField: "title", sortOrder: "desc") {
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
            { "title": "Sic Dolor amet", views: 65 }
            { "title": "Lorem Ipsum", views: 254 },
        ]
    }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
// filter the results using the full-text filter
{
    allPosts({ filter: { q: "lorem" }}) {
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
        ]
    }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
// filter the result using any of the entity fields
{
    allPosts(views: 254) {
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
        ]
    }
}
            </pre>
        </td>
    </tr>
    <tr>
        <td>
            <pre>
// number fields get range filters
// -lt, _lte, -gt, and _gte
{
    allPosts(views_gte: 200) {
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
        ]
  }
}
            </pre>
        </td>
    </tr>
</table>

## Roadmap

- Allow to override the primary key for each entity
- Allow to override the relationship detection

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

json-to-graphql-schema is licensed under the [MIT Licence](https://github.com/marmelab/json-to-graphql-schema/blob/master/LICENSE.md), sponsored and supported by [marmelab](http://marmelab.com).
