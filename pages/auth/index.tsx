import { useRouter } from "next/router";
import { AuthHeader } from "../../layouts/main-layout/auth-header";

function Auth() {
    const router = useRouter();
  return (
    <>
      <div className="flex w-full h-full font-serif justify-evenly ">
        <div className="mt-40 text-gray-800 ">
          <div className="text-5xl">WELCOME</div>
          <div className="flex w-full pt-5 pl-5 text-xl text-center">to our website plz <div className="pl-2 text-blue-600 cursor-pointer hover:underline" onClick={()=>{
            router.push('/auth/logIn');
          }}>Login</div></div>
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </>
  );
}

Auth.GetLayout = function GetLayout(Auth) {
  return (
    <>
      <AuthHeader />
      <div className="flex justify-between">
        <div className="">{/* <Left></Left> */}</div>
        <div className="w-full h-screen bg-gray-200">{Auth}</div>
        <div></div>
      </div>
    </>
  );
};

export default Auth;
