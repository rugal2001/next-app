import { useRouter } from "next/router";
import { AuthHeader } from "../../layouts/main-layout/auth-header";

function Auth() {
  const router = useRouter();
  return (
    <>
      <div className="h-screen -mt-16 monospace">
        {/* <div className="text-white">h</div> */}
        <div className="flex justify-center mt-40 text-center text-slate-700">
          <div className="flex flex-col items-center justify-center gap-10 ">
            <div className="max-sm:text-4xl max-sm:w-[80%] text-6xl font-semibold text-center w-[60%]">Welcome to your New Social App</div>
          <div className="lg:text-xl md:text-xl sm:xl w-[80%] md:w-[60%] font-semibold p-8 rounded-2xl border-[1px] border-slate-300 ">
            <span className="gradientText">Connect</span>,{" "}
            <span className="gradientText">Share</span>, and{" "}
            <span className="gradientText">Explore</span>: Join our vibrant
            online community, where every connection is an opportunity to
            discover something new. Welcome to World, where friendships flourish
            and stories unfold!
          </div>

          <div className="h-auto p-2 font-semibold text-green-800 rounded-full w-44 bg-lime-50 border-[1px] border-green-800 cursor-pointer hover:bg-lime-100" onClick={()=>{router.push('/auth/sign-in')}}>Try For Free</div>
          </div>
        </div>
      </div>
    </>
  );
}

Auth.GetLayout = function GetLayout(Auth) {
  return (
    <>
      <AuthHeader />

      {Auth}
    </>
  );
};

export default Auth;
