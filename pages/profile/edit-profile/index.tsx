import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../layouts/main-layout/header";
import Main from "../../../layouts/main-layout";
import { CiImageOn } from "react-icons/ci";
import useSWR from "swr";
import fetcher from "../../../lib/fetcher";
import axios from "axios";

function Profile() {
    const router = useRouter();
  const { data, isLoading, error } = useSWR("/me", fetcher);
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [email, setEmail] = useState(data?.email);
  const [role, setRole] = useState(data?.role);
  const [image, setImage] = useState(data?.image ? data.image : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg");
  const [image2, setImage2] = useState(data?.image ? data.image : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
   

    reader.onload = function () {
      if (typeof reader.result === "string") {
        setImage(e.target.files[0]);
        setImage2(reader.result);
        const imageOnBoard = reader.result;
        console.log("this is e.target.result[0] => ",e.target?.result[0])
        console.log("imageOnBoard => ",imageOnBoard)
      } else {
        console.error("Failed to read image as string");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    return reader.result;
  };

  // console.log("this is the id => ", data?._id);

  const handleSubmit = () => {
    const formData = new FormData();
    console.log("im in hundle submit in profile ligne 48 ");
    formData.append("image", image);
    axios
      .post("http://localhost:4000/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        fetch(`http://localhost:4000/user/${data?._id}`, {
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
          .then(()=>{router.push('/profile')})
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto ">
          <div
            className="grid p-1 bg-white rounded-md mb-7 w-72"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <img
              className="object-cover object-center rounded w-6/6 "
              alt="hero"
              src={image2}
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
                        id="hero-field"
                        name="hero-field"
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
                        id="hero-field"
                        name="hero-field"
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
                        id="hero-field"
                        name="hero-field"
                        value={data?.email}
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
                        id="hero-field"
                        name="hero-field"
                        value={data?.role}
                        // value={}
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
