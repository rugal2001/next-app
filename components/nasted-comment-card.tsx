import { Alert, Avatar, Modal } from "@mantine/core";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";

interface NastedCommentI {
  comment: { user: any; contenue: string; _id: string };
  myData: any;
  onUpdate: any;
  nasted: any;
}

export const NastedCommentCard = ({
  onUpdate,
  myData,
  nasted,
  comment,
}: NastedCommentI) => {
  const [nastedComment, setNastedComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);
  const [showOldComment, setShowOldComment] = useState(true);
  const [showNewComment, setShowNewComment] = useState(false);
  const [uContenue, setUContenue] = useState(nasted.contenue);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddNastedComment = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const insertedData = {
        distinataire_firstName: nasted.user.firstName,
        distinataire_lastName: nasted.user.lastName,
        contenue: nastedComment,
        user: myData._id,
        comment: comment._id,
      };
      await axios.post(
        `http://localhost:4000/nasted-comments`,
        insertedData,
        config
      );
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNastedComment = async () => {
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
        `http://localhost:4000/nasted-comments/${nasted._id}`,
        updatedData,
        config
      );
      onUpdate();
    } catch (error) {
      console.log(error);
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
        `http://localhost:4000/nasted-comments/${nasted._id}`,
        config
      );
      onUpdate();
      console.log("deleted successfully");
    } catch (error) {
      console.log("there is an error in delete", error);
    }
    setShowConfirmation(false);
    onUpdate();
  };

  

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
                // onClick={()=>{console.log('nasted comment id => ',nasted._id)}}
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
      <div className="w-full grid gap-2">
        <div className="bg-gray-300 w-full  rounded-lg h-auto flex justify-between ">
          <div className="grid gap-2">
            <div className="flex">
              <div className="p-3">
                <Avatar
                  src={nasted.user.image}
                  alt="it's me"
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2">
                  {nasted.user.firstName} {nasted.user.lastName}
                </h4>
                <div className="font-bold">
                  à {nasted.distinataire_firstName}{" "}
                  {nasted.distinataire_lastName}
                </div>
                {showOldComment && (
                  <div className="mt-2">{nasted.contenue}</div>
                )}
                {showNewComment && (
                  <>
                    <div className="mt-2 flex gap-3 items-center">
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
                          handleUpdateNastedComment();
                        }}
                      >
                        <IoSend className="text-blue-600 cursor-pointer" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className="mx-16 mb-3 w-[10%] text-sm font-bold cursor-pointer text-opacity-80 hover:underline"
              onClick={() => setShowAddComment(true)}
            >
              Reply
            </div>
          </div>
          <div className=" m-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HiMiniEllipsisVertical className="text-2xl rounded-full cursor-pointer hover:bg-gray-100" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 h-auto bg-white rounded-lg text-sm p-1">
                {/* <DropdownMenuLabel>Outils</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                {/* {post?.data?.user._id === meData?._id ? ( */}
                {/* {comment.user._id === myData._id || myData.role === "admin" ? ( */}
                <DropdownMenuItem
                  className="font-bold cursor-pointer  hover:bg-gray-100 rounded-lg my-1 h-7 p-2 px-3 mb-3"
                  // onClick={() => setOpened(true)}
                  onClick={() => {
                    setShowOldComment(false);
                    setShowNewComment(true);
                  }}
                >
                  <div>Edit Comment</div>
                </DropdownMenuItem>
                {/* // ) : null} */}
                {/* ) : null} */}
                {/* {post?.data?.user._id === meData?._id ? ( */}
                {/* {comment.user._id === myData._id || myData.role === "admin" ? ( */}
                <DropdownMenuItem
                  className="font-bold cursor-pointer hover:bg-gray-100 rounded-lg my-1 h-7 p2 px-3"
                  onClick={() => {
                    setShowConfirmation(true);
                  }}
                >
                  Delete Comment
                </DropdownMenuItem>
                {/* ) : null} */}

                {/* ) : null} */}
                <DropdownMenuItem
                  className="font-bold cursor-pointer hover:bg-gray-100 rounded-lg my-1 h-7 2 px-3"
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
        {showAddComment ? (
          <div className="flex justify-end w-full">
            <div className="bg-gray-200 w-[100%] h-auto  rounded-lg mt-2 flex gap-3  p-3">
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
                <div className="font-semibold">
                  à {nasted.user.firstName} {nasted.user.lastName}
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
