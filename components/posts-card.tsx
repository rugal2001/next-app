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

  if(!post || !post.contenue){
    return null;
  }
  const [expanded, setExpanded] = useState(false);
  const contenue = post.contenue;
  console.log("contenue ==> ",contenue)
  const words = contenue.split(' ');
  console.log("words ==> ",words)


  const maxWords = 20;

  const shortenedContent = words.slice(0, maxWords).join(" ");

  const displayContent =
    words.length > maxWords ? shortenedContent + "..." : shortenedContent;
  return (
    <div
      className="p-1 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow w-[65%]"
      onClick={() => {
        onClick();
      }}
    >
      <div className="w-full bg-white rounded-t-lg ">
        <div className="flex items-center gap-3 p-2 text-xl font-semibold">
          <Avatar src="../image/9440461.jpg" alt="it's me" />
          {post.name}
        </div>
      </div>
      <div className="flex rounded-md">
        <div className="grid ">
          <div className="w-full p-3 bg-white rounded-r-lg">
            <p className="text-base leading-relaxed ">
              {displayContent}
              {words.length > maxWords && (
                <button onClick={() => setExpanded(!expanded)} className="font-semibold text-blue-600">VoirPlus</button>
              )}
            </p>
          </div>
          
          <div className="w-full max-x-lg" style={{background : 'cover'}}>
            <img src={post.image} className="w-full rounded-lg"></img>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostNewCard;
