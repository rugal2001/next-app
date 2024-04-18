import { Avatar, Modal } from "@mantine/core";
import moment from "moment";
import { useState } from "react";
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
//   switch (action) {
//     case "created":
//       {
//         setAvatar("create");
//       }
//       break;
//     case "updated":
//       {
//         setAvatar("update");
//       }
//       break;
//     case "deleted":
//       {
//         setAvatar("delete");
//       }
//       break;
//     default: {
//       setAvatar(" ");
//     }
//   }

  return (
    <>
      <div className="m-5">
        <div className="flex items-center gap-3">
          <div className="">
            <Avatar src={activity.user.image} size={"sm"} className="">
              {activity.user.lastName[0]} {activity.user.firstName[0]}
            </Avatar>{" "}
          </div>
          <div className="flex gap-1">
            <div className="text-xs font-semibold">
              {activity.user.lastName} {activity.user.firstName}
            </div>
            <div className="text-xs">
              {action} {entity} at{" "}
              {moment(activity.submitTime).format("hh:mm:ss")}{" "}
              {moment(activity.submitTime).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ActivityCard;
