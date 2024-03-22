import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import Header from "../../../layouts/main-layout/header";
import Main from "../../../layouts/main-layout";
import { Avatar, Modal, ScrollArea } from "@mantine/core";
import CommentCard from "../../../components/comment-card";
import { useEffect, useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { IoCloseOutline, IoSend } from "react-icons/io5";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/action-popup";
import { IoIosClose } from "react-icons/io";
import { FcLike } from "react-icons/fc";

function Post() {
  const [comment, setComment] = useState("");
  const [opened, setOpened] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uContenue, setUContenue] = useState("");
  const [like, setLike] = useState(0);
  const {
    data: myData,
    isLoading: meLoading,
    error: meError,
  } = useSWR("/me", fetcher);
  const router = useRouter();
  const { postId } = router.query;

  const {
    data: postComments,
    isLoading: commentLoading,
    error: commentError,
    mutate: commentMutate,
  } = useSWR(`/posts/${postId}/comments`, fetcher);

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
    mutate: postMutate,
  } = useSWR(`http://localhost:4000/posts/${postId}`, fetcher);

  if (postError) return <div>Error Loading Post</div>;
  if (!post) return <div>Post not found</div>;
  if (postLoading) return <div>Loading ...</div>;

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const insertedComment = {
        contenue: comment,
        user: myData._id,
        post: post.data._id,
      };
      await axios.post(
        `http://localhost:4000/comments`,
        insertedComment,
        config
      );
      commentMutate();
      setComment("");
    } catch (error) {
      console.log("there is an error in inserted comment ");
    }
  };

  const reversedComments = [...postComments?.data]?.reverse();

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(
        `http://localhost:4000/posts/${post.data._id}`,
        config
      );
      console.log("Post deleted successfully !!");
      router.push("/posts");
    } catch (error) {
      console.error("Error deleting Post ", error);
    }
    postMutate();
    setShowConfirmation(false);
  };

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const updatedData = { contenue: uContenue };
      await axios.put(
        `http://localhost:4000/posts/${post.data._id}`,
        updatedData,
        config
      );
      console.log("Post updated successfully !!");
      setOpened(false);
    } catch (error) {
      console.error("handle Update post ", error);
    }
    postMutate();
  };

    ///////////////////ADD-LIKE//////////////////////
    const handleAddLike = async () =>{
      try {
        const token = localStorage.getItem("access_token");
        const config = {
          headers : {
            Authorization : `Bearer ${token}`,
          },
        };
        await axios.post(
          `http://localhost:4000/posts/:id/like`,config
        );
      } catch (error) {
        console.log('error in adding like ',error);
      }
    }
  
  
    /////////////////////////////////////////////////////
  

  return (
    <>
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
                    src={post?.data.user?.image}
                    alt="it's me"
                    className="cursor-pointer"
                  />
                  {post?.data.user?.firstName} {post?.data.user?.lastName}
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
              defaultValue={post.data.contenue}
              onChange={(e) => setUContenue(e.target.value)}
            />

            <div>
              <img src={post.data.image}></img>
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

      <div className="flex justify-center w-full mb-3">
        <div className="flex w-full bg-black">
          <div className="relative w-full md:w-3/4">
            <div className="sticky top-0 pt-20 bg-black">
              <img
                src={post.data?.image}
                alt="Post Image"
                className="w-full max-h-[80vh] object-contain max-w-[90vw] mx-auto"
              />
              <div
                className="absolute top-0 m-3 text-6xl text-white rounded-full cursor-pointer"
                onClick={() => {
                  router.back();
                }}
              >
                <IoCloseOutline />
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full md:w-1/4">
            <div className="w-full bg-white">
              <div className="flex items-center justify-between p-3 text-xl font-semibold bg-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <Avatar src={post.data?.user?.image} alt="it's me" />
                  {post.data?.user.firstName} {post.data?.user.lastName}
                </div>
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiMiniEllipsisVertical className="text-3xl rounded-full cursor-pointer hover:bg-gray-100" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 h-auto bg-white">
                      
                      {post?.data?.user._id === myData?._id ||
                      myData.role === "admin" ? (
                        <DropdownMenuItem
                          className="font-bold cursor-pointer hover:bg-gray-100"
                          onClick={() => setOpened(true)}
                        >
                          Edit
                        </DropdownMenuItem>
                      ) : null}

                      {post?.data?.user._id === myData?._id ||
                      myData.role === "admin" ? (
                        <DropdownMenuItem
                          className="font-bold cursor-pointer hover:bg-gray-100"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Delete
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem
                        className="font-bold cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                          console.log("this is the post id => ", post.data._id)
                        }
                      >
                        Info
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-2 text-xl font-semibold bg-gray-200">
                {post?.data?.contenue}
                {/* <ScrollArea className="" h={230}>{post.data.contenue}</ScrollArea> */}
              </div>

              <div className="flex items-center w-full gap-2 p-2 text-xl bg-white">
                <div className="">
                  <FcLike
                    className="cursor-pointer"
                    onClick={() => {
                      
                      handleAddLike();
                    }}
                  />
                </div>
                <div className="">{post.data?.like}</div>
              </div>

              <div className="py-2 ">
                <div className="grid gap-2">
                  {reversedComments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      onUpdate={() => {
                        commentMutate();
                      }}
                      comment={comment}
                      nasted={{
                        _id: "",
                        contenue: "",
                        distinataire: "",
                        user: undefined,
                        comment: undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="sticky bottom-0 p-2 bg-white ">
                <div className="grid gap-2 mb-2">
                  <div className="flex items-center gap-3 px-3 mt-2 text-xl font-semibold text-white">
                    <div>
                      {myData?.firstName} {myData?.lastName}
                    </div>
                  </div>
                  <div className="flex justify-between w-full gap-3">
                    <div className="h-20 text-white">h</div>
                    <IoSend
                      className="text-3xl text-white "
                      onClick={handleAddComment}
                    />
                  </div>
                </div>
              </div>
              <div className="fixed bottom-0 right-0 w-[25%] p-2 bg-white shadow-xl">
                <div className="grid gap-2 mb-2">
                  <div className="flex items-center gap-3 px-3 mt-2 text-xl font-semibold">
                    <Avatar src={myData?.image} color="cyan" radius="xl" />
                    <div>
                      {myData?.firstName} {myData?.lastName}
                    </div>
                  </div>
                  <div className="flex justify-between w-full gap-3">
                    <textarea
                      className="w-full h-12 px-3 ml-3 bg-white rounded-lg"
                      placeholder="Add your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <IoSend
                      className="text-3xl text-blue-600 cursor-pointer"
                      onClick={handleAddComment}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Post.GetLayout = function GetLayout(Home) {
  const router = useRouter();
  useEffect(() => {
    const token = process.browser && localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return <>{Home}</>;
};

export default Post;
