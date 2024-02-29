import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import PostCard from "../../../components/posts-card";
import CommentCard from "../../../components/comment-card";
import { FaRegComment } from "react-icons/fa";
import Demo from "../../../layouts/Header";
import Header from "../../../layouts/Header";
import Main from "../../../layouts/Main";
import { AppShell, Burger, Avatar } from "@mantine/core";
const Home = () => {
  const router = useRouter();
  const { postId } = router.query;
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("http://localhost:4000/posts/:id", fetcher);
  console.log('this is posts ' , posts)
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading posts</div>;
  if (!posts) return <div>there is no such a post</div>;

  console.log("posts:", posts);
  console.log("typeof posts:", typeof posts);
  const Post= posts.data
 
  
  return (
    <div className="grid w-auto grid-cols-1">
      <div className="container py-2 mx-auto px-60">
        <div className="cursor-pointer">
          
            <PostCard
              key={selectedPost.id}
              post={selectedPost}
              onClick={() => {
                router.push("/posts");
              }}
            />
          )
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(Home) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="grid items-center w-full h-full bg-gray-200">
          <Main>{Home}</Main>
        </div>
      </div>
    </>
  );
};

export default Home;
