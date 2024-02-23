import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import PostCard from "../../../components/posts-card";
import Layout from "../../../layouts/one-post-layout";
import CommentCard from "../../../components/comment-card";
import { FaRegComment } from "react-icons/fa";

const Home = () => {
  const router = useRouter();
  const { postId } = router.query;
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading posts</div>;
  if (!posts) return <div>there is no such a post</div>;

  const selectedPost = posts.find(
    (post) => post.id === parseInt(postId as string)
  );
  console.log("this is the seleceted post " + selectedPost);
  return (
    <div className="grid w-auto grid-cols-1">
           <Layout>
        <div className="container p-4 mx-auto">
          <div className="mt-10 cursor-pointer">
            {selectedPost && (
              <PostCard key={selectedPost.id} post={selectedPost} />
            )}
            <div className="flex items-center justify-end gap-3 ml-24">
              { <FaRegComment className="w-5 text-gray-600 h-7 hover:shadow-sm " /> } Comment
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Home;
