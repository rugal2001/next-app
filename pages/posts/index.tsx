import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/posts-card";

import { useEffect, useState } from "react";
import PaginationL from "../../components/pagination-bar";

import Header from "../../layouts/main-layout/header";
import Main from "../../layouts/main-layout";
import AuthLayout from "../../layouts/auth-layout";
import { Loader } from "@mantine/core";

const PAGE_SIZE = 10;

function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: posts,
    error,
    isLoading,
    mutate: mutatePosts,
  } = useSWR(
    `http://localhost:4000/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
    fetcher
  );

  if (isLoading) return <div className="grid justify-center mt-80"><Loader color="blue" />;</div>;
  if (error) return <div>Error Loading Posts</div>;
  if (!posts) return <div>There are no posts</div>;

 

  // const totalCount = posts.length;
  // const totalPages = totalCount;
  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prev) => prev - 1);
  //   }
  // };

  const reversedPosts = [...posts.data].reverse();
  return (
    <section className="grid justify-center w-full text-black body-font">
      <div className="p-4 bg-white max-sm:max-w-sm lg:max-w-screen-lg">
        <div className="flex flex-col items-center gap-12 ">
          {reversedPosts.map((post) => (
            <PostCard
              onUpdate={() => mutatePosts()}
              key={post._id}
              post={post}
              onClick={() => {
                router.push(`/posts/${post._id}`);
              }}
            />
          ))}
        </div>
        {/* <PaginationL
          Map={posts}
          current={currentPage}
          pageSize={PAGE_SIZE}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        ></PaginationL> */}
      </div>
    </section>
  );
}

Home.GetLayout = function GetLayout(Page) {
  return (
    <AuthLayout>
      <Main>{Page}</Main>
    </AuthLayout>
  );
};

export default Home;
