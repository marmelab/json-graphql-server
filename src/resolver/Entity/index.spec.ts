import entity from './index';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('provides empty resolver for data without relationship', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(entity('posts', { posts: [] })).toEqual({}));

const data = {
    posts: [
        { id: 1, title: 'Lorem Ipsum', user_id: 123 },
        { id: 2, title: 'Ut enim ad minim', user_id: 456 },
        { id: 3, title: 'Sic Dolor amet', user_id: 123 },
    ],
    users: [
        { id: 123, name: 'John Doe' },
        { id: 456, name: 'Jane Doe' },
    ],
    comments: [
        { id: 987, post_id: 1, body: 'Consectetur adipiscing elit' },
        { id: 995, post_id: 1, body: 'Nam molestie pellentesque dui' },
        { id: 998, post_id: 2, body: 'Sunt in culpa qui officia' },
    ],
};

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('provides many to one relationship reolvers', () => {
    // @ts-expect-error TS(2339): Property 'User' does not exist on type '{}'.
    const { User } = entity('posts', data);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(User(data.posts[0])).toEqual({ id: 123, name: 'John Doe' });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(User(data.posts[1])).toEqual({ id: 456, name: 'Jane Doe' });
    // @ts-expect-error TS(2339): Property 'Post' does not exist on type '{}'.
    const { Post } = entity('comments', data);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Post(data.comments[0])).toEqual({
        id: 1,
        title: 'Lorem Ipsum',
        user_id: 123,
    });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Post(data.comments[1])).toEqual({
        id: 1,
        title: 'Lorem Ipsum',
        user_id: 123,
    });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Post(data.comments[2])).toEqual({
        id: 2,
        title: 'Ut enim ad minim',
        user_id: 456,
    });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('provides one to many relationship reolvers', () => {
    // @ts-expect-error TS(2339): Property 'Comments' does not exist on type '{}'.
    const { Comments } = entity('posts', data);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Comments(data.posts[0])).toEqual([
        { id: 987, post_id: 1, body: 'Consectetur adipiscing elit' },
        { id: 995, post_id: 1, body: 'Nam molestie pellentesque dui' },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Comments(data.posts[1])).toEqual([
        { id: 998, post_id: 2, body: 'Sunt in culpa qui officia' },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Comments(data.posts[2])).toEqual([]);
    // @ts-expect-error TS(2339): Property 'Posts' does not exist on type '{}'.
    const { Posts } = entity('users', data);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Posts(data.users[0])).toEqual([
        { id: 1, title: 'Lorem Ipsum', user_id: 123 },
        { id: 3, title: 'Sic Dolor amet', user_id: 123 },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Posts(data.users[1])).toEqual([
        { id: 2, title: 'Ut enim ad minim', user_id: 456 },
    ]);
});
