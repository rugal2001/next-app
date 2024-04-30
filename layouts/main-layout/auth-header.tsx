import { Avatar } from "@mantine/core";
import { useRouter } from "next/router";
import { IoIosSearch } from "react-icons/io";


export const AuthHeader = ({ openSignIn, openSignUp }) => {
  const router = useRouter();
  const handleSignInClick = () => {
    openSignIn();
  };

  const handleSignUpClick = () => {
    openSignUp();
  };
  return (
    <>
      <header className="sticky flex items-center w-[97%] h-auto p-3 text-sm bg-white border-[1px] border-slate-300  top-5 left-6 rounded-xl monospace bg-opacity-80 backdrop-blur-sm">
        <div className="flex justify-between w-full">
          <div className="flex items-center justify-center gap-3 font-extrabold sm:pl-2 md:pl-12 text-slate-700">
            <div className="">
              <Avatar src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"></Avatar>
            </div>
            <div className="">Next js</div>
          </div>
          {/* <div className="bg-slate-200 rounded-full border-[1px] border-slate-500 px-3 py-1 w-1/4 flex gap-4 items-center justify-center text-slate-600">
            <div className="w-[5%] text-xl"><IoIosSearch /></div>
            <div className="w-[95%] ">Search</div>
          </div> */}
          <div className="flex items-center gap-3 pr-10 max-sm:pr-1">
            <div className="">
              <button
                className="w-32 max-sm:w-24 h-auto p-2 font-semibold  rounded-xl  max-sm:hidden text-indigo-700  hover:bg-indigo-100 border-[1px] border-indigo-700 cursor-pointer"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
            </div>
            <div className="">
              <button
                className="w-32 h-auto p-2  font-semibold rounded-xl text-indigo-700  hover:bg-indigo-100 border-[1px] border-indigo-700 cursor-pointer"
                onClick={handleSignInClick}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
