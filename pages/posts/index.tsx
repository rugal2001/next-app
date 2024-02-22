import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/posts-card";
import Layout from "../../layouts/main-layout";
import Pagination from "../../layouts/pagination-bar";
import { useState } from "react";

const PAGE_SIZE = 10; // Number of posts per page

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
  console.log("next ==== " + totalCount);
  console.log("this is all posts ==> " + totalCount);
  const totalPages = totalCount;
  console.log("this is the total pages = " + totalCount / PAGE_SIZE);
  console.log(totalPages);
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
    <Pagination>
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
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 mr-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 focus:outline-none"
            >
              Previous
            </button>
            {currentPage}/{totalPages}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </Layout>
    </Pagination>
  );
};

export default Home;
