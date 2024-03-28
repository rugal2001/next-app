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
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update active link state when a link is clicked
    router.push(link); // Navigate to the clicked link
  };
  return (
    <header className="sticky top-0 z-10 w-full h-full py-3 font-semibold bg-teal-200 shadow-md">
      <div className="flex items-center justify-between mx-3">
        <nav className="w-auto grid justify-center ml-5 ">
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
                    <div className="flex justify-evenly text-xl">
                      <MdHome />
                    </div>
                    <div className="">Home</div>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 ${
                    activeLink === "/posts" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/posts")}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly text-xl">
                      <MdLibraryBooks />
                    </div>
                    <div className="">Posts</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 ${
                    activeLink === "/comments" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/comments")}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly text-xl">
                      <FaCommentDots />
                    </div>
                    <div className="">Comments</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:text-blue-600 ${
                    activeLink === "/about" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/about")}
                >
                  <div className="grid items-center">
                    <div className="flex justify-evenly text-xl">
                      <GrResources />
                    </div>
                    <div className="">About</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex gap-1  w-[20%] justify-start ">
          {hideAddButton === false ? (
            <div
              className="p-2 text-blue-600 bg-white border-[1px] border-blue-600 rounded-lg cursor-pointer hover:text-white hover:bg-blue-600 w-[40%] text-sm text-center "
              onClick={() => {
                router.push("/posts/addPost");
              }}
            >
              <div className="flex gap-3 justify-center items-center">
                <div className="text-xl"><TbArrowBigDownLinesFilled /></div>
                <div className="">Add post</div>
              </div>
              
            </div>
          ) : null}
        </div>
        <div
          className="flex items-center gap-3 text-sm font-bold  "
          
        >
          
          
        <div className=""><UserDropDownMenu/></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
