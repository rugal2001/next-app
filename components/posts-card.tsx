interface PostsCardI {
  post: { id: string; title: string; body: string };
  onClick?: () => any;
}

const PostCard = ({ post, onClick = () => {} }: PostsCardI) => {
  return (
    <div
      className=""
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="">{post.title}</h2>
      <p className="">{post.body}</p>
    </div>
  );
};

export default PostCard;
