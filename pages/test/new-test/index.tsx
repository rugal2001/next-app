import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import PostCard from "../../../components/posts-card";
import { useEffect, useState } from "react";
import Main from "../../../layouts/main-layout";
import AuthLayout from "../../../layouts/auth-layout";
import { Text } from "@mantine/core";
import React from "react";
import { Loader, Skeleton } from "@mantine/core";
import { useInView } from "react-intersection-observer";

const PAGE_SIZE = 4;

function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [posts, setPosts] = useState({ data: [] });

  const { data: newPosts, error } = useSWR(
    `http://localhost:4000/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
    fetcher
  );

  const { ref: loadMoreRef } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && !isEndOfList) {
        handleLoadMore();
      }
    },
  });

  useEffect(() => {
    if (newPosts && !error) {
      setPosts((prevPosts) => ({
        data: [...prevPosts.data, ...newPosts.data],
      }));
      setIsFetching(false);
    }
  }, [newPosts, error]);

  const handleLoadMore = () => {
    if (newPosts) {
      if (newPosts.data.length > 0) {
        setCurrentPage((prevPage) => prevPage + 1);
        setIsFetching(true);
      } else {
        setIsFetching(false);
        setIsEndOfList(true);
      }
    }
  };

  return (
    <section className="grid justify-center w-full text-black body-font">
      <div className="p-4 bg-white max-sm:max-w-sm lg:max-w-screen-lg">
        <div className="flex flex-col items-center gap-12">
          {posts.data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClick={() => router.push(`/posts/${post._id}`)}
              onUpdate={undefined}
            />
          ))}

          <div ref={loadMoreRef}></div>
          <Skeleton
            hidden={isEndOfList}
            height={420}
            width={480}
            radius="md"
            className="mb-2"
          />
        </div>
      </div>
      {/* {isFetching && <Loader color="blue" />} */}
      {/* {isEndOfList && <Text className="text-center">End of posts</Text>} */}
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
