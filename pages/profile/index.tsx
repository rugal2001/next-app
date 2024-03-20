import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../layouts/main-layout/header";
import Main from "../../layouts/main-layout";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import PostCard from "../../components/posts-card";

function Profile() {
  const { data: myData, isLoading: meLoading, error } = useSWR("/me", fetcher);
  
  const [firstName, setFirstName] = useState(myData?.firstName);
  const [lastName, setLastName] = useState(myData?.lastName);
  const [email, setEmail] = useState(myData?.email);
  const [role, setRole] = useState(myData?.role);
  const [image, setImage] = useState(
    myData?.image
    ? myData.image
    : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
    );
    const [image2, setImage2] = useState(
    myData?.image
      ? myData.image
      : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
  );

  const {
    data: posts,
    error: postError,
    isLoading,
    mutate: mutatePosts,
  } = useSWR(`http://localhost:4000/user/${myData?._id}/posts`, fetcher);
  if (isLoading) return <div>Loading ...</div>;
  if (postError) return <div>Error Loading Posts</div>;
  if (!posts) return <div>There are no posts</div>;
  
  const router = useRouter();

  const handleSubmit = () => {
    const formData = new FormData();
    
    formData.append("image", image);
    axios
      .post("http://localhost:4000/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log(
          "this is response data profile ligne 57 => ",
          response.data
        );

        fetch(`http://localhost:4000/user/${myData?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,

            role: role,
            image: response.data,
          }),
        })
          .then((response) => response.json())
          .then((response) => console.log("response data in 75", response.data))
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  const reversedPosts = [...posts.data].reverse();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
          <div
            className="grid p-1 bg-white rounded-full mb-7 w-72"
            // onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              className="object-cover object-center rounded-full w-6/6 "
              alt="hero"
              src={myData?.image}
            ></img>
          </div>

          <div className="grid gap-3">
            <div className="text-3xl font-bold text-black">
              <h1>
                {myData?.firstName} {myData?.lastName}
              </h1>
            </div>
            <div
              className="flex gap-2 p-2 text-2xl font-semibold text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500"
              onClick={() => {
                router.push("/profile/edit-profile");
              }}
            >
              <FiEdit className="w-8 h-8" /> Modifier Profile
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
      <div className="flex justify-between">
        <div className="">{/* <Left></Left> */}</div>
        <div className="w-full h-screen bg-gray-200">
          <Main>{Profile}</Main>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Profile;
