import getFieldsFromEntities from '../../introspection/getFieldsFromEntities';
import {
    getRelatedKey,
    getRelatedType,
    getRelationshipFromKey,
    getReverseRelatedField,
} from '../../nameConverter';
import { isRelationshipField } from '../../relationships';

/**
 * Add resolvers for relationship fields
 * 
 * @example
 * Consider this data:
 * 
 *     {
 *         posts: [
 *              { id: 1, title: 'foo', user_id: 123 }
 *         ],
 *         users: [
 *              { id: 123, name: 'John Doe' }
 *         ]
 *     }
 * 
 * There is one relationship field here, posts.user_id.
 * The generated GraphQL schema is:
 * 
 *     type Post {
 *         id: ID!
 *         title: String
 *         user_id: ID
 *         User: User
 *     }
 *     type User {
 *         id: ID!
 *         name: String
 *         Posts: [Post]
 *     }
 * 
 * This method generates resolvers for Post.User and User.Posts
 * 
 * @param {String} key The entity key in the data map, e.g. "posts"
 * @param {Object} data The entire data map, e.g. { posts: [], users: [] }
 * 
 * @return {Object} resolvers, e.g. 
 * 
 *     {
 *         Post: {
 *             User: (post) => users.find(user => user.id == post.user_id)
 *         },
 *     }
 * 
 * when called with the "posts" key, and
 * 
 *     {
 *         User: {
 *             Posts: (user) => posts.filter(post => post.user_id == user.id)
 *         }
 *     }
 * 
 * when called with the "users" key
 */
export default (key, data) => {
    const manyToOneResolvers = Object.keys(getFieldsFromEntities(data[key]))
        .filter(isRelationshipField)
        .reduce(
            (resolvers, fieldName) => ({
                ...resolvers,
                [getRelatedType(fieldName)]: entity =>
                    data[getRelatedKey(fieldName)].find(
                        relatedRecord => relatedRecord.id == entity[fieldName],
                    ),
            }),
            {},
        );
    const relatedField = getReverseRelatedField(key); // 'posts' => 'post_id'
    const hasReverseRelationship = entityName =>
        getFieldsFromEntities(data[entityName]).hasOwnProperty(relatedField);
    const oneToManyResolvers = Object.keys(data)
        .filter(hasReverseRelationship)
        .reduce(
            (resolvers, entityName) => ({
                ...resolvers,
                [getRelationshipFromKey(entityName)]: entity =>
                    data[entityName].filter(
                        record => record[relatedField] == entity.id,
                    ),
            }),
            {},
        );

    return {
        ...manyToOneResolvers,
        ...oneToManyResolvers,
    };
};
