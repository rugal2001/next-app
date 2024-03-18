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
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import fetcher from "../lib/fetcher";
import { NastedCommentCard } from "./nasted-comment-card";
import { FaReply } from "react-icons/fa";

interface CommentCardI {
  comment: { _id: string; contenue: string; user: any };

  onUpdate: any;
}

const CommentCard = ({ onUpdate, comment }: CommentCardI) => {
  const [showAddComment, setShowAddComment] = useState(false);

  const { data: myData, isLoading, error } = useSWR("/me", fetcher);
  // const Comment = comment.comment;
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [uContenue, setUContenue] = useState(comment?.contenue);
  const [showOldComment, setShowOldComment] = useState<boolean>(true);
  const [showNewComment, setShowNewComment] = useState<boolean>(false);
  const [nastedComment, setNastedComment] = useState("");

  const {
    data: nastedComments,
    isLoading: nastedCommentLoading,
    error: nastedCommentError,
    mutate: nastedCommentMutate,
  } = useSWR("/nasted-comments", fetcher);

  // if(!nastedComments) return <div className="">Error in fetching nasted comments</div>
  console.log("nastedComments => ", nastedComments);
  console.log("data => ", myData);

  const handleUpdate = async () => {
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
        `http://localhost:4000/comments/${comment._id}`,
        updatedData,
        config
      );
      onUpdate();
      console.log("updated successfully");
    } catch (error) {
      console.log("Error in updated");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:4000/comments/${comment._id}`,
        config
      );
      onUpdate();
      console.log("deleted successfully");
    } catch (error) {
      console.log("there is an error in delete ");
    }
    setShowConfirmation(false);
  };

  const handleAddNastedComment = async () => {
    console.log("im inside handleAddNastedComment");
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const insertedData = {
        contenue: nastedComment,
        user: myData._id,
        comment: comment._id,
      };
      await axios.post(
        `http://localhost:4000/nasted-comments`,
        insertedData,
        config
      );
      nastedCommentMutate();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("comment", comment.user._id);
  console.log("myData", myData._id);

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
                onClick={handleDelete}
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
      <div className="mb-3 ">
        <div className="grid ">
          <div className="flex justify-between mx-2 bg-gray-200 rounded-lg">
            <div className="flex w-full gap-3 p-4 mx-3 ">
              <div className="">
                <Avatar
                  src={comment.user.image}
                  alt="it's me"
                  className="cursor-pointer"
                />
              </div>

              <div className="grid w-full gap-3">
                <h4 className="text-lg font-bold">
                  {comment.user.firstName} {comment.user.lastName}
                </h4>

                {showOldComment && (
                  <p className="text-black">{comment.contenue}</p>
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
                          handleUpdate();
                        }}
                      >
                        <IoSend className="text-blue-600 cursor-pointer" />
                      </div>
                    </div>
                  </>
                )}
                <div
                  className=" text-sm w-[5%] font-bold cursor-pointer text-opacity-80 hover:underline"
                  onClick={() => {
                    setShowAddComment(true);
                  }}
                >
                  Reply
                </div>
              </div>
            </div>
            <div className="flex items-start p-2 pt-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HiMiniEllipsisVertical className="text-3xl rounded-full cursor-pointer hover:bg-gray-100" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 h-auto bg-white">
                  {/* <DropdownMenuLabel>Outils</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  {/* {post?.data?.user._id === meData?._id ? ( */}
                  {comment.user._id === myData._id ||
                  myData.role === "admin" ? (
                    <DropdownMenuItem
                      className="font-bold cursor-pointer hover:bg-gray-100"
                      // onClick={() => setOpened(true)}
                      onClick={() => {
                        setShowOldComment(false);
                        setShowNewComment(true);
                      }}
                    >
                      <div>Edit Comment</div>
                    </DropdownMenuItem>
                  ) : null}
                  {/* ) : null} */}
                  {/* {post?.data?.user._id === meData?._id ? ( */}
                  {comment.user._id === myData._id ||
                  myData.role === "admin" ? (
                    <DropdownMenuItem
                      className="font-bold cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setShowConfirmation(true);
                      }}
                    >
                      Delete Comment
                    </DropdownMenuItem>
                  ) : null}

                  {/* ) : null} */}
                  <DropdownMenuItem
                    className="font-bold cursor-pointer hover:bg-gray-100"
                    // onClick={() => {
                    //   console.log("this is the post id => ", post.data._id);
                    // }}
                  >
                    Info
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="mt-2 " >
          <div className="grid gap-2  ml-24 mr-2">
            {nastedComments?.data.map((nastedComment) => (
              <NastedCommentCard onUpdate={()=>{nastedCommentMutate()}} myData={myData} comment={nastedComment} />
             
            ))}
          </div>
        </div>
        {showAddComment ? (
          <div className="flex justify-end pr-2 w-full">
            <div className="bg-gray-200 w-[79%] h-24  rounded-lg mt-2 flex gap-3  p-3">
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
                    className="w-full h-10 rounded-lg p-2 scrollbar-none"
                    style={{
                      outline: "none",
                      overflowY: "scroll",
                      scrollbarWidth: "none",
                    }}
                    value={nastedComment}
                    onChange={(e) => setNastedComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-end pb-3">
                <div className="">
                  <IoSend
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      handleAddNastedComment();
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
