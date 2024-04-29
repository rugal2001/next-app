import AuthLayout from "@/layouts/auth-layout";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/router";
import PostCard from "@/components/posts-card";
import { useState } from "react";
import { Loader } from "@mantine/core";

import {useInfiniteQuery} from '@tanstack/react-query';

import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 4;
function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(
    `http://localhost:4000/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
    fetcher
  );
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>There is an error !!</div>;
  }
  // const Page = () =>{
  //   const  { data:postsData,fetchNextPage,isFetchingNextPage} = useInfiniteQuery(['query'],
  //   async ({currentPage = 1})=>{
  //     const response = await fetchPost()
  //   }
  //   )
  // }
  return (
    <>
    
      
            {posts.data.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onClick={() => router.push(`/posts/${post._id}`)}
                onUpdate={undefined}
              />
            ))}

            {/* <div ref={loadMoreRef}></div>
            <Skeleton
              hidden={isEndOfList}
              height={420}
              width={480}
              radius="md"
              className="mb-2"
            /> */}
          
    </>
  );
}

Home.GetLayout = function GetLayout(Page) {
  return (
    <AuthLayout>
      {Page}
      {/* <Main>{Page}</Main> */}
    </AuthLayout>
  );
};

export default Home;
