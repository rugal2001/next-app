import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import Header from "../../../layouts/main-layout/header";
import Main from "../../../layouts/main-layout";
import { Avatar } from "@mantine/core";
import CommentCard from "../../../components/comment-card";
import { useEffect, useState } from "react";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

function Post() {
  const router = useRouter();
  const { postId } = router.query; // Assuming the parameter name in the router is 'id'

  
    

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

  

  if (error) return <div>Error Loading Post</div>;
  if (!post) return <div>Post not found</div>;
  if (isValidating) return <div>Loading ...</div>;

  

  return (
    <>
    <div className="w-[60%] grid justify-center items-center mt-3">
      <div className="p-1 bg-white border border-gray-200 rounded-t-lg lg:w-full">
        <div className="flex items-center justify-between w-full gap-3 p-3 text-xl font-semibold bg-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <Avatar src="../image/9440461.jpg" alt="it's me" />
            {post.data.name}
          </div>

          <div className="flex items-center pr-2"><HiMiniEllipsisVertical className="text-3xl cursor-pointer" onClick={()=>{console.log("show the card")}}/></div>
        </div>
        <div className="flex w-full p-1 bg-gray-200 rounded-lg">
          <div className="flex justify-evenly">
            <div className=" w-[60%]">
              <img src={post.data.image} className="w-full rounded-l-lg"></img>
            </div>

            <div className="w-[40%] flex-grow p-3 bg-white rounded-r-lg">
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
    
    </>
  );
}

Post.getLayout = function getLayout(Home) {
  const router = useRouter();
  useEffect(() => {
    const token = process.browser && localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

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
