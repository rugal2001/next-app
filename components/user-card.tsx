import { Avatar, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

enum EventTypes {
  PostCreated = "post_created",
  PostUpdated = "post_updated",
  CommentCreated = "comment_created",
  CommentUpdated = "comment_updated",
  CommentDeleted = "comment_deleted",
}
interface UserCardI {
  user: any;
  onUpdate: any;
}

const UserCard = ({ onUpdate, user }: UserCardI) => {
  const [changeRole, setChangeRole] = useState(false);
  const [
    UpdatedUserRole,
    { open: openupdateUserRole, close: closeUpdateUserRole },
  ] = useDisclosure(false);
  const [deletedUser, { open: openDeleteUser, close: closeDeleteUser }] =
    useDisclosure(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {}, []);

  const handleUpdateUser = async () => {
    console.log({ userRole });
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const updatedData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        role: userRole,
      };
      const result = await axios.put(
        `http://localhost:4000/user/${user._id}`,
        updatedData,
        config
      );
      //   console.log({ result });
      //   EventListener(
      //     EventTypes.CommentUpdated,
      //     myData,
      //     post.data,
      //     onUpdateActivity,
      //     comment,
      //     result.data.data
      //   );

      onUpdate();
      closeUpdateUserRole();
      console.log("updated successfully");
    } catch (error) {
      console.log("Error in updated");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:4000/user/${user._id}`, config);

      // console.log("result.data.data._id => ", result.data.data._id);
      // EventListener(
      //   EventTypes.CommentDeleted,
      //   myData,
      //   post.data,
      //   onUpdateActivity,
      //   comment
      // );

      onUpdate();
      console.log("deleted successfully");
    } catch (error) {
      console.log("there is an error in delete ");
    }
    // setShowConfirmation(false);
  };
  console.log(user.firstName);
  return (
    <>
      <Modal
        opened={UpdatedUserRole}
        radius={"md"}
        size={"40%"}
        onClose={closeUpdateUserRole}
        withCloseButton={false}
        className=""
        centered
      >
        {/* <div onClick={handleUpdateUser}>Hello</div> */}

        {/* {userRole === 'admin' ?  setUserRole('user'):setUserRole('admin') } */}
        <div className="grid w-full gap-3 p-2">
          <div className="text-lg font-semibold">Are you absolutely sure?</div>
          <div className="mb-2 text-sm text-muted-foreground">
            {
                user.role==='user' ?  'Are you certain about granting admin privileges to this user?' : 'Are you sure you want to revoke admin privileges from this user?'
            }
            
          </div>
          <div className="flex items-center justify-end gap-2">
            <div
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-black transition-colors bg-white rounded-md shadow cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-gray-50 h-9"
              onClick={() => {
                closeUpdateUserRole();
              }}
            >
              Cancel
            </div>
            <div
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-colors bg-black rounded-md shadow cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-gray-800 h-9"
              onClick={handleUpdateUser}
            >
              Confirm
            </div>
          </div>
        </div>
      </Modal>
      
      <Modal
        opened={deletedUser}
        radius={"md"}
        size={"40%"}
        onClose={closeDeleteUser}
        withCloseButton={false}
        className=""
        centered
      >
        {/* <div onClick={handleUpdateUser}>Hello</div> */}

        {/* {userRole === 'admin' ?  setUserRole('user'):setUserRole('admin') } */}
        <div className="grid w-full gap-3 p-2">
          <div className="text-lg font-semibold">Are you absolutely sure?</div>
          <div className="text-sm text-muted-foreground">
          Deleting this user will remove their account permanently from our database. Are you sure you want to proceed?
          </div>
          <div className="flex items-center justify-end gap-2">
            <div
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-black transition-colors bg-white rounded-md shadow cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-gray-50 h-9"
              onClick={() => {
                closeDeleteUser();
              }}
            >
              Cancel
            </div>
            <div
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-md shadow cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-red-400 h-9"
              onClick={handleDeleteUser}
            >
              Delete
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex items-center justify-between w-full h-16 px-5 text-sm font-semibold text-center cursor-default  bg-slate-50 hover:bg-slate-100 border-b-[1px] border-slate-200">
        <div className="ml-1">
          <Avatar
            src={user.image}
            className="cursor-pointer"
            color="cyan"
            radius="xl"
            size="md"
          >
            {user.lastName[0].toUpperCase()}
            {user.firstName[0].toUpperCase()}
          </Avatar>
        </div>
        <div className="w-20 text-center">{user.firstName}</div>
        <div className="w-20 text-center">{user.lastName}</div>
        <div className="w-40 text-center">{user.email}</div>
        {user.role === "admin" ? (
          <div
            className="w-auto p-1 px-4 font-semibold text-green-700 bg-green-200 rounded-md cursor-pointer hover:border-b-2 hover:border-green-700"
            onClick={() => {
              setUserRole("user");
              openupdateUserRole();
              setChangeRole(true);
            }}
          >
            {user.role}
          </div>
        ) : (
          <div
            className="w-auto p-1 px-4 font-semibold text-indigo-700 bg-indigo-200 rounded-md cursor-pointer hover:border-b-2 hover:border-indigo-700"
            onClick={() => {
              setUserRole("admin");
              openupdateUserRole();
            }}
          >
            {user.role}
          </div>
        )}
        <div
        // w-auto p-1 px-4 font-semibold text-indigo-700 bg-indigo-200 rounded-md cursor-pointer
          className="flex items-center w-auto gap-2 p-1 px-4 font-semibold text-center text-red-500 rounded-md cursor-pointer bg-red-50 hover:bg-red-100 hover:border-b-2 hover:border-red-500"
          onClick={() => {
            openDeleteUser();
          }}
        >
          Delete
        </div>
      </div>
    </>
  );
};
export default UserCard;
