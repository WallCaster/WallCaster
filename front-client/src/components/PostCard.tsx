import type { Post } from '../types/post';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <h2>{post.author}</h2>
      <p>{post.text}</p>
    </div>
  );
};
