import router from "next/router";
import { title } from "process";
import { FaRegComment } from "react-icons/fa";
import { AppShell, Burger, Avatar } from "@mantine/core";
import { useState } from "react";
interface PostsCardI {
  post: { _id: string; name: string; contenue: string ,image:string};
  onClick?: () => any;
}

const PostNewCard = ({ post, onClick = () => {} }: PostsCardI) => {
  const [expanded, setExpanded] = useState(false);
  const words = post.contenue.split(" ");


  const maxWords = 42;

  const shortenedContent = words.slice(0, maxWords).join(" ");

  const displayContent =
    words.length > maxWords ? shortenedContent + "..." : shortenedContent;
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
          {post.name}
        </div>
      </div>
      <div className="flex p-1 bg-gray-200 rounded-md">
        <div className="flex justify-evenly">
          
          <div className=" w-[60%] max-x-lg" style={{background : 'cover'}}>
            <img src={post.image} className="rounded-l-lg w-96 h-96"></img>
          </div>

          <div className="w-[40%] p-3 bg-white rounded-r-lg">
            <h2 className="mb-2 text-lg font-medium sm:text-xl title-font">
              {post.name}
            </h2>
            <p className="mb-4 text-base leading-relaxed ">
              {displayContent}
              {words.length > maxWords && (
                <button onClick={() => setExpanded(!expanded)} className="font-semibold text-blue-600">VoirPlus</button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNewCard;
