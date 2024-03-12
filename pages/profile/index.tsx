import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../layouts/main-layout/header";
import Main from "../../layouts/main-layout";
import { CiImageOn } from "react-icons/ci";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

function profile() {
  const { data, isLoading, error } = useSWR("/me", fetcher);

  const {
    data: postsData,
    error: postError,
    isValidating,
  } = useSWR(`http://localhost:4000/posts`, fetcher);
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [email, setEmail] = useState(data?.email);
  const [role, setRole] = useState(data?.role);
  const [image, setImage] = useState(
    data?.image
      ? data.image
      : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
  );
  const [image2, setImage2] = useState(
    data?.image
      ? data.image
      : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
  );

  const router = useRouter();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      if (typeof reader.result === "string") {
        setImage(e.target.files[0]);
        setImage2(reader.result);
        const imageOnBoard = reader.result;
        console.log("this is e.target.result[0] => ", e.target?.result[0]);
        console.log("imageOnBoard => ", imageOnBoard);
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
        console.log(
          "this is response data profile ligne 57 => ",
          response.data
        );

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
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
              src={data?.image}
            ></img>
          </div>

          <div className="grid gap-3">
            <div className="text-3xl font-bold text-black">
              <h1>
                {data?.firstName} {data?.lastName}
              </h1>
            </div>
            <div
              className="text-2xl font-semibold flex gap-2 bg-blue-600 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-500"
              onClick={() => {
                router.push("/profile/edit-profile");
              }}
            >
              <FiEdit className="w-8 h-8" /> Modifier Profile
            </div>
          </div>
          <div className="grid grid-cols-3 bg-white p-3 rounded-md mt-4 gap-2">
            <div className="h-80 w-80">
              <img src="https://i.le360.ma/le360sport/sites/default/files/styles/img_738_520/public/assets/images/2022/12-reda/whatsapp_image_2022-12-10_at_17.05.40.jpeg"></img>
            </div>
            <div className="h-80 w-80">
              <img src="https://imgresizer.eurosport.com/unsafe/725x408/filters:format(jpeg):focal(1196x583:1198x581)/origin-imgresizer.eurosport.com/2024/03/09/3926213-79757028-2560-1440.jpg"></img>
            </div>
            <div className="h-80 w-80">
              <img src="https://i.le360.ma/le360sport/sites/default/files/styles/img_738_520/public/assets/images/2024/03-reda/sans_titre-1_1.jpg"></img>
            </div>
            <div className="h-80 w-80">
              <img src="https://media.lesechos.com/api/v1/images/view/65828b1fa24b7145f61f483b/1280x720/01001156921778-web-tete.jpg"></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

profile.getLayout = function getLayout(profile) {
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
          <Main>{profile}</Main>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default profile;
