import { useRouter } from "next/router";
import { AuthHeader } from "../../layouts/main-layout/auth-header";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, Button, Modal } from "@mantine/core";
import { FormEvent, useState } from "react";
import httpClientReq from "@/lib/http-client-req";

function Auth() {
  const router = useRouter();
  

  const [signUpFirstName, setsignUpFirstName] = useState("");
  const [signUpLastName, setsignUpLastName] = useState("");
  const [signUpEmail, setsignUpEmail] = useState("");
  const [SignUpPassword, setSignUpPassword] = useState("");
  const [openedSignIn, { open: openSignIn, close: closeSignIn }] =
    useDisclosure(false);
  const [openedSignUp, { open: openSignUp, close: closeSignUp }] =
    useDisclosure(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetcher = (url: string) => httpClientReq(url).then((r) => r.data);

  const [token, setToken] = useState("");

  async function handleSubmitSignin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        const user = data.user; // Assuming you want user data

        setToken(accessToken);
        localStorage.setItem("access_token", accessToken);
      } else {
        // Handle login errors (e.g., display error message)
        
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  if (token) {
    router.push("/");
  }
  async function handleSubmitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: SignUpPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        closeSignUp();
        openSignIn();
      }
    } catch (error) {
      console.error({ message: "ERRROR", error });
    }
  }
  return (
    <>
      <Modal
        opened={openedSignIn}
        onClose={()=> {closeSignIn()
        
        }}
        withCloseButton={false}
        radius={"lg"}
        centered
        w={50}
      >
        <div className="flex flex-col items-center justify-center gap-3 mb-3">
          <Avatar
            src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
            size={"xl"}
          />
          <div className="text-lg font-semibold text-slate-700">Sign In</div>
        </div>
        <form onSubmit={handleSubmitSignin}>
          <div className="grid gap-3 text-sm">
            <label className="leading-7 text-slate-700 ">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label className="leading-7 text-slate-700 ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div
              className="cursor-pointer text-slate-700 hover:underline hover:text-blue-700"
              onClick={() => {
                closeSignIn();
                openSignUp();
              }}
            >
              I don t have account
            </div>
            <div className="grid w-full gap-3 mt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition duration-200 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-400 hover:shadow-xl"
                onClick={() => {}}
              >
                Sign In
              </button>
              <div
                className="inline-flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-black transition-colors bg-white rounded-md shadow-md cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-gray-100 h-9 border-[1px] border-slate-200"
                onClick={closeSignIn}
              >
                Cancel
              </div>
            </div>
              {/* <div className="flex items-center justify-center  text-" >Your email or password is incorrect !!</div> */}
          </div>
        </form>
      </Modal>

      {/* //////////////////////////////////////////////////////////////////// */}
      <Modal
        opened={openedSignUp}
        onClose={closeSignUp}
        withCloseButton={false}
        radius={"lg"}
        centered
      >
        <div className="flex flex-col items-center justify-center gap-3 mb-3">
          <Avatar
            src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
            size={"xl"}
          />

          <div className="text-lg font-semibold text-slate-700">Sign Up</div>
        </div>
        <form onSubmit={handleSubmitSignUp}>
          <div className="grid gap-3 text-sm">
            <label className="leading-7 text-gray-600 ">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={signUpFirstName}
              onChange={(e) => setsignUpFirstName(e.target.value)}
            ></input>
            <label className="leading-7 text-gray-600 ">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={signUpLastName}
              onChange={(e) => setsignUpLastName(e.target.value)}
            ></input>
            <label className="leading-7 text-gray-600 ">Email</label>
            <input
              type="signUpEmail"
              id="signUpEmail"
              name="signUpEmail"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={signUpEmail}
              onChange={(e) => setsignUpEmail(e.target.value)}
            ></input>
            <label className="leading-7 text-gray-600 ">Password</label>
            <input
              type="SignUpPassword"
              id="SignUpPassword"
              name="SignUpPassword"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={SignUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            ></input>
            <div
              className="cursor-pointer text-slate-700 hover:underline hover:text-blue-700"
              onClick={() => {
                closeSignUp();
                openSignIn();
              }}
            >
              I do have account
            </div>

            <div className="grid w-full gap-3 mt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition duration-200 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-400 hover:shadow-xl"
                onClick={() => {}}
              >
                Sign Up
              </button>
              <div
                className="inline-flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-black transition-colors bg-white rounded-md shadow-md cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-gray-100 h-9 border-[1px] border-slate-200"
                onClick={closeSignUp}
              >
                Cancel
              </div>
            </div>

            {/* /////// */}

            {/* /////// */}
          </div>
        </form>
      </Modal>
      {/* <header className="sticky flex items-center w-[97%] h-auto p-3 text-sm bg-white border-[1px] border-slate-300  top-5 left-6 rounded-xl monospace bg-opacity-80 backdrop-blur-sm"> */}
      <header className="sticky flex items-center w-[97%] h-auto p-3 text-sm bg-white border-[1px] border-slate-300  top-5 left-6 rounded-xl monospace bg-opacity-80 backdrop-blur-sm">
        <div className="flex justify-between w-full">
          <div className="flex items-center justify-center gap-3 font-extrabold text-slate-700">
            <div className="">
              <Avatar src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"></Avatar>
            </div>
            <div className="">Next js</div>
          </div>
          {/* <div className="bg-slate-200 rounded-full border-[1px] border-slate-500 px-3 py-1 w-1/4 flex gap-4 items-center justify-center text-slate-600">
            <div className="w-[5%] text-xl"><IoIosSearch /></div>
            <div className="w-[95%] ">Search</div>
          </div> */}
          <div className="flex items-center gap-6 max-sm:pr-1">
            <div className="w-[1px] h-8 bg-slate-300"></div>
            <div className="">
              <button
              
                className="px-4 py-2 transition duration-200 rounded-lg focus:ring-2 focus:ring-blue-400 hover:text-blue-500"
                onClick={openSignIn}
              >
                Sign in
              </button>
            </div>
            <div className="">
              <button
                className="px-4 py-2 text-white transition duration-200 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-400 hover:shadow-xl"
                onClick={openSignUp}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* <div className="flex w-full ">
      
        <img src="/image/security.jpg" alt="" className=" w-[45%]" />
        <div className="grid">
          <div className="mt-16 w-[55%]">Hello</div>
        </div>
      </div> */}

      <div className="h-screen -mt-16 monospace">
        <div className="text-white">h</div>
        <div className="flex justify-center mt-40 text-center text-slate-700">
          <div className="flex flex-col items-center justify-center gap-10 ">
            <div className="max-sm:text-4xl max-sm:w-[80%] text-6xl font-semibold text-center w-[60%]">
              <span className="gradientText">Connect</span>,{" "}
              <span className="gradientText">Share</span> and{" "}
              <span className="gradientText">Explore</span>
            </div>
            <div className="text-lg  w-[50%]  font-semibold p-8 rounded-2xl border-[1px] border-slate-300 ">
              Join our vibrant
              online community, where every connection is an opportunity to
              discover something new. Welcome to World, where friendships
              flourish and stories unfold!
            </div>

            <div
              className="h-auto p-2 font-semibold text-white rounded-lg cursor-pointer hover:shadow-lg w-44 hover:bg-blue-700 bg-gradient-to-b from-blue-500 to-blue-600"
              onClick={openSignUp}
            >
              Try For Free
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Auth.GetLayout = function GetLayout(Auth) {
  return (
    <>
      {/* <AuthHeader openSignIn={openSignIn} openSignUp={openSignUp} /> */}

      {Auth}
    </>
  );
};

export default Auth;
