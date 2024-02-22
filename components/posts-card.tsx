interface PostsCardI {
  post: { id: string; title: string; body: string };
  onClick?: () => any;
}

const PostCard = ({ post, onClick = () => {} }: PostsCardI) => {
  return (
    <div
      className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:shadow hover:bg-gray-600 hover:text-white" //border border-gray-200 p-6 rounded-lg
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="mb-2 text-lg font-medium sm:text-xl title-font">{post.title}</h2>
      <p className="mb-4 text-base leading-relaxed">{post.body}</p>
    </div>
  );
};

export default PostCard;
