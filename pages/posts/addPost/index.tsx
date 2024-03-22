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

function Home() {
  const { data, isLoading, error } = useSWR("/me", fetcher);
  const router = useRouter();
  console.log("this is data in add Post => ", data);
  const [name, setName] = useState(data?.firstName + " " + data?.lastName);
  const [contenue, setContenue] = useState("");
  const [image, setImage] = useState(
    "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
  );
  const [image2, setImage2] = useState(
    "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      if (typeof reader.result === "string") {
        setImage(e.target.files[0]);
        setImage2(reader.result);
        const imageOnBoard = reader.result;
      } else {
        console.error("Failed to read image as string");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    return reader.result;
  };

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
        fetch("http://localhost:4000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            name: name,
            contenue: contenue,
            image: response.data,
            user: data._id,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log("data ====> ", data))
          .then(() => router.push("/posts"))
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center w-[80%] bg-gray-200 h-full ">
      <div className="h-full w-[70%]">
        <div className="grid items-center justify-center gap-5 ">
          <div className="flex justify-center mt-4 text-5xl font-semibold">
            Add Post
          </div>
          <div className="w-[100%] flex justify-center  max-x-lg">
            <div className="w-[100%] p-2 mb-3 bg-white rounded-md max-x-lg ">
              <div className="w-full max-x-lg" style={{ background: "cover" }}>
                <img
                  src={image2}
                  alt="Uploaded"
                  className="w-full rounded-md"
                ></img>
              </div>

              <div className="">
                <div
                  className="flex items-center gap-3 cursor-pointer w-[50%]"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <div className="w-10 ">
                    <CiImageOn className="w-full h-full text-lime-600" />
                  </div>
                  <div className="w-full font-bold ">Upload Image</div>
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
                    className="w-[90%] h-auto px-3 rounded-b-lg"
                    placeholder="Dites quelque chose à propos de cette photo ..."
                    style={{ outline: "none", overflowY: "hidden" }}
                    rows={1}
                    value={contenue}
                    onChange={(e) => setContenue(e.target.value)}
                  ></textarea>

                  <div className="w-[5%]">
                    <IoSend
                      name="submit"
                      className="w-full h-full text-blue-600 cursor-pointer"
                      onClick={handleSubmit}
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
      <Header hideAddButton={true} />
      
        <Main>{Home}</Main>
      
    </AuthLayout>
  );
};

export default Home;
