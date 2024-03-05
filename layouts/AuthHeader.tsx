import { useRouter } from "next/router";

export const AuthHeader = () => {
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 flex items-center w-full text-2xl bg-white shadow-md h-28">
        <div className="flex justify-between w-full">
          <div className="p-3 pl-12 font-bold">Next js</div>
          <div className="flex gap-3 pr-10">
            <div className="">
              <button
                className="w-40 h-16 p-3 text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  router.push("/auth/signIn");
                }}
              >
                SignIn
              </button>
            </div>
            <div className="">
              <button
                className="w-40 h-16 p-3 text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
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
