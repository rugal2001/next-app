import moment from "moment";

import { IoIosAddCircleOutline, IoMdAddCircleOutline } from "react-icons/io";

import { MdDeleteForever, MdError, MdOutlineEdit } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { IconXboxX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiEditCircleLine } from "react-icons/ri";
// import { HoverCard, Button, Text, Group } from '@mantine/core';

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { RxCrossCircled } from "react-icons/rx";

enum EventTypes {
  PostCreated = "post_created",
  PostUpdated = "post_updated",
  PostDeleted = "post_deleted",
  CommentCreated = "comment_created",
  CommentUpdated = "comment_updated",
  CommentDeleted = "comment_deleted",
}

interface ActivityCardI {
  activity: any;
  setShow: any;
  setEvent : any;
}

const ActivityCard = ({ activity, setShow,setEvent }: ActivityCardI) => {
  const [openedPost, { open: openPost, close: closePost }] =
    useDisclosure(false);
  const [
    openedCommentMadal,
    { open: openCommentModal, close: closeCommentModal },
  ] = useDisclosure(false);
  const [
    openedAddCommentMadal,
    { open: openAddCommentModal, close: closeAddCommentModal },
  ] = useDisclosure(false);
  const [
    openedDeletedCommentMadal,
    { open: opendeletedCommentModal, close: closedeletedCommentModal },
  ] = useDisclosure(false);
  if (!activity.eventType) {
    return (
      <div className="flex items-center justify-center gap-3 ml-1 text-xs text-red-500">
        <div className="text-lg">
          <MdError />
        </div>
        <div className="">Activity type is missing</div>
      </div>
    );
  }

  // console.log(activity.comment)
  // if(activity.comment){
  //   if (activity.comment._id) {
  //     console.log(activity.comment._id);
  //   }
  // }

  const date = Date.now();

  const action = activity.eventType.split("_")[1];
  const entity = activity.eventType.split("_")[0];
  if (!action) {
    return <div className="">there is no action</div>;
  }
  if (!entity) {
    return <div className="">there is no entity</div>;
  }

  return (
    <>
      {/* <Modal
        opened={openedPost}
        onClose={closePost}
        withCloseButton={false}
        centered
        size={"md"}
      >
        <div className="grid gap-2 text-sm text-slate-800">
          <div className="grid gap-2">
            <div className="p-2 rounded-md bg-slate-100 border-[1px] border-slate-400 text-black border-dashed">
              <div className="pb-1 font-semibold text-center text-black">
                <div className="flex gap-2 border-b-[1px] border-slate-200 ">
                  <div className="w-1 h-auto bg-gray-300"></div>
                  <div className="py-1">NEW POST</div>
                </div>
              </div>
              {activity.post.contenue}
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
              {activity.oldData?.data?.contenue}
            </div>
          </div>
        </div>
      </Modal> */}

      {/* <Modal
        opened={openedAddCommentMadal}
        onClose={closeAddCommentModal}
        title="Added Comment"
      >
        <div className="grid gap-5 text-xs text-slate-800">
          <div className="">{activity.comment?.contenue}</div>
        </div>
      </Modal> */}
      {/* <Modal
        opened={openedCommentMadal}
        onClose={closeCommentModal}
        title="Actions"
      >
        <div className="grid gap-5 text-xs text-slate-800">
          <div className="">
            <span className="font-semibold">old Comment : </span>
            {activity.oldData?.contenue}
          </div>
          <div className="h-[0.5px] w-[90%] bg-slate-300 mx-5 rounded-full"></div>
          <div className="">
            <span className="font-semibold">new Comment : </span>
            {activity.comment?.contenue}
          </div>
        </div>
      </Modal> */}
      <Modal
        opened={openedDeletedCommentMadal}
        onClose={closedeletedCommentModal}
        title="Deleted Comment"
      >
        <div className="grid gap-5 text-xs text-slate-800">
          {activity.oldData?.contenue}
        </div>
      </Modal>

      <div className="flex items-center justify-center gap-3">
        <div className="text-lg step text-slate-500">
          {action === "created" && entity !== "post" && (
            <IoMdAddCircleOutline className="text-blue-500" />
          )}
          {action === "updated" && entity === "post" && (
            <TbEdit className="text-yellow-500" />
          )}
          {action === "updated" && entity !== "post" && (
            <MdOutlineEdit className="text-yellow-500" />
          )}
          {action === "deleted" && <MdDeleteForever className="text-red-500" />}
          {action === "created" && entity === "post" && (
            <img
              src={activity.user.image}
              alt=""
              className="w-5 h-5 rounded-full"
            />
          )}
        </div>
        <div className="flex gap-1 text-slate-900">
          <div className="text-xs font-semibold">
            {activity.user.lastName} {activity.user.firstName}
          </div>

          <div
            className="text-xs text-slate-600 "
            onClick={() => {
              setShow({ activity });
            }}
          >
            {action}{" "}
            {entity === "post" && action === "updated" && (
              <span
                className="font-semibold cursor-pointer text-slate-900"
                onClick={() => {
                  openPost();
                  setEvent(EventTypes.PostUpdated)
                }}
              >
                {entity}
              </span>
            )}
            {entity === "post" && action !== "updated" && (
              <span
                className="font-semibold text-slate-900"
                // onClick={open}
              >
                {entity}
              </span>
            )}
            {entity === "comment" && action === "created" && (
              <span
                className="font-semibold cursor-pointer text-slate-900"
                onClick={()=>{
                  setEvent(EventTypes.CommentCreated)
                }}
              >
                {entity}
              </span>
            )}
            {entity === "comment" && action === "updated" && (
              <span
                className="font-semibold cursor-pointer text-slate-900"
                onClick={()=>{
                  setEvent(EventTypes.CommentUpdated)
                }}
              >
                {entity}
              </span>
            )}
            {entity === "comment" && action === "deleted" && (
              <span
                className="font-semibold cursor-pointer text-slate-900"
                onClick={()=>{
                  setEvent(EventTypes.CommentDeleted)
                }}
              >
                {entity}
              </span>
            )}{" "}
            on {moment(activity.createdAt).format("DD MMMM YYYY")} at{" "}
            <span className=" hover:text-slate-900">
              {moment(activity.createdAt).format("hh:mm:ss")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ActivityCard;
