import fetcher from "../../lib/fetcher";

import Main from "../../layouts/main-layout";
import AuthLayout from "../../layouts/auth-layout";
import { Loader, Skeleton } from "@mantine/core";
import useSWRInfinite from "swr/infinite";
import router from "next/router";
import PostCard from "@/components/posts-card";

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  if (pageIndex === 0) {
    console.log("hello");
  }
  console.log({ pageIndex });
  return `/posts?_page=${pageIndex}&_limit=4`;
};
function Home() {
  const {
    data: paginatedPosts,
    size,
    isLoading,
    setSize,
  } = useSWRInfinite(getKey, fetcher, { parallel: true });

  if (isLoading) {
    return (
      <div>
        <Loader color="red" />
      </div>
    );
  }

  // let totalPosts = 0;
  // for (let i = 0; i < paginatedPosts.length; i++) {
  //   totalPosts += paginatedPosts[i].data.length;
  // }
  console.log({ size, paginatedPosts });

  return (
    <div>
      <div className="grid gap-12 mt-6">
        {paginatedPosts.map((posts, index) => {
          {
            console.log({ posts });
          }
          // `data` is an array of each page's API response.
          return posts.data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClick={() => router.push(`/posts/${post._id}`)}
              onUpdate={undefined}
            />
          ));
        })}
      </div>

      {/* <button onClick={() => setSize(size + 1)}>Load More</button> */}
      <button
        className="grid justify-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl"
        onClick={() => {
          setSize(size + 1);
        }}
      >
        Load More
      </button>
    </div>
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
