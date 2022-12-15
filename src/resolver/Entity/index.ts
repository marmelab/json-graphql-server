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
 *              { id: 1, title: 'Hello, world', user_id: 123 }
 *         ],
 *         users: [
 *              { id: 123, name: 'John Doe' }
 *         ]
 *         comments: [
 *              { id: 4646, post_id: 1, body: 'Nice post!' }
 *         ]
 *     }
 *
 * There are two relationship fields here, posts.user_id and comments.post_id.
 * The generated GraphQL schema for posts is:
 *
 *     type Post {
 *         id: ID!
 *         title: String
 *         user_id: ID
 *         User: User
 *         Comments: [Comment]
 *     }
 *
 * When called for the posts entity, this method generates resolvers
 * for Post.User and Post.Comments
 *
 * @param {String} entityName The entity key in the data map, e.g. "posts"
 * @param {Object} data The entire data map, e.g. { posts: [], users: [] }
 *
 * @return {Object} resolvers, e.g.
 *
 *     {
 *         Post: {
 *             User: (post) => users.find(user => user.id == post.user_id),
 *             Comments: (post) => comments.filter(comment => comment.post_id = post.id),
 *         },
 *     }
 */
export default (entityName: string, data: any) => {
    const entityFields = Object.keys(getFieldsFromEntities(data[entityName]));
    const manyToOneResolvers = entityFields.filter(isRelationshipField).reduce(
        (resolvers, fieldName) =>
            Object.assign({}, resolvers, {
                [getRelatedType(fieldName)]: (entity: any) =>
                    data[getRelatedKey(fieldName)].find(
                        (relatedRecord: any) =>
                            relatedRecord.id == entity[fieldName]
                    ),
            }),
        {}
    );
    const relatedField = getReverseRelatedField(entityName); // 'posts' => 'post_id'

    const hasReverseRelationship = (entityName: any) =>
        Object.keys(getFieldsFromEntities(data[entityName])).includes(
            relatedField
        );

    const entities = Object.keys(data);
    const oneToManyResolvers = entities.filter(hasReverseRelationship).reduce(
        (resolvers, entityName) =>
            Object.assign({}, resolvers, {
                [getRelationshipFromKey(entityName)]: (entity: any) =>
                    data[entityName].filter(
                        (record: any) => record[relatedField] == entity.id
                    ),
            }),
        {}
    );

    return Object.assign({}, manyToOneResolvers, oneToManyResolvers);
};
