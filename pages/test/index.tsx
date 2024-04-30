import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/posts-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";

import { useEffect, useState } from "react";

import Main from "../../layouts/main-layout";
import AuthLayout from "../../layouts/auth-layout";
import { Avatar, Loader, Modal, Skeleton } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { useDisclosure } from "@mantine/hooks";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import EventListener from "@/components/event-listener";
import { toast } from "react-toastify";
import httpClientReq from "@/lib/http-client-req";
import { CiImageOn } from "react-icons/ci";

const PAGE_SIZE = 4;


function Home() {
  
  




  const router = useRouter();
  const [currentPage , setCurrentPage] = useState();
  const { data: posts,isLoading, error } = useSWR(
    `http://localhost:4000/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
    fetcher
  );
  if(isLoading){
    return <Loader/>
  }
  if(isLoading){
    return <div className="">Error in importing posts !!</div>
  }

  

  

  return (
    <>
      <section className="grid justify-center w-full text-black body-font">
        <div className="p-4 bg-white max-sm:max-w-sm lg:max-w-screen-lg">
          <div className="flex flex-col items-center gap-12">
            {posts.data.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onClick={() => router.push(`/posts/${post._id}`)}
                onUpdate={undefined}
              />
            ))}

            {/* <div ></div>
            <Skeleton
              hidden={isEndOfList}
              height={420}
              width={480}
              radius="md"
              className="mb-2"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}

Home.GetLayout = function GetLayout(Page) {
  return (
    <AuthLayout>
      <Main>{Page}</Main>
    </AuthLayout>
  );
};

export default Home;
