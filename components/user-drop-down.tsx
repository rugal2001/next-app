import fetcher from "@/lib/fetcher";
import { Menu, Button, Text, rem, Avatar } from "@mantine/core";
import { BiLogOut } from "react-icons/bi";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import router from "next/router";
import { FaAngleDown } from "react-icons/fa";
import useSWR from "swr";

function UserDropDownMenu() {
  const { data, isLoading, error } = useSWR("/me", fetcher);

  return (
    <Menu shadow="md" width={220}>
      <Menu.Target>
        {/* <Button>Toggle menu</Button> */}
        <div className="mr-2 ">
          <Avatar
            src={data?.image}
            className="cursor-pointer"
            color="cyan"
            radius="xl"
            size="md"
          >
            {data?.firstName.toUpperCase().charAt(0)}
            {data?.lastName.toUpperCase().charAt(0)}
          </Avatar>
          <div className="text-black absolute bottom-2 right-5 rounded-full bg-gray-200 cursor-pointer">
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
          <div className="flex gap-3 items-center" onClick={()=>{
            router.push('/profile')
          }}>
            <div className="">
              <Avatar
                src={data?.image}
                className="cursor-pointer"
                color="cyan"
                radius="xl"
                size="md"
              >
                {data?.firstName.toUpperCase().charAt(0)}
                {data?.lastName.toUpperCase().charAt(0)}
              </Avatar>
            </div>
            <div className="font-bold">
              {data?.firstName} {data?.lastName}
            </div>
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
          Transfer my data
        </Menu.Item> */}
        <Menu.Item
          color="red"
          leftSection={
            <BiLogOut  style={{ width: rem(14), height: rem(14) }} />
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
  );
}
export default UserDropDownMenu;
