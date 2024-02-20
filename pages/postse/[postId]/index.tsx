import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import PostCard from "../../../components/posts-card";

const Home = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: posts, error, isLoading } = useSWR("", fetcher);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading posts</div>;
  if (!posts) return <div>there is no such a post</div>;

  const selectedPost = posts.find((post) => post.id === parseInt(postId as string));
  return (
    <div className="container p-4 mx-auto">
      <div className="grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedPost && <PostCard key={selectedPost.id} post={selectedPost} />}
      </div>
    </div>
  );
};
export default Home;
