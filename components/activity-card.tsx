import { Avatar, Modal } from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosAddCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { LuDelete } from "react-icons/lu";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
interface ActivityCardI {
  activity: any;
}

/**const date = Date.now();
    const dateObject = new Date(date);
    console.log({date})
    console.log(dateObject.toLocaleString('en-US'))
    console.log({ activities }); */
const ActivityCard = ({ activity }: ActivityCardI) => {
  //   const [avatar, setAvatar] = useState("kj");
  const date = Date.now();
  console.log(date);
  console.log({ date });
  const action = activity.eventType.split("_")[1];
  const entity = activity.eventType.split("_")[0];
  console.log({ action });
  console.log({ entity });
 
  const actionIcons = {
    created: "<IoIosAddCircleOutline />", // Replace with your icon name or path
    updated: "<MdOutlineEdit />", // Replace with your icon name or path
    deleted: "<LuDelete />", // Replace with your icon name or path
  };

  return (
    <>
      
        <div className="flex items-center justify-center gap-3">
          <div className="text-lg step text-slate-500">
            
            
              {action === "created" && entity!=="post" && <IoMdAddCircleOutline />}
              {action === "updated" && entity === 'post' && <TbEdit />}
              {action === "updated" && entity!=='post' && <MdOutlineEdit />}
              {action === "deleted" && <MdDeleteForever />}
              {action === "created" && entity === "post" && (
                <img src={activity.user.image} alt="" className="w-5 h-5 rounded-full" />
              )}
           
          </div>
          <div className="flex gap-1 text-slate-900">
            <div className="text-xs font-semibold">
              {activity.user.lastName} {activity.user.firstName}
            </div>
            <div className="text-xs text-slate-600 ">
              {action} {entity} on{" "}
              {moment(activity.submitTime).format("DD MMMM YYYY")} at{" "}
              <span className=" hover:text-slate-900">

              {moment(activity.submitTime).format("hh:mm:ss")}
              </span>
            </div>
          </div>
        </div>
     
    </>
  );
};
export default ActivityCard;
