import router from "next/router";
import { title } from "process";
import { FaRegComment } from "react-icons/fa";
interface PostsCardI {
  post: { id: string; title: string; body: string };
  onClick?: () => any;
}

const PostCard = ({ post, onClick = () => {} }: PostsCardI) => {
  return (
    <div
      className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:shadow " //border border-gray-200 p-6 rounded-lg
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="mb-2 text-lg font-medium sm:text-xl title-font">
        {post.title}
      </h2>
      <p className="mb-4 text-base leading-relaxed">{post.body}</p>
    </div>
  );
};

export default PostCard;
