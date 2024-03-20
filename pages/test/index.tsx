"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../layouts/main-layout/header";
import MainL from "../../layouts/main-layout";
import Main from "../../layouts/main-layout";
import PostNewCard from "../../components/post-new-card";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { NavigationMenuLayout } from "../../layouts/main-layout/new-header";


function ThreeDCardDemo() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const {
    data: posts,
    error,
    isLoading,
    mutate: mutatePosts,
  } = useSWR(
    `http://localhost:4000/posts`,
    fetcher
  );

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error Loading Posts</div>;
  if (!posts) return <div>There are no posts</div>;

  const totalCount = posts.length;
  const totalPages = totalCount;
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const reversedPosts = [...posts.data].reverse();
  return (
    <>
      <section className="grid justify-center w-full text-black body-font">
        <div className="w-full p-4 bg-white max-sm:max-w-sm lg:max-w-screen-lg">
          <div className="flex flex-col items-center gap-8 ">
            {reversedPosts.map((post) => (
              <PostNewCard
                onUpdate={() => mutatePosts()}
                key={post._id}
                post={post}
                onClick={() => {
                  router.push(`/posts/${post._id}`);
                }}
              />
            ))}
          </div>
          
        </div>
      </section>
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
      <NavigationMenuLayout />
      <div className="">
        <Main>{ThreeDCardDemo}</Main>
       
      </div>
    </>
  );
};

export default ThreeDCardDemo;

