"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../../layouts/main-layout/header";
import MainL from "../../layouts/main-layout";

import PostNewCard from "../../components/post-new-card"

function ThreeDCardDemo() {
  return (
    <>

    </>
  );
}

ThreeDCardDemo.getLayout = function getLayout(ThreeDCardDemo) {
  const router = useRouter();

  console.log();

  useEffect(() => {
    const token = process.browser && localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <>
      <Header />
      <PostNewCard onUpdate={undefined} post={undefined}/>
      <div className="flex justify-between w-full h-screen bg-gray-200">
        <MainL>{ThreeDCardDemo}</MainL>
      </div>
    </>
  );
};

export default ThreeDCardDemo;
