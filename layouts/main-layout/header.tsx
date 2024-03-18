import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { MdHome } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { Avatar } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
const Demo2 = async ({ children }) => {
  return (
    <AppShell
      header={{
        height: 100,
      }}
    >
      {/* <AppShell.Header className="grid items-center justify-center grid-cols-2 text-red-600 bg-blue-600 border border-b-8 border-black"> */}
      <AppShell.Header className="grid items-center justify-center grid-cols-2 text-gray-800 ">
        <div className="ml-10">
          <div>Header</div>
        </div>
        <div className="flex justify-end gap-16 mr-10 text-xl font-bold">
          <div>Home</div>
          <div>Posts</div>
          <div>Comment</div>
          <div>About</div>
        </div>
      </AppShell.Header>
      <AppShell.Main>
        <div>Main</div>
      </AppShell.Main>
    </AppShell>
  );
};

const Header = ({ hideAddButton = false }) => {
  const router = useRouter();
  const { data, isLoading, error } = useSWR("/me", fetcher);
  // console.log("hello this is data ==> ",data);
  return (
    <header className="sticky top-0 z-10 w-full py-5 font-semibold bg-white shadow-md">
      <div className="flex items-center justify-between mx-3">
        <div className="flex items-center gap-3 text-2xl font-bold cursor-pointer" onClick={()=>{
          router.push('/profile')
        }}>
          { data?.role==='admin' ? (
            <div className="p-1 bg-orange-400 rounded-full">
            <div className="p-1 bg-white rounded-full">
            <Avatar src={data?.image} className="cursor-pointer" color="cyan" radius="xl" onClick={()=>{
              router.push('/profile')
            }}>
              {data?.firstName.toUpperCase().charAt(0)}{data?.lastName.toUpperCase().charAt(0)}
            </Avatar>
          </div>
          </div>
          ) : (
            <div className="p-1 rounded-full ">
            <Avatar src={data?.image} className="cursor-pointer" color="cyan" radius="xl" onClick={()=>{
              router.push('/profile')
            }}>
              {data?.firstName.toUpperCase().charAt(0)}{data?.lastName.toUpperCase().charAt(0)}
            </Avatar>
          </div>
          )}
          
          <div className="">{data?.firstName} {data?.lastName}</div>
        </div>
        <div className="text-2xl font-bold"></div>
        <div className="text-2xl font-bold"></div>
        <nav className="w-[60%]  grid justify-end mr-12">
          <div className="">
            <ul className="flex items-center justify-center text-xl gap-11">
              <li>
                <div
                  className="flex items-center justify-center cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly">
                      <MdHome />
                    </div>
                    <div className="">Home</div>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600"
                  onClick={() => {
                    router.push("/posts");
                  }}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly">
                      <MdLibraryBooks />
                    </div>
                    <div className="">Posts</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600"
                  onClick={() => {
                    router.push("/comments");
                  }}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly">
                      <FaCommentDots />
                    </div>
                    <div className="">Comments</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly">
                      <GrResources />
                    </div>
                    <div className="">About</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {hideAddButton === false ? (
          <div
            className="p-4 text-blue-600 bg-white border-2 border-blue-600 rounded-lg cursor-pointer hover:text-white hover:bg-blue-600 w-[10%] text-xl text-center"
            onClick={() => {
              router.push("/posts/addPost");
            }}
          >
            Add post
          </div>
        ) : null}
        <div
          className="p-4 text-red-500 bg-white border-2 border-red-500 rounded-lg cursor-pointer hover:text-white hover:bg-red-500 w-[10%] text-xl text-center"
          onClick={() => {
            localStorage.removeItem("access_token");
            router.push("/auth");
          }}
        >
          Logout
        </div>
      </div>
    </header>
  );
};



export default Header;
