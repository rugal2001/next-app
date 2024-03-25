import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../layouts/main-layout/header";
import Main from "../../../layouts/main-layout";
import { CiImageOn } from "react-icons/ci";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import axios from "axios";
import AuthLayout from "@/layouts/auth-layout";

function Profile() {
  const router = useRouter();
  const { data, isLoading, error } = useSWR("/me", fetcher);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
  );

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setRole(data.role);
      setImage(data.image);
      // setPreviewImage(data.image);
    }
  }, [data]);

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
    console.log("image state after setting:", image);
  }, [image]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
        const uploadResponse = await axios.post(
          "http://localhost:4000/upload-img",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(
          "uploadResponse.data.filePath => ",
          uploadResponse.data.filePath
        );
        setImage(uploadResponse.data.filePath);
        console.log("image state after setting:", image);
      }

      await axios.put(
        `http://localhost:4000/user/${data?._id}`,
        {
          firstName,
          lastName,
          email,
          role,
          image: image || data.image,
          // image: "https://res.cloudinary.com/dbwjras14/image/upload/v1711367430/new-folder/zbxal0zoshbmzi5inuy0.png",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("User profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("this is image ====> ", image);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto ">
          <div
            className="grid p-1 bg-white rounded-md shadow-lg mb-7 w-72"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              className="object-cover object-center rounded w-6/6 "
              alt="hero"
              src={previewImage}
            ></img>
            <div className="flex p-2">
              <CiImageOn className="cursor-pointer w-7 h-7 text-lime-600" />
              <p className="ml-2 cursor-pointer">Upload</p>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex flex-col items-center w-full mb-16 text-center md:w-2/3">
            <div className="flex items-end justify-center w-full ">
              <div className="relative w-full mr-4 text-left ">
                <div className="grid w-full">
                  <div className="flex w-full gap-3">
                    <div className="w-full ">
                      <label className="text-sm leading-7 text-gray-600">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500"
                      ></input>
                    </div>
                    <div className="w-full ">
                      <label className="text-sm leading-7 text-gray-600">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500"
                      ></input>
                    </div>
                  </div>

                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <label className="text-sm leading-7 text-gray-600">
                        Email
                      </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500"
                      ></input>
                    </div>
                    <div className="">
                      <label className="text-sm leading-7 text-gray-600">
                        Role
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="inline-flex px-6 py-2 mt-3 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
              onClick={handleSubmit}
            >
              Modifier
            </button>
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
