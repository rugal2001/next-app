import Header from "@/layouts/main-layout/header";
import Main from "../../../layouts/main-layout";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import AuthLayout from "../../../layouts/auth-layout";
import httpClientReq from "@/lib/http-client-req";
import EventListener from "../../../components/event-listener";

enum EventTypes {
  PostCreated = 'post_created',
  PostUpdated = 'post_updated',
  CommentCreated = 'comment_created',
  CommentUpdated = 'comment_updated',
  CommentDeleted = 'comment_deleted',
}

function Home() {
  const { data, isLoading, error } = useSWR("/me", fetcher);
  const router = useRouter();
  const [name, setName] = useState(data?.firstName + " " + data?.lastName);
  const [contenue, setContenue] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
  );


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image instanceof File) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await httpClientReq.post("/upload-img", formData);
      setImage(response.data.filePath);
      console.log("=>", response.data.filePath);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const insertedData = {
        numberOfComments: 0,
        name: " ",
        image,
        contenue,
        user: data._id,
      };
      const response = await httpClientReq.post("/posts", insertedData);
      console.log('data =>',data)
      console.log('response.data => ',response.data.data)
      // EventListener(data,response.data.data,EventTypes.PostCreated,'');
      // router.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="flex justify-center w-[100%] bg-gray-300 h-screen">
      <div className="h-full w-[70%]">
        <div className="grid items-center justify-center gap-5 ">
          <div className="flex justify-center mt-4 text-5xl font-semibold">
            Add Post
          </div>
          <div className="w-[100%] flex justify-center  max-x-lg">
            <div className="p-2 mb-3 bg-white rounded-md w-96 max-x-lg ">
              <div className="w-full max-x-lg" style={{ background: "cover" }}>
                <img
                  src={previewImage}
                  alt="Uploaded"
                  className="w-full rounded-md"
                ></img>
              </div>

              <div className="">
                <div
                  className="flex items-center gap-3 cursor-pointer w-[50%]"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <div className="w-10 my-2">
                    <CiImageOn className="w-full h-full text-lime-600" />
                  </div>
                  <div className="w-full font-semibold text-black">
                    Upload Image
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex gap-5">
                  <textarea
                    className="w-[90%] h-12 px-3 rounded-lg"
                    placeholder="Dites quelque chose à propos de cette photo ..."
                    style={{ outline: "none", overflowY: "hidden" }}
                    rows={1}
                    value={contenue}
                    onChange={(e) => setContenue(e.target.value)}
                  ></textarea>

                  <div className="w-8">
                    <IoSend
                      name="submit"
                      className="w-full h-full text-blue-600 cursor-pointer"
                      onClick={() => {
                        handleSubmit();
                        
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.GetLayout = function GetLayout(Home) {
  return (
    <AuthLayout>
      {/* <Header hideAddButton={true} /> */}

      <Main>{Home}</Main>
    </AuthLayout>
  );
};

export default Home;
