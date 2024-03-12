import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { AppShell, Burger, Avatar, Portal, Modal, Alert } from "@mantine/core";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import { IoIosClose } from "react-icons/io";
//////////////////////////////////////////////////////////
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/action-popup";
import axios from "axios";
import { IconInfoCircle } from "@tabler/icons-react";

//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////

interface PostsCardI {
  post: {
    _id: string;
    name: string;
    contenue: string;
    image: string;
    user: Record<string, any>;
  };
  onClick?: () => any;
}

const PostNewCard = ({ post, onClick = () => {} }: PostsCardI) => {
  const icon = <IconInfoCircle />;
  const [uContenue, setUContenue] = useState(post.contenue);
  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const contenue = post.contenue;

  const words = contenue.split(" ");

  const maxWords = 20;

  const shortenedContent = words.slice(0, maxWords).join(" ");

  const displayContent =
    words.length > maxWords ? shortenedContent + "..." : shortenedContent;

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
    setShowConfirmation(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleUpdatePost = async () => {
    try {
      await axios.put;
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
      console.log("Post updated succeffully !!");
      setOpened(false);
      mutate(`http://localhost:4000/posts/${post._id}`, updatedData, true);
    } catch (error) {
      console.error("handle Update post ", error);
    }
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
          className=""
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
              style={{ outline: "none", overflowY: "hidden" }}
              className="w-full px-2 mb-3 rounded-lg"
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
      <div className="p-1 bg-white border border-gray-200 rounded-lg hover:shadow w-[65%]">
        <div className="w-full bg-white rounded-t-lg ">
          <div className="flex justify-between ">
            <div className="flex items-center gap-3 p-2 text-xl font-semibold">
              <Avatar
                src={post?.user?.image}
                alt="it's me"
                className="cursor-pointer"
              />
              {post?.user?.firstName} {post?.user?.lastName}
            </div>
            <div className="flex items-center pr-2 " onClick={() => {}}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HiMiniEllipsisVertical className="text-3xl rounded-full cursor-pointer hover:bg-gray-100" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 h-auto bg-white">
                  {/* <DropdownMenuLabel>Outils</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="font-bold cursor-pointer hover:bg-gray-100"
                    onClick={() => setOpened(true)}
                  >
                    <div>Edit</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-bold cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setShowConfirmation(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-bold cursor-pointer hover:bg-gray-100">
                    Info
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="flex rounded-md">
          <div className="grid w-full">
            <div className="w-full p-3 bg-white rounded-r-lg">
              <p className="text-base leading-relaxed ">
                {displayContent}
                {words.length > maxWords && (
                  <button
                    onClick={() => onClick()}
                    className="font-semibold text-blue-600"
                  >
                    VoirPlus
                  </button>
                )}
              </p>
            </div>

            <div className="w-full max-x-lg" style={{ background: "cover" }}>
              <img
                src={post.image}
                className="w-full rounded-lg cursor-pointer"
                // style={{ height: "15cm" }}
                onClick={() => {
                  onClick();
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostNewCard;
