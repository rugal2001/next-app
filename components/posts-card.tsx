import router from "next/router";
import { title } from "process";
import { FaRegComment } from "react-icons/fa";
import { AppShell, Burger, Avatar } from "@mantine/core";
interface PostsCardI {
  post: { _id: string; name: string; contenue: string };
  onClick?: () => any;
}

const PostNewCard = ({ post, onClick = () => {} }: PostsCardI) => {
  return (
    <div
      className="p-1 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow lg:w-auto"
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
      <div className="flex p-1 bg-gray-200 rounded-md">
        <div className="flex gap-3 justify-evenly">
          <div className=" w-[60%]">
            <img src="../image/9440461.jpg" className="rounded-sm "></img>
          </div>

          <div className="w-[40%] p-3 bg-white rounded-lg">
            <h2 className="mb-2 text-lg font-medium sm:text-xl title-font">
              {post.name}
            </h2>
            <p className="mb-4 text-base leading-relaxed">{post.contenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNewCard;
