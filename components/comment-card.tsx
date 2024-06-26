import { Avatar, Modal } from "@mantine/core";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./action-popup";
import axios from "axios";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import useSWR from "swr";
import { useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import fetcher from "../lib/fetcher";
import { BsInfoCircle } from "react-icons/bs";
// import { NastedCommentCard } from "./nasted-comment-card";
import { FaRegEdit, FaReply } from "react-icons/fa";
import EventListener from "./event-listener";
import { MdDeleteForever } from "react-icons/md";
import { LuActivitySquare } from "react-icons/lu";
import { useDisclosure } from "@mantine/hooks";

enum EventTypes {
  PostCreated = "post_created",
  PostUpdated = "post_updated",
  CommentCreated = "comment_created",
  CommentUpdated = "comment_updated",
  CommentDeleted = "comment_deleted",
}
interface CommentCardI {
  comment: {
    replies: any;
    _id: string;
    contenue: string;
    user: any;
  };

  onUpdate: any;
  post: any;
  onUpdateActivity: any;
  showExtra: any;
}

const CommentCard = ({
  onUpdate,
  comment,
  post,
  onUpdateActivity,
  showExtra,
}: CommentCardI) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [deletedPost, { open: openDeletePost, close: closeDeletePost }] =
    useDisclosure(false);

  const { data: myData, isLoading, error } = useSWR("/me", fetcher);
  // const Comment = comment.comment;
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [uContenue, setUContenue] = useState(comment?.contenue);
  const [reply, setReply] = useState("");
  const [showOldComment, setShowOldComment] = useState<boolean>(true);
  const [showNewComment, setShowNewComment] = useState<boolean>(false);

  const handleUpdateComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const updatedData = {
        contenue: uContenue,
        oldContenue: comment?.contenue,
      };
      const result = await axios.put(
        `http://localhost:4000/comments/${comment._id}`,
        updatedData,
        config
      );
      console.log({ result });
      EventListener(
        EventTypes.CommentUpdated,
        myData,
        post.data,
        onUpdateActivity,
        comment,
        result.data.data
      );

      onUpdate();
      console.log("updated successfully");
    } catch (error) {
      console.log("Error in updated");
    }
  };

  const handleDeleteComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.delete(
        `http://localhost:4000/comments/${comment._id}`,
        config
      );

      onUpdate();
      console.log("result.data.data._id => ", result.data.data._id);
      EventListener(
        EventTypes.CommentDeleted,
        myData,
        post.data,
        onUpdateActivity,
        comment
      );
      console.log({ onUpdateActivity });
      console.log("deleted successfully");
    } catch (error) {
      console.log("there is an error in delete ");
    }
    setShowConfirmation(false);
  };

  const handleAddNestedComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const insertedComment = {
        contenue: reply,
        user: myData._id,
      };
      const result = await axios.post(
        `http://localhost:4000/${comment._id}/reply/${post.data._id}`,
        insertedComment,
        config
      );
      console.log(myData);
      console.log("post.data => ", post.data);
      console.log("EventTypes.CommentCreated => ", EventTypes.CommentCreated);
      onUpdate();
      EventListener(
        EventTypes.CommentCreated,
        myData,
        post.data,
        onUpdateActivity,
        null,
        result.data.data
      );
    } catch (error) {
      console.log("there is an error in inserted nested comment ");
    }
  };

  // console.log("comment =<> ", comment);
  return (
    <>
      {/* {showConfirmation && (
        <Modal
          opened={true}
          onClose={() => {
            setShowConfirmation(false);
          }}
          withCloseButton={false}
          size="lg"
        >
          <div className="grid justify-center w-full ">
            <div className="flex items-start justify-between gap-40">
              <div className="w-full mb-3 text-xl ">
                Are you sure you want to delete this comment
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
                onClick={handleDeleteComment}
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
      )} */}
      <Modal
        opened={deletedPost}
        radius={"md"}
        size={"40%"}
        onClose={closeDeletePost}
        withCloseButton={false}
        className=""
        centered
      >
        {/* <div onClick={handleUpdateUser}>Hello</div> */}

        {/* {userRole === 'admin' ?  setUserRole('user'):setUserRole('admin') } */}
        <div className="grid w-full gap-3 p-2">
          <div className="text-lg font-semibold">Are you absolutely sure?</div>
          <div className="text-sm text-muted-foreground">
            Are you sure you want to delete this comment? Once deleted, it cannot
            be recovered.
          </div>
          <div className="flex items-center justify-end gap-2">
            <div
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-black transition-colors bg-white rounded-md shadow cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-gray-50 h-9"
              onClick={() => {
                closeDeletePost();
              }}
            >
              Cancel
            </div>
            <div
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-md shadow cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-red-400 h-9"
              onClick={handleDeleteComment}
            >
              Delete
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-full mb-3">
        <div className="grid w-full">
          <div className="flex items-start gap-2">
            <Avatar
              src={comment.user?.image}
              alt="it's me"
              className="mt-2 cursor-pointer w-[5%]"
            />
            <div className="grid gap-3 w-[90%]">
              <div className="flex justify-between w-full bg-slate-50 rounded-2xl border-[1px] border-slate-200 border-dashed shadow-sm shadow-slate-300">
                <div className="flex w-full gap-3 p-4 ">
                  <div className="grid w-full gap-3">
                    <h4 className="text-sm font-bold text-slate-900">
                      {comment.user?.firstName} {comment.user?.lastName}
                    </h4>

                    {showOldComment && (
                      <p className="text-sm text-slate-900">
                        {comment.contenue}
                      </p>
                    )}

                    {showNewComment && (
                      <>
                        <div className="flex items-center gap-3">
                          <textarea
                            className="w-full h-12 pl-3 rounded-md scrollbar-none"
                            defaultValue={uContenue}
                            onChange={(e) => setUContenue(e.target.value)}
                            style={{
                              outline: "none",
                              overflowY: "scroll",
                              scrollbarWidth: "none",
                            }}
                          />
                          <div
                            className=""
                            onClick={() => {
                              setShowOldComment(true);
                              setShowNewComment(false);
                              handleUpdateComment();
                            }}
                          >
                            <IoSend className="text-blue-600 cursor-pointer" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {showExtra !== "No" && (
                <div
                  className=" text-xs w-[5%] font-bold cursor-pointer text-opacity-80 hover:underline text-slate-900 mx-5 -my-2"
                  onClick={() => {
                    setShowAddComment(true);
                    // handleAddNestedComment();
                  }}
                >
                  Reply
                </div>
              )}
            </div>
            {showExtra !== "No" && (
              <div className="flex items-start pt-4 w-[5%]">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <HiMiniEllipsisVertical className="text-2xl rounded-full cursor-pointer hover:bg-gray-100" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 h-auto bg-white">
                    {/* <DropdownMenuLabel>Outils</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    {/* {post?.data?.user._id === meData?._id ? ( */}
                    {comment.user?._id === myData._id ||
                    myData.role === "admin" ? (
                      <DropdownMenuItem
                        className="font-semibold cursor-pointer hover:bg-gray-100"
                        // onClick={() => setOpened(true)}
                        onClick={() => {
                          setShowOldComment(false);
                          setShowNewComment(true);
                          
                        }}
                      >
                        <div className="flex items-center gap-2 text-lg h-7">
                          <div className="">
                            <FaRegEdit className="text-yellow-500" />
                          </div>
                          <div className="text-sm">Edit Comment</div>
                        </div>
                      </DropdownMenuItem>
                    ) : null}
                    {/* ) : null} */}
                    {/* {post?.data?.user._id === meData?._id ? ( */}
                    {comment.user?._id === myData._id ||
                    myData.role === "admin" ? (
                      <DropdownMenuItem
                        className="font-semibold cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          // setShowConfirmation(true);
                          openDeletePost();
                        }}
                      >
                        <div className="flex items-center gap-2 text-lg h-7">
                          <div className="">
                            <MdDeleteForever className="text-red-500" />
                          </div>
                          <div className="text-sm">Delete Comment</div>
                        </div>
                      </DropdownMenuItem>
                    ) : null}

                    {/* ) : null} */}
                    <DropdownMenuItem
                      className="font-semibold cursor-pointer hover:bg-gray-100"
                      // onClick={() => {
                      //   console.log("this is the post id => ", post.data._id);
                      // }}
                    >
                      <div className="flex items-center gap-2 text-lg h-7">
                        <div className="">
                          <BsInfoCircle className="text-blue-500" />
                        </div>
                        <div className="text-sm">Info</div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 ml-10">
          {comment.replies?.map((replyComment) => {
            return (
              <CommentCard
                key={replyComment._id}
                comment={replyComment}
                onUpdate={onUpdate}
                post={post}
                onUpdateActivity={onUpdateActivity}
                showExtra={"yes"}
              />
            );
          })}
        </div>

        {showAddComment ? (
          <div className="w-[87%] ml-9">
            <div className="bg-slate-100 w-[100%] h-auto rounded-xl mx-2 mt-2 flex gap-3  p-3">
              <div className="">
                <Avatar
                  src={myData.image}
                  alt="it's me"
                  className="cursor-pointer"
                />
              </div>
              <div className="grid w-full ">
                <div className="text-lg font-bold">
                  {myData.firstName} {myData.lastName}
                </div>
                <div className="">
                  <textarea
                    name=""
                    id=""
                    className="w-full h-10 p-2 rounded-lg scrollbar-none"
                    style={{
                      outline: "none",
                      overflowY: "scroll",
                      scrollbarWidth: "none",
                    }}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  ></textarea>
                </div>
              </div>
              {/**className="absolute top-0 m-3 text-6xl text-white rounded-full cursor-pointer"*/}

              <div className="grid items-start pb-3">
                <div className="items-start justify-start">
                  <div
                    className="text-xl text-black rounded-full cursor-pointer "
                    onClick={() => {
                      setShowAddComment(false);
                    }}
                  >
                    <IoClose />
                  </div>
                </div>
                <div className="flex justify-end ">
                  <IoSend
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      handleAddNestedComment();
                      setShowAddComment(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default CommentCard;
