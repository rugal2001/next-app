import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import Header from "../../../layouts/main-layout/header";
import Main from "../../../layouts/main-layout";
import moment from "moment";
import { Avatar, Loader, Modal, ScrollArea } from "@mantine/core";
import CommentCard from "../../../components/comment-card";
import { useEffect, useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { IoCloseOutline, IoSend } from "react-icons/io5";

import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/action-popup";
import { IoIosClose } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import EventListener from "@/components/event-listener";
import ActivityCard from "@/components/activity-card";
import AuthLayout from "@/layouts/auth-layout";

import { Stepper } from '@mantine/core';
enum EventTypes {
  PostCreated = "post_created",
  PostUpdated = "post_updated",
  CommentCreated = "comment_created",
  CommentUpdated = "comment_updated",
  CommentDeleted = "comment_deleted",
}

function Post() {
  const [comment, setComment] = useState("");
  // const [opened, setOpened] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uContenue, setUContenue] = useState("");
  const [like, setLike] = useState(0);
  // const [opened, { open, close }] = useDisclosure(false);
  const [
    openActivityModal,
    { open: activityModal, close: closeActivityModal },
  ] = useDisclosure(false);
  const [openEditModal, { open: editModal, close: closeEditModal }] =
    useDisclosure(false);

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
    data: activityData,
    isLoading: activityLoading,
    error: activityError,
    mutate: activityMutation,
  } = useSWR(`/activity/${postId}`, fetcher);

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
    mutate: postMutate,
  } = useSWR(`http://localhost:4000/posts/${postId}`, fetcher);

  if (postLoading)
    return (
      <div className="grid justify-center mt-80">
        <Loader color="blue" />;
      </div>
    );
  if (postError) return <div>Error Loading Post</div>;
  if (!post) return <div>Post not found</div>;

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const insertedComment = {
        contenue: comment,
        user: myData._id,
        post: post.data._id,
      };
      const response = await axios.post(
        `http://localhost:4000/comments`,
        insertedComment,
        config
      );
      // console.log(response.data.data._id)
      EventListener(myData, post.data, EventTypes.CommentCreated, () => {
        activityMutation();
      });
      commentMutate();
      setComment("");
    } catch (error) {
      console.log("there is an error in inserted comment ");
    }
  };

  if (commentLoading) {
    return <div>Loading</div>;
  }

  // const reversedComments = [...postComments?.data]?.reverse();

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(
        `http://localhost:4000/posts/${post.data._id}`,
        config
      );
      // EventListener(myData, post.data._id, "Delete Post");
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
      EventListener(
        myData,
        post.data,
        EventTypes.PostUpdated,
        activityMutation
      );
      console.log("Post updated successfully !!");
      // setOpened(false);
    } catch (error) {
      console.error("handle Update post ", error);
    }
    postMutate();
  };

  //////////////////////////////////////////////
  const updateNumberOfComments = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const updatedData = { numberOfComments: post.data.numberOfComments + 1 };
      await axios.put(
        `http://localhost:4000/posts/${post.data._id}`,
        updatedData,
        config
      );
      console.log("number of comments updated successfully !!");
    } catch (error) {
      console.error("handle Update post ", error);
    }
    postMutate();
  };

  ///////////////////ADD-LIKE//////////////////////
  const handleAddLike = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`http://localhost:4000/posts/:id/like`, config);
    } catch (error) {
      console.log("error in adding like ", error);
    }
  };

  /////////////////////////////////////////////////////

  // console.log("postsComments =>", postComments.data.length);
  if (activityLoading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }
  if (activityError) {
    return <div className="">Error</div>;
  }
  console.log({ activityData });

  return (
    <>
      <Modal
        opened={openActivityModal}
        onClose={closeActivityModal}
        title="Activities"
        // style={{ height: '400px' }}
        // className="min-w-96"
        size={"auto"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <div className="">
          <ScrollArea
            h={500}
            w={500}
            offsetScrollbars
            scrollbarSize={12}
            scrollHideDelay={2500}
          >
            <div className="ligne">
              {/* <div className="h-full">|</div> */}
              
            </div>
            <div className="grid gap-5">
            {activityData?.data.map((activity) => (
             <div className="step-item">
               <ActivityCard activity={activity} key={activity._id} />

             </div>
              
            ))}

            </div>
          </ScrollArea>
        </div>
      </Modal>

      <Modal
        opened={openEditModal}
        onClose={closeEditModal}
        withCloseButton={false}
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <div className="grid gap-4 -m-4 ">
          <div className="w-full h-auto">
            <div className="flex items-start justify-between w-full p-2">
              <div className="flex w-full gap-3 ">
                <div className="flex items-center gap-3 p-2 text-sm font-semibold  w-[100%]  mb-3">
                  <Avatar
                    src={post?.data.user?.image}
                    alt="it's me"
                    className="cursor-pointer"
                  />
                  <div className="grid gap-1">
                    <div className="">
                      {post?.data.user?.firstName} {post?.data.user?.lastName}
                    </div>
                    <div className="text-xs font-normal text-slate-600">
                      {moment(post.data.createdAt).format("DD MMMM YYYY")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <IoIosClose
                  className="pr-1 text-xs cursor-pointer w-7 h-7 text-slate-700"
                  onClick={closeEditModal}
                />
              </div>
            </div>
            <div className="px-2">
              <textarea
                style={{
                  outline: "none",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
                className="w-full h-56 p-2 mb-3 text-sm font-medium bg-gray-300 rounded-sm scrollbar-none text-slate-700"
                defaultValue={post.data.contenue}
                onChange={(e) => setUContenue(e.target.value)}
              />
              {/* <div className="grid justify-center ">
              <img className="rounded-md" src={post.data.image}></img>
            </div> */}
              <div className="flex justify-end mb-3">
                <div
                  className="grid items-center justify-center w-auto px-4 text-sm font-semibold text-white rounded-sm cursor-pointer bg-violet-700 h-9 hover:bg-violet-600"
                  onClick={() => {
                    handleUpdatePost();
                    closeEditModal();
                  }}
                >
                  Modifier
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {showConfirmation && (
        <Modal
          opened={true}
          onClose={() => {
            setShowConfirmation(false);
          }}
          withCloseButton={false}
          size="lg"
          centered
        >
          <div className="grid justify-center w-full ">
            <div className="flex items-center justify-between gap-40">
              <div className="mb-3 text-sm">
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
                className="grid items-center justify-center w-40 h-10 mt-2 text-sm font-semibold text-red-500 bg-white border-2 border-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={() => {
                  handleDeletePost();
                }}
              >
                Confirm delete
              </div>
              <div
                className="grid items-center justify-center w-40 h-10 mt-2 text-sm font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
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

      <div className="flex justify-center w-full">
        <div className="flex w-full bg-black">
          <div className="relative w-full md:w-4/6">
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

          <div className="flex justify-center w-full md:w-2/6">
            <div className="w-full bg-white">
              <div className="fixed top-0 z-50 flex items-center justify-between w-2/6 p-3 text-xl font-semibold bg-white rounded-t-lg">
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
                          onClick={editModal}
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
                        onClick={() => {
                          console.log("this is the post id => ", post.data._id);
                          activityModal();
                        }}
                      >
                        Activities
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-2 mt-16 text-sm font-semibold bg-gray-200">
                {post?.data?.contenue}
                {/* <ScrollArea className="" h={230}>{post.data.contenue}</ScrollArea> */}
              </div>

              <div className="flex items-center justify-between w-full p-2 px-3 text-xl ">
                <div className="">
                  <FcLike
                    className="cursor-pointer"
                    onClick={() => {
                      handleAddLike();
                    }}
                  />
                </div>
                <div className="text-sm font-semibold">
                  {postComments.data.length} comments
                </div>
                {/* <div className="">{post.data?.like}</div> */}
              </div>

              <div className="p-2 ">
                <div className="grid gap-2">
                  {postComments?.data.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      onUpdate={() => {
                        commentMutate();
                      }}
                      comment={comment}
                      post={post}
                      onUpdateActivity={() => {
                        activityMutation();
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
                      // onClick={() => {
                      //   updateNumberOfComments();
                      //   handleAddComment();
                      // }}
                    />
                  </div>
                </div>
              </div>
              <div className="fixed bottom-0 right-0 w-2/6 p-2 bg-white shadow-xl">
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
                      onClick={() => {
                        updateNumberOfComments();
                        handleAddComment();
                      }}
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
  return (
    <>
      <AuthLayout>{Home}</AuthLayout>
    </>
  );
};

export default Post;
