import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import Header from "../../../layouts/Header";
import Main from "../../../layouts/Main";
import { Avatar } from "@mantine/core";
import CommentCard from "../../../components/comment-card";

function Post() {
  const router = useRouter();
  const { postId } = router.query; // Assuming the parameter name in the router is 'id'

  console.log("postId from router:", postId);

  const {
    data: post,
    error,
    isValidating,
  } = useSWR(`http://localhost:4000/posts/${postId}`, fetcher);


  const {
    data: comments,
    
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/comments", fetcher);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading comments</div>;
  if (!comments) return <div>No Comments...</div>;



  console.log("Post data:", post);
  console.log("Error:", error);

  if (error) return <div>Error Loading Post</div>;
  if (!post) return <div>Post not found</div>;
  if (isValidating) return <div>Loading ...</div>;

  console.log("this is post name ===> ", post.data.name);
  console.log("this is post contenue ===> ", post.data.contenue);

  return (
    <div className="w-[60%] grid justify-center items-center mt-3">
      <div className="p-1 bg-white border border-gray-200 rounded-t-lg lg:w-auto">
        <div className="p-3 bg-white rounded-t-lg ">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <Avatar src="../image/9440461.jpg" alt="it's me" />
            {post.data.name}
          </div>
        </div>
        <div className="flex p-1 bg-gray-200 rounded-md">
          <div className="flex justify-evenly">
            <div className=" w-[60%]">
              <img src={post.data.image} className="rounded-l-lg w-96 h-96"></img>
            </div>

            <div className="w-[40%] p-3 bg-white rounded-r-lg">
              <h2 className="mb-2 text-lg font-medium sm:text-xl title-font">
                {post.data.name}
              </h2>
              <p className="mb-4 text-base leading-relaxed">
                {post.data.contenue}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-center w-auto gap-6 bg-gray-200 rounded-b-lg">
        <div className="flex flex-col w-full gap-5 mt-3 "> 
        {comments.map((comment) => (
          <CommentCard
            key={comment?.id}
            comment={comment}
            onClick={() => {
              router.push(`/comments/${comment.id}`); //equal to send redirect in java
            }}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(Home) {
  return (
    <>
      <Header />
      <div className="">
        <Main>{Home}</Main>
      </div>
    </>
  );
};

export default Post;
