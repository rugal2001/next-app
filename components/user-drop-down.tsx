import fetcher from "@/lib/fetcher";
import { Menu, Button, Text, rem, Avatar, Loader } from "@mantine/core";
import { BiLogOut } from "react-icons/bi";
import { RxActivityLog } from "react-icons/rx";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { ScrollArea } from "@mantine/core";

import router from "next/router";
import { FaAngleDown, FaUsers } from "react-icons/fa";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import UserCard from "./user-card";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdSearch } from "react-icons/md";

function UserDropDownMenu() {
  const { data: myData, isLoading, error } = useSWR("/me", fetcher);
  const [userId, setUserId] = useState();
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    mutate: userMutation,
  } = useSWR("/user", fetcher);
  const [opened, { open, close }] = useDisclosure(false);

  if (usersLoading) {
    return <Loader />;
  }
  if (usersError) {
    return <div>Error in loading Users</div>;
  }

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size={"70%"}
        withCloseButton={false}

        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >

<div className="flex items-center justify-between">
      <div className="mb-3 text-lg">Users</div>
      <div className="mb-3 w-[30%] rounded-full bg-slate-100 text-sm font-semibold px-3 py-1 text-slate-500 flex items-center gap-3">
        <div className="text-lg"><MdSearch /></div>
        <div className="">Search</div>
        
        </div>

</div>
        {/* <ScrollArea h={'730'} offsetScrollbars> */}

        <div className="flex items-center justify-between w-full h-16 pl-1 pr-5 text-sm font-semibold text-center rounded-t-md bg-slate-100">
          <div className="w-20 text-center">Avatar</div>
          <div className="w-20 text-center">First Name</div>
          <div className="w-20 text-center">Last Name</div>
          <div className="w-40 text-center">Email</div>
          <div className="w-20 text-center">Role</div>
          <div className="w-20 text-center">Action</div>
        </div>
        <ScrollArea h={560}>
        {users.data.map((user) => (
          <UserCard key={user._id} user={user} onUpdate={userMutation} />
        ))}
        </ScrollArea>
        <div className="fixed bottom-0 w-[97%] h-16 border-t-[1px] border-slate-200 flex items-center justify-between bg-white">
          <div className="text-sm">number of Users</div>
          <div className="flex items-center gap-2 text-sm text-center">
            <div className="flex items-center gap-2 px-4 py-2 font-semibold rounded-md w-28 bg-slate-100 text-slate-800">
              <div className=""><GrPrevious /></div>
              <div className="">Previous</div>
              
            </div>
            <div className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-700 rounded-md w-28">
              
              <div className="">Next</div>
              <div className=""><GrNext /></div>
            </div>
          </div>
        </div>
      </Drawer>
      <Menu shadow="md" width={220}>
        <Menu.Target>
          {/* <Button>Toggle menu</Button> */}
          <div className="mr-2 ">
            <Avatar
              src={myData?.image}
              className="cursor-pointer"
              color="cyan"
              radius="xl"
              size="md"
            >
              {myData?.firstName.toUpperCase().charAt(0)}
              {myData?.lastName.toUpperCase().charAt(0)}
            </Avatar>
            <div className="absolute text-black bg-gray-200 rounded-full cursor-pointer bottom-2 right-5">
              <FaAngleDown className="" />
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          {/* <Menu.Label>Application</Menu.Label> */}
          <Menu.Item
          //   leftSection={
          //     <IconSettings style={{ width: rem(14), height: rem(14) }} />
          //   }
          >
            <div
              className="flex items-center gap-3"
              onClick={() => {
                router.push("/profile");
              }}
            >
              <div className="">
                <Avatar
                  src={myData?.image}
                  className="cursor-pointer"
                  color="cyan"
                  radius="xl"
                  size="md"
                >
                  {myData?.firstName.toUpperCase().charAt(0)}
                  {myData?.lastName.toUpperCase().charAt(0)}
                </Avatar>
              </div>
              <div className="font-bold">
                {myData?.firstName} {myData?.lastName}
              </div>
            </div>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <div className="flex items-center gap-3 " onClick={open}>
              <div className="p-2 bg-gray-100 rounded-full">
                <FaUsers className="w-5 h-5 " />
              </div>
              <div className="font-bold">Users</div>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="flex items-center gap-3 "
              onClick={() => {
                router.push("/activities");
              }}
            >
              <div className="p-2 bg-gray-100 rounded-full">
                <RxActivityLog className="w-5 h-5 " />
              </div>
              <div className="font-bold">My Activities</div>
            </div>
          </Menu.Item>
          {/* <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSearch style={{ width: rem(14), height: rem(14) }} />
          }
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

          <Menu.Divider />

          {/* <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Transfer my myData
        </Menu.Item> */}
          <Menu.Item
            color="red"
            leftSection={
              <BiLogOut style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              localStorage.removeItem("access_token");
              router.push("/auth");
            }}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
export default UserDropDownMenu;
