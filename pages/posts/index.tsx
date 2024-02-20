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
    <section className="text-gray-600 body-font">
    <div className="flex flex-wrap p-4 m-2">
      <h2 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">Les Derniere Posts</h2>
      <div className="grid gap-4 bg-clip-content lg:grid-cols-2">
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
    </section>
  );
};
export default Home;
