import Header from "../../../layouts/Header";
import Main from "../../../layouts/Main";
import { CiImageOn } from "react-icons/ci";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
function Home() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };
  return (
    <div className="grid justify-center w-[80%] bg-gray-200 h-full">
      <div className="h-full">
        <div className="grid items-center justify-center gap-5 ">
          <div className="flex justify-center mt-4 text-5xl font-semibold">
            Add Post
          </div>

          <div className="p-2 mb-3 bg-white rounded-md">
            <img
              src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg"
              className=""
            ></img>
            <div className="">
              <div className="flex items-center gap-3 ">
                <div className="w-12 h-12 ">
                  <CiImageOn className="w-full h-full text-lime-500" />
                </div>
                <div className="font-bold">Upload Image</div>
              </div>
              <div className="flex gap-5">
                <textarea
                  onChange={(e) => {
                    handleTextChange(e);
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  value={text}
                  className="w-[90%] h-auto px-3 rounded-b-lg"
                  placeholder="Dites quelque chose à propos de cette photo ..."
                  style={{ outline: "none", overflowY: "hidden" }}
                  rows={1}
                ></textarea>

                <div className="w-[5%] ">
                  <IoSend className="w-full h-full text-blue-600 cursor-pointer" />
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
