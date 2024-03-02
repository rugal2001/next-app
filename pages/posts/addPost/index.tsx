import Header from "../../../layouts/Header";
import Main from "../../../layouts/Main";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";

function Home() {
  const [image, setImage] = useState(
    "https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
  );
  console.log("this is imagge ==============================> ", image);
  const [name, setName] = useState("ibrahim");
  const [contenue, setContenue] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      if (typeof reader.result === "string") {
        setImage(e.target.files[0]);
      } else {
        console.error("Failed to read image as string");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post("http://localhost:4000/upload-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }) //localhost:4000/upload-img
      .then((response) => {
        console.log(response.data);

        fetch("http://localhost:4000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            contenue: contenue,
            image: response.data,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.error("Error jjjjjjjjjjjjjjjj:", error);
      });
  };

  return (
    <div className="flex justify-center w-[80%] bg-gray-200 h-full ">
      <div className="h-full w-[50%]">
        <div className="grid items-center justify-center gap-5 ">
          <div className="flex justify-center mt-4 text-5xl font-semibold">
            Add Post
          </div>
          <div className="w-[100%] ">
            <div className="w-full p-2 mb-3 bg-white rounded-md ">
              <img
                src={image}
                alt="Uploaded"
                className="w-[100%] rounded-md"
              ></img>
              <div className="">
                <div
                  className="flex items-center gap-3 w-[30%] cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <div className="w-12 h-12 ">
                    <CiImageOn className="w-full h-full text-lime-500" />
                  </div>
                  <div className="font-bold">Upload Image</div>
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

Home.getLayout = function getLayout(Home) {
  return (
    <>
      <Header hideAddButton={true} />
      <div className="">
        <Main>{Home}</Main>
      </div>
    </>
  );
};

export default Home;
