import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../layouts/main-layout/header";
import Main from "../../layouts/main-layout";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import PostCard from "../../components/posts-card";
import AuthLayout from "../../layouts/auth-layout";
import { Loader } from "@mantine/core";

function Profile() {
  const router = useRouter();
  const { data: myData, isLoading: meLoading, error } = useSWR("/me", fetcher);
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [image, setImage] = useState(
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
  );
  useEffect(()=>{
    if(!meLoading && myData){
      setFirstName(myData.firstName);
      setLastName(myData.lastName);
      setEmail(myData.email);
      setRole(myData.role);
      if(myData.image){
        setImage(myData.image);
      }
    }
  },[meLoading])

  const {
    data: posts,
    error: postError,
    isLoading,
    mutate: mutatePosts,
  } = useSWR(`http://localhost:4000/user/${myData?._id}/posts`, fetcher);
  if (isLoading) return <div className="grid justify-center mt-80"><Loader color="blue" />;</div>;
  if (postError) return <div>Error Loading Posts</div>;
  if (!posts) return <div>There are no posts</div>;


  const reversedPosts = [...posts.data].reverse();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
          <div
            className="grid w-56 p-1 bg-white rounded-full mb-7"
            // onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              className="object-cover object-center rounded-full shadow-lg w-6/6"
              alt="hero"
              src={myData.image || "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"}
            ></img>
          </div>

          <div className="grid gap-3">
            <div className="text-3xl font-bold text-black">
              <h1>
                {myData?.firstName} {myData?.lastName}
              </h1>
            </div>
            <div
              className="flex items-center justify-center gap-2 p-2 text-sm font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500"
              onClick={() => {
                router.push("/profile/edit-profile");
              }}
            >
              <FiEdit className="w-4 h-4" /> Modifier Profile
            </div>
          </div>
          <div className="grid grid-cols-3 p-3 mt-4 bg-white rounded-md">
            {reversedPosts.map((post) => (
              <PostCard
                onUpdate={() => mutatePosts()}
                key={post._id}
                post={post}
                onClick={() => {
                  router.push(`/posts/${post._id}`);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Profile.GetLayout = function GetLayout(Profile) {
  return (
    <>
      <AuthLayout>
        <Main>{Profile}</Main>
      </AuthLayout>
    </>
  );
};

export default Profile;
