import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/posts-card";
//import Layout from "../../layouts/main-layout";
import { useState } from "react";
import PaginationL from "../../components/pagination-bar";
//import { Demo } from "../../layouts/application-cantainer";
import Clayout from "../../layouts/Header";
import Header from "../../layouts/Header";
import Main from "../../layouts/Main";
import { AppShell, Burger, Avatar } from "@mantine/core";
const PAGE_SIZE = 10;

function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: posts,
    error,
    isValidating,
  } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
    fetcher
  );

  const isLoading = !posts && !error;

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
  return (
    <section className="text-black body-font ">
      <div className="p-4 bg-gray-200 max-sm:max-w-sm lg:max-w-screen-md">
        <h2 className="my-5 mb-4 text-2xl font-medium text-center text-gray-900 sm:text-3xl title-font">
          Les Derniere Posts
        </h2>

        <div className="flex flex-col items-center gap-4 ">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => {
                router.push(`/posts/${post.id}`);
              }}
            />
          ))}
        </div>
      </div>
      <PaginationL
        Map={posts}
        current={currentPage}
        pageSize={PAGE_SIZE}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      ></PaginationL>
    </section>
  );
}

Home.getLayout = function getLayout(Home) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className=""></div>
        <Main>{Home}</Main>
        <div></div>
      </div>
    </>
  );
};

export default Home;
