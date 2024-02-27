import router from "next/router";
import { title } from "process";
import { FaRegComment } from "react-icons/fa";
import { AppShell, Burger, Avatar } from "@mantine/core";
interface PostsCardI {
  post: { id: string; title: string; body: string };
  onClick?: () => any;
}

const PostNewCard = ({ post, onClick = () => {} }: PostsCardI) => {
  return (
    <div
      className="p-1 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow "
      onClick={() => {
        onClick();
      }}
    >
      <div className="p-3 bg-white rounded-t-lg ">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <Avatar src="../image/9440461.jpg" alt="it's me" />
          Avatar name
        </div>
      </div>
      <div className="w-auto p-1 bg-gray-200 rounded-md lg:flex">
        <div>
          <img src="../image/9440461.jpg" className="w-auto rounded-sm"></img>
        </div>
        <div className="w-auto p-3 ">
          <h2 className="mb-2 text-lg font-medium sm:text-xl title-font">
            {post.title}
          </h2>
          <p className="mb-4 text-base leading-relaxed">{post.body}</p>
        </div>
      </div>
    </div>
  );
};



export default PostNewCard;
