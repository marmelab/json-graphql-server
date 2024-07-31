import entity from './index';

test('provides empty resolver for data without relationship', () =>
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

test('provides many to one relationship reolvers', () => {
    const { User } = entity('posts', data);
    expect(User(data.posts[0])).toEqual({ id: 123, name: 'John Doe' });
    expect(User(data.posts[1])).toEqual({ id: 456, name: 'Jane Doe' });
    const { Post } = entity('comments', data);
    expect(Post(data.comments[0])).toEqual({
        id: 1,
        title: 'Lorem Ipsum',
        user_id: 123,
    });
    expect(Post(data.comments[1])).toEqual({
        id: 1,
        title: 'Lorem Ipsum',
        user_id: 123,
    });
    expect(Post(data.comments[2])).toEqual({
        id: 2,
        title: 'Ut enim ad minim',
        user_id: 456,
    });
});

test('provides one to many relationship reolvers', () => {
    const { Comments } = entity('posts', data);
    expect(Comments(data.posts[0])).toEqual([
        { id: 987, post_id: 1, body: 'Consectetur adipiscing elit' },
        { id: 995, post_id: 1, body: 'Nam molestie pellentesque dui' },
    ]);
    expect(Comments(data.posts[1])).toEqual([
        { id: 998, post_id: 2, body: 'Sunt in culpa qui officia' },
    ]);
    expect(Comments(data.posts[2])).toEqual([]);
    const { Posts } = entity('users', data);
    expect(Posts(data.users[0])).toEqual([
        { id: 1, title: 'Lorem Ipsum', user_id: 123 },
        { id: 3, title: 'Sic Dolor amet', user_id: 123 },
    ]);
    expect(Posts(data.users[1])).toEqual([
        { id: 2, title: 'Ut enim ad minim', user_id: 456 },
    ]);
});
