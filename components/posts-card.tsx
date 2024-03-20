import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { Avatar, Modal } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
interface PostsCardI {
  post: {
    _id: string;
    name: string;
    contenue: string;
    image: string;
    user: Record<string, any>;
  };
  onClick?: () => any;
  onUpdate: any;
}
const PostNewCard = ({ onUpdate, post, onClick = () => {} }: PostsCardI) => {
  const { data, isLoading, error } = useSWR("/me", fetcher);
  const icon = <IconInfoCircle />;
  const [uContenue, setUContenue] = useState(post.contenue);
  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const contenue = post?.contenue;
  const words = contenue?.split(" ");

  const maxWords = 20;

  const shortenedContent = words?.slice(0, maxWords).join(" ");

  const displayContent =
    words?.length > maxWords ? shortenedContent + "..." : shortenedContent;

  if (!post || !post.contenue) {
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:4000/posts/${post._id}`, config);
      console.log("Post deleted successfully !!");
    } catch (error) {
      console.error("Error deleting Post ", error);
    }
    onUpdate();
    setShowConfirmation(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const updatedData = {
        contenue: uContenue,
      };

      await axios.put(
        `http://localhost:4000/posts/${post._id}`,
        updatedData,
        config
      );
      console.log("Post updated successfully !!");
      setOpened(false);
    } catch (error) {
      console.error("handle Update post ", error);
    }
    onUpdate();
    console.log("onUpdate();", onUpdate());
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {showConfirmation && (
        <Modal
          opened={true}
          onClose={() => {
            setShowConfirmation(false);
          }}
          withCloseButton={false}
          size="lg"
        >
          <div className="grid justify-center w-full ">
            <div className="flex items-center justify-between gap-40">
              <div className="mb-3 text-xl">
                Are you sure you want to delete this post
              </div>
              <div className="">
                <IoIosClose
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    setShowConfirmation(false);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full gap-3">
              <div
                className="grid items-center justify-center w-40 h-10 mt-2 text-xl font-semibold text-red-500 bg-white border-2 border-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={handleDeletePost}
              >
                Confirm delete
              </div>
              <div
                className="grid items-center justify-center w-40 h-10 mt-2 text-xl font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  setShowConfirmation(false);
                }}
              >
                Cancel delete
              </div>
            </div>
          </div>
        </Modal>
      )}

      {opened && (
        <Modal
          opened={true}
          onClose={() => {
            setOpened(false);
          }}
          withCloseButton={false}
          size="lg"
        >
          <div className="grid items-center justify-center ">
            <div className="flex items-center justify-between ">
              <div className="flex gap-3">
                <div className="flex items-center gap-3 p-2 text-xl font-semibold  w-[100%]  mb-3">
                  <Avatar
                    src={post?.user?.image}
                    alt="it's me"
                    className="cursor-pointer"
                  />
                  {post?.user?.firstName} {post?.user?.lastName}
                </div>
              </div>
              <div className="">
                <IoIosClose
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => {
                    setOpened(false);
                  }}
                />
              </div>
            </div>
            <textarea
              style={{
                outline: "none",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
              className="w-full h-24 px-2 mb-3 rounded-lg scrollbar-none"
              defaultValue={uContenue}
              onChange={(e) => setUContenue(e.target.value)}
            />

            <div>
              <img src={post.image}></img>
            </div>
            <div className="flex justify-center w-full ">
              <div
                className="grid items-center justify-center w-[20%] h-12 mt-3 text-xl text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500"
                onClick={handleUpdatePost}
              >
                Modifier
              </div>
            </div>
          </div>
        </Modal>
      )}
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
        </CardBody>
      </CardContainer>
    </>
  );
};
export default PostNewCard;
