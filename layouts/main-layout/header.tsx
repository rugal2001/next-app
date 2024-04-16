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
import { useState } from "react";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import UserDropDownMenu from "@/components/user-drop-down";
import { VscDiffAdded } from "react-icons/vsc";
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
  const [activeLink, setActiveLink] = useState(""); 

  const handleLinkClick = (link) => {
    setActiveLink(link); 
    router.push(link); 
  };
  return (
    <header className="sticky top-0 z-10 w-full h-full py-3 font-semibold text-gray-700 bg-white border-l-8 border-blue-600 shadow-md">
      <div className="flex items-center justify-between mx-3">
        <nav className="w-[30%] grid justify-start ml-5  ">
          <div className="">
            <ul className="flex items-center justify-center text-sm gap-11">
              <li>
                <div
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <MdHome />
                    </div>
                    <div className="">Home</div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/posts" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/posts")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <MdLibraryBooks />
                    </div>
                    <div className="">Posts</div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/comments" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/test")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <FaCommentDots />
                    </div>
                    <div className="">Comments</div>
                  </div>
                </div>
              </li>
              <li>
                <div
                 
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/about" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/about")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <GrResources />
                    </div>
                    <div className="">About</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        
        <div className="flex items-center justify-end gap-3 text-sm font-bold  w-[30%]">
        {hideAddButton === false ? (
            <div className="">
              {/* <div className="flex items-center justify-center gap-3">
                <div className="text-xl"><TbArrowBigDownLinesFilled /></div>
                <div className="">Add post</div>
              </div> */}
              <button
                className="px-4 py-2 text-white transition duration-200 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-400 hover:shadow-xl"
                style={{borderRadius: "14px"}}
                onClick={() => {
                  router.push("/posts/addPost");
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="text-xl">
                    <VscDiffAdded />
                  </div>
                  <div className="">Add post</div>
                </div>
              </button>
            </div>
          ) : null}
          <UserDropDownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
