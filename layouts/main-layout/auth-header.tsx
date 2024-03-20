import { useRouter } from "next/router";

export const AuthHeader = () => {
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 flex items-center w-full text-sm bg-white shadow-md h-auto p-3">
        <div className="flex justify-between w-full">
          <div className="p-3 pl-12 font-bold">Next js</div>
          <div className="flex gap-3 pr-10 items-center">
            <div className="">
              <button
             // className="p-2 text-blue-600 bg-white border-[1px] border-blue-600 rounded-lg cursor-pointer hover:text-white hover:bg-blue-600 w-[40%] text-sm text-center "
                className="w-32 h-auto p-2 text-green-500 border-[1px] border-green-500 rounded-md hover:bg-green-500 hover:text-white"
                onClick={() => {
                  router.push("/auth/signIn");
                }}
              >
                SignIn
              </button>
            </div>
            <div className="">
              <button
                className="w-32 h-auto p-2 text-blue-600 border-[1px] border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  router.push("/auth/logIn");
                }}
              >
                LogIn
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
