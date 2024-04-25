import { useRouter } from "next/router";
import { RxActivityLog } from "react-icons/rx";
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
import { CgMenuGridO } from "react-icons/cg";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { SiGooglemessages } from "react-icons/si";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/action-popup";
import { IoIosClose, IoIosMore, IoMdNotifications } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import EventListener from "@/components/event-listener";
import ActivityCard from "@/components/activity-card";
import AuthLayout from "@/layouts/auth-layout";

import { Stepper } from "@mantine/core";
import { FiMoreHorizontal } from "react-icons/fi";
import UserDropDownMenu from "@/components/user-drop-down";
import {
  BiMessageSquareDetail,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { LuActivitySquare } from "react-icons/lu";

enum EventTypes {
  PostCreated = "post_created",
  PostUpdated = "post_updated",
  PostDeleted = "post_deleted",
  CommentCreated = "comment_created",
  CommentUpdated = "comment_updated",
  CommentDeleted = "comment_deleted",
}

function Post() {
  const [show, setShow] = useState({
    activity: { post: { contenue: "" } } || {
        comment: { contenue: "" },
      } || { oldData: { data: { contenue: "" } } || { contenue: "" } } || {
        user: {},
      },
  });
  const [event, setEvent] = useState("empty");
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
      console.log({ response });
      console.log(response.data.data._id);
      EventListener(
        EventTypes.CommentCreated,
        myData,
        post.data,
        activityMutation,
        null,
        response.data.data
      );
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
    EventListener(
      EventTypes.PostDeleted,
      myData,
      post.data,
      activityMutation,
      post
    );
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
        EventTypes.PostUpdated,
        myData,
        post.data,
        activityMutation,
        post
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

  return (
    <>
      <Modal
        opened={openActivityModal}
        onClose={() => {
          closeActivityModal();
          setEvent("empty");
        }}
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
        <div className="flex gap-1">
          <ScrollArea
            h={550}
            w={450}
            offsetScrollbars
            scrollbarSize={12}
            scrollHideDelay={2500}
          >
            <div className="ligne">{/* <div className="h-full">|</div> */}</div>
            <div className="grid gap-5">
              {activityData?.data.map((activity, i) => (
                <div className="step-item" key={i}>
                  <ActivityCard
                    activity={activity}
                    key={activity._id}
                    setShow={setShow}
                    setEvent={setEvent}
                  />
                </div>
              ))}
              {console.log(show)}
            </div>
          </ScrollArea>
          <div className="h-auto p-2 bg-gray-50 rounded-md w-96 border-[1px] border-dashed border-gray-200">
            <ScrollArea
              h={550}
              w={380}
              offsetScrollbars
              scrollbarSize={12}
              scrollHideDelay={2500}
            >
              {event === "empty" && (
                <div className="relative text-gray-300 text-9xl py-52 px-28">
                  <RxActivityLog />
                </div>
              )}
              {event === EventTypes.PostUpdated && (
                <div className="grid gap-2 text-sm text-slate-800">
                  <div className="grid gap-2">
                    <div className="p-2 rounded-md bg-slate-100 border-[1px] border-slate-400 text-black border-dashed">
                      <div className="pb-1 font-semibold text-center text-black">
                        <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                          <div className="w-1 h-auto bg-gray-300"></div>
                          <div className="py-1">NEW POST</div>
                        </div>
                      </div>

                      {show.activity.post.contenue}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="p-2 rounded-md text-gray-400 bg-white border-[1px] border-slate-400  border-dashed">
                      <div className="pb-1 font-semibold text-center text-black">
                        <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                          <div className="w-1 h-auto bg-gray-300"></div>
                          <div className="py-1">OLD POST</div>
                        </div>
                      </div>
                      {show.activity.oldData?.data?.contenue}
                    </div>
                  </div>
                </div>
              )}
              {event === EventTypes.CommentUpdated && (
                <>
                  <div className="grid gap-2  rounded-md">
                    <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                      <div className="w-1 h-auto bg-gray-300"></div>
                      <div className="py-1 text-xs font-semibold">
                        NEW COMMENT
                      </div>
                    </div>
                    <div className="">
                      <CommentCard
                        comment={{
                          replies: undefined,
                          _id: "",
                          contenue: show.activity.comment?.contenue,
                          user: show.activity.user,
                        }}
                        onUpdate={undefined}
                        post={undefined}
                        onUpdateActivity={undefined}
                        showExtra={"No"}
                      />
                    </div>
                    <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                      <div className="w-1 h-auto bg-gray-300"></div>
                      <div className="py-1 text-xs font-semibold">
                        OLD COMMENT
                      </div>
                    </div>
                    <div className="">
                      <CommentCard
                        comment={{
                          replies: undefined,
                          _id: "",
                          contenue: show.activity.oldData?.contenue,
                          user: show.activity.user,
                        }}
                        onUpdate={undefined}
                        post={undefined}
                        onUpdateActivity={undefined}
                        showExtra={"No"}
                      />
                    </div>
                  </div>
                </>
              )}
              {event === EventTypes.CommentDeleted && (
                <>
                  <div className="grid gap-3">
                    <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                      <div className="w-1 h-auto bg-gray-300"></div>
                      <div className="py-1 text-xs font-semibold">
                        DELETED COMMENT
                      </div>
                    </div>
                    <CommentCard
                      comment={{
                        replies: undefined,
                        _id: "",
                        contenue: show.activity.oldData?.contenue,
                        user: show.activity.user,
                      }}
                      onUpdate={undefined}
                      post={undefined}
                      onUpdateActivity={undefined}
                      showExtra={"No"}
                    />
                  </div>
                </>
              )}
              {event === EventTypes.CommentCreated && (
                <>
                  <div className="grid gap-3">
                    <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                      <div className="w-1 h-auto bg-gray-300"></div>
                      <div className="py-1 text-xs font-semibold">
                        ADDED COMMENT
                      </div>
                    </div>
                    <CommentCard
                      comment={{
                        replies: undefined,
                        _id: "",
                        contenue: show.activity.comment?.contenue,
                        user: show.activity.user,
                      }}
                      onUpdate={undefined}
                      post={undefined}
                      onUpdateActivity={undefined}
                      showExtra={"No"}
                    />
                  </div>
                </>
              )}
            </ScrollArea>
          </div>
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
          // closeOnClickOutside={false}
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

      <div className="flex justify-center w-full bg-black">
        <div className="flex w-full bg-black">
          <div className="relative w-full md:w-4/6">
            <div className="sticky top-0 bg-black ">
              <div
                className="absolute z-50 text-4xl text-white rounded-full cursor-pointer top-3 left-3"
                onClick={() => {
                  router.back();
                }}
              >
                <IoCloseOutline />
              </div>
              <img
                src={post.data?.image}
                alt="Post Image"
                className="w-full max-h-[100vh] object-contain max-w-[100vw] "
              />
            </div>
          </div>

          <div className="flex justify-center w-full md:w-2/6">
            <div className="w-full bg-white">
              <div className="fixed top-0 z-50 flex items-center justify-end w-2/6 p-3 text-xl font-semibold bg-white border-b-[1px] border-slate-300 ">
                <div className="flex items-center justify-end gap-3 text-sm text-slate-800">
                  {/* <Avatar src={myData?.image} alt="it's me" /> */}
                  <div className="p-2 rounded-full cursor-pointer bg-slate-200 hover:bg-slate-300">
                    <CgMenuGridO className="text-2xl" />
                  </div>
                  <div className="p-2 rounded-full cursor-pointer bg-slate-200 hover:bg-slate-300">
                    <BiMessageSquareDetail className="text-2xl" />
                  </div>
                  <div className="p-2 rounded-full cursor-pointer bg-slate-200 hover:bg-slate-300">
                    <IoMdNotifications className="text-2xl" />
                  </div>
                  <UserDropDownMenu />
                </div>
              </div>
              <div className="h-auto mt-16 ">
                <div className="flex justify-between p-3">
                  <div className="flex gap-3">
                    <div className="">
                      <Avatar src={post.data?.user?.image} alt="it's me" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-semibold text-slate-900">
                        {post.data?.user.firstName} {post.data?.user.lastName}
                      </div>
                      <div className="text-xs font-normal text-slate-600">
                        {moment(post.data.createdAt).format("DD MMMM YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <FiMoreHorizontal className="text-2xl cursor-pointer " />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 h-auto bg-white">
                        {post?.data?.user._id === myData?._id ||
                        myData.role === "admin" ? (
                          <DropdownMenuItem
                            className="font-semibold cursor-pointer hover:bg-gray-100"
                            onClick={editModal}
                          >
                            <div className="flex items-center gap-2 text-lg h-7">
                              <div className="">
                                <FaRegEdit className="text-yellow-500" />
                              </div>
                              <div className="text-sm">Edit Post</div>
                            </div>
                          </DropdownMenuItem>
                        ) : null}

                        {post?.data?.user._id === myData?._id ||
                        myData.role === "admin" ? (
                          <DropdownMenuItem
                            className="font-semibold cursor-pointer hover:bg-gray-100"
                            onClick={() => setShowConfirmation(true)}
                          >
                            <div className="flex items-center gap-2 text-lg h-7">
                              <div className="">
                                <MdDeleteForever className="text-red-500" />
                              </div>
                              <div className="text-sm">Delete Post</div>
                            </div>
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem
                          className="font-semibold cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            console.log(
                              "this is the post id => ",
                              post.data._id
                            );
                            activityModal();
                          }}
                        >
                          <div className="flex items-center gap-2 text-lg h-7">
                            <div className="">
                              <LuActivitySquare className="text-green-500" />
                            </div>
                            <div className="text-sm">Activities</div>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <div className="p-2 mx-4  text-sm font-semibold  border-b-[1px] border-slate-300">
                {post?.data?.contenue}
                {/* <ScrollArea className="" h={230}>{post.data.contenue}</ScrollArea> */}
              </div>

              <div className="flex items-center justify-between  p-2 px-3 text-xl border-b-[1px] border-slate-300 mx-4">
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
                      showExtra={undefined}
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
