"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../layouts/main-layout/new-header";
import MainL from "../../layouts/main-layout";
import Main from "../../layouts/main-layout";
import PostNewCard from "../../components/post-new-card";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
// import { NavigationMenuLayout } from "../../layouts/main-layout/new-header";
import AuthLayout from "@/layouts/auth-layout";
import CommentCard from "@/components/comment-card";

function Test() {
  
  const {
    data: postComments,
    isLoading: commentLoading,
    error: commentError,
    mutate: commentMutate,
  } = useSWR(`/posts/66054dd471fef2f371fee748/comments`, fetcher);

  
  return (
    <>
    <div className="mt-2 w-full flex justify-center">
      <div className="w-[50%]">
        {postComments?.data.map((comment) => {
                    console.log({ comment });
                    if (comment.parentComment === null) {
                      return (
                        <CommentCard
                          key={comment._id}
                          onUpdate={() => {
                            commentMutate();
                          } }
                          comment={comment} post={undefined}                          
                        />
                      );
                    }
                  })}
      </div>
    
      
      </div>
    </>
  )
}

Test.GetLayout = function GetLayout(Test) {
  return (
    <>
    <AuthLayout>
      <Header />
      {Test}
      {/* <Main>{Test}</Main> */}
    </AuthLayout>
    </>
  );
};

export default Test;
