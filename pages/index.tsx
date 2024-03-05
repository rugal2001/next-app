import { BackgroundImage, Center, Text, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { ColorSchemeScript } from "@mantine/core";
import { Layout } from "../layouts/application-cantainer";
import Header from "../layouts/Header";
import Main from "../layouts/Main";
import Left from "../layouts/LeftSide-layout";


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
  return (
    <>
      <Header />
      <div className="flex justify-between">
        <div className="">
          {/* <Left></Left> */}
        </div>
        <div className="w-full h-screen bg-gray-200">
          <Main>{Home}</Main>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home;
