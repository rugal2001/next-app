interface PostsCardI {
  post: { id: string; title: string; body: string };
  onClick?: () => any;
}

const PostCard = ({ post, onClick = () => {} }: PostsCardI) => {
  return (
    <div
      className="p-6 border border-2 border-gray-200 rounded-lg" //border border-gray-200 p-6 rounded-lg
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="mb-2 text-lg font-medium text-gray-900 sm:text-xl title-font">{post.title}</h2>
      <p className="mb-4 text-base leading-relaxed">{post.body}</p>
    </div>
  );
};

export default PostCard;
