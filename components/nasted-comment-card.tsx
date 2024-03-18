import { Alert, Avatar } from "@mantine/core";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";

interface NastedCommentI {
  comment: { user: any; contenue: string };
  myData: any;
  onUpdate : any
}

export const NastedCommentCard = ({ onUpdate,myData, comment }: NastedCommentI) => {


  console.log('comment ====> ',comment)
  
  return (
    <>
      <div className="w-full grid gap-2">
        <div className="bg-gray-300 w-full  rounded-lg h-auto flex justify-between ">
          <div className="grid gap-2">
            <div className="flex">
              <div className="p-3">
                <Avatar
                  src={comment.user.image}
                  alt="it's me"
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2">
                  {comment.user.firstName} {comment.user.lastName}
                </h4>
                <div className="">{comment.contenue}</div>
              </div>
            </div>
            <div className="mx-16 mb-3 w-[10%] text-sm font-bold cursor-pointer text-opacity-80 hover:underline">
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
                    // setShowOldComment(false);
                    // setShowNewComment(true);
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
                    // setShowConfirmation(true);
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
                <div className="font-semibold">à {comment.user.firstName} {comment.user.lastName}</div>
                
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
                    defaultValue={`à(${comment.user.firstName} ${comment.user.lastName})`}
                    // onChange={(e) => setNastedComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-end pb-3">
                <div className="">
                  <IoSend
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      // handleAddNastedComment();
                      // setShowAddComment(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};
