import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/posts-card";

const Home = () => {
  const router = useRouter();
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error Loading Posts</div>;
  if (!posts) return <div>there is no such post</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-4xl font-bold">Les Derniere Posts</h1>
      <div className="grid grid-cols-1 gap-20 bg-blue-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post?.id}
            post={post}
            onClick={() => {
              router.push(`/posts/${post.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
