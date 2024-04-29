import moment from "moment";

import { IoMdAddCircleOutline } from "react-icons/io";

import { MdDeleteForever, MdError, MdOutlineEdit } from "react-icons/md";
import { TbEdit } from "react-icons/tb";


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
 
  console.log('im here')
  console.log({activity})

  
  
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

  

  const action = activity.eventType.split("_")[1];
  const entity = activity.eventType.split("_")[0];
  if (!action) {
    return <div className="">there is no action</div>;
  }
  if (!entity) {
    return <div className="">there is no entity</div>;
  }
  console.log({activity})
  

  return (
    <>
      

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
