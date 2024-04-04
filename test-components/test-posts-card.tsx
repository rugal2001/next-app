import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/3d-card";
import { Avatar, Modal } from "@mantine/core";

import { IoIosClose } from "react-icons/io";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
interface PostsCardI {
  post: {
    _id: string;
    name: string;
    contenue: string;
    image: string;
    user: Record<string, any>;
    like: number;
  };
  onClick?: () => any;
  onUpdate: any;
}
const PostNewCard = ({ onUpdate, post, onClick = () => {} }: PostsCardI) => {
  const [uContenue, setUContenue] = useState(post.contenue);
  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [like, setLike] = useState(post.like);
  const [addLike, setAddLike] = useState(false);

  const contenue = post?.contenue;
  const words = contenue?.split(" ");

  const maxWords = 20;

  const shortenedContent = words?.slice(0, maxWords).join(" ");

  const displayContent =
    words?.length > maxWords ? shortenedContent + "..." : shortenedContent;

  if (!post || !post.contenue) {
    return null;
  }

  return (
    <>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="w-full text-xl font-bold text-neutral-600 dark:text-white"
          >
            <div className="flex justify-between w-full ">
              <div className="flex items-center gap-3 p-2 text-xl font-semibold">
                <Avatar
                  src={post?.user?.image}
                  alt="it's me"
                  color="cyan"
                  className="cursor-pointer "
                >
                  {post.user?.firstName.toUpperCase().charAt(0)}
                  {post.user?.lastName.toUpperCase().charAt(0)}
                </Avatar>
                {post?.user?.firstName} {post?.user?.lastName}
              </div>
            </div>
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="max-w-sm mt-2 text-sm text-neutral-500 dark:text-neutral-300"
          >
            {displayContent}
            {words.length > maxWords && (
              <button
                onClick={() => onClick()}
                className="font-semibold text-blue-600"
              >
                VoirPlus
              </button>
            )}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={post.image}
              height="1000"
              width="1000"
              className="object-cover w-full cursor-pointer h-60 rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
              onClick={() => {
                onClick();
              }}
            />
          </CardItem>
          <CardItem
            translateZ="50"
            className="w-full text-xl font-bold text-neutral-600 dark:text-white"
          >
            <div className="flex items-center gap-3 m-2 mt-4 cursor-pointer">
              <div
                className=""
                onClick={() => {
                  if (!like) {
                    setAddLike(true);
                    setLike(like + 1);
                  } else {
                    setAddLike(false);
                    setLike(like - 1);
                  }
                  //   handleUpdatePost();
                }}
              >
                {addLike ? <FcLike /> : <FcLikePlaceholder />}
              </div>
              <div className="text-sm font-semibold">{like}</div>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </>
  );
};
export default PostNewCard;
