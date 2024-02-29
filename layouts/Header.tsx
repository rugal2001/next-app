import { AppShell, Avatar } from "@mantine/core";
import { useRouter } from "next/router";
import { MdHome } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
const Demo2 = ({ children }) => {
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
      {/* <AppShell.Navbar>
        
        <div>NavBar</div>
      </AppShell.Navbar> */}
      <AppShell.Main>
        <div>Main</div>
      </AppShell.Main>
    </AppShell>
  );
};

const Header = ({ hideAddButton = false }) => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 w-full py-5 font-semibold bg-white shadow-md">
      <div className="flex items-center justify-between mx-3">
        <div className="text-2xl font-bold">Logo Searsh bar</div>
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
      </div>
    </header>
  );
};

export default Header;
