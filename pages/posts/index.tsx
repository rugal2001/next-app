import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/posts-card";
import Layout from "../../layouts/main-layout";
import { useState } from "react";
import PaginationL from "../../components/pagination-bar";

const PAGE_SIZE = 10;

const Home = () => {
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
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="flex flex-wrap justify-center p-4 m-2">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Les Derniere Posts
          </h2>
          <div className="grid gap-4 bg-clip-content lg:grid-cols-2">
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
      </section>
      <PaginationL
        Map={posts}
        current={currentPage}
        pageSize={PAGE_SIZE}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        
      ></PaginationL>
    </Layout>
  );
};

export default Home;
