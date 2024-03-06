import { useRouter } from "next/router";
import Header from "../layouts/Header";
import Main from "../layouts/Main";
import { useEffect } from "react";

function Home() {
  return (
    <div className="h-full font-sans text-center ">
      <div className="mt-56 font-serif cursor-default text-7xl hover:text-gray-700">
        Welcome
      </div>
      <div className="mt-10 font-sans text-xl cursor-default hover:text-gray-700">
        Welcome to my first home page i made !
      </div>
    </div>
  );
}
Home.getLayout = function getLayout(Home) {
  const router = useRouter();

  useEffect(()=>{
    const token = process.browser && localStorage.getItem("access_token");
    if (!token) {
      router.push('/auth');
      
    }

  },[router]);


  return (
    <>
      <Header />
      <div className="flex justify-between">
        <div className="">{/* <Left></Left> */}</div>
        <div className="w-full h-screen bg-gray-200">
          <Main>{Home}</Main>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home;
