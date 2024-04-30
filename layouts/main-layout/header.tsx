import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { MdHome } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious, GrResources } from "react-icons/gr";
import { Avatar } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { useEffect, useState } from "react";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import UserDropDownMenu from "@/components/user-drop-down";
import { VscDiffAdded } from "react-icons/vsc";
import { useDisclosure } from "@mantine/hooks";
import httpClientReq from "@/lib/http-client-req";
import EventListener from "@/components/event-listener";
import { CiImageOn } from "react-icons/ci";

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
// const Demo2 = async ({ children }) => {
//   return (
//     <AppShell
//       header={{
//         height: 100,
//       }}
//     >
//       {/* <AppShell.Header className="grid items-center justify-center grid-cols-2 text-red-600 bg-blue-600 border border-b-8 border-black"> */}
//       <AppShell.Header className="grid items-center justify-center grid-cols-2 text-gray-800 ">
//         <div className="ml-10">
//           <div>Header</div>
//         </div>
//         <div className="flex justify-end gap-16 mr-10 text-xl font-bold">
//           <div>Home</div>
//           <div>Posts</div>
//           <div>Comment</div>
//           <div>About</div>
//         </div>
//       </AppShell.Header>
//       <AppShell.Main>
//         <div>Main</div>
//       </AppShell.Main>
//     </AppShell>
//   );
// };
enum EventTypes {
  PostCreated = "post_created",
  PostUpdated = "post_updated",
  CommentCreated = "comment_created",
  CommentUpdated = "comment_updated",
  CommentDeleted = "comment_deleted",
}

const Header = ({ hideAddButton = false }) => {


  const [step,setStep] = useState(1);
  const {
    data: myData,
    isLoading: meLoading,
    error: meError,
  } = useSWR("/me", fetcher);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [big, setBig] = useState<boolean>(false);
  const [
    openAddedPostModal,
    { open: openAddPostModal, close: closeAddPostModal },
  ] = useDisclosure(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [posts, setPosts] = useState({ data: [] });
  const notify = () => toast("Wow so easy!");

  // const { data: newPosts, error } = useSWR(
  //   `http://localhost:4000/posts?_page=${currentPage}&_limit=${PAGE_SIZE}`,
  //   fetcher
  // );

  const [name, setName] = useState(myData?.firstName + " " + myData?.lastName);
  const [contenue, setContenue] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://assets-fr.imgfoot.com/media/cache/1200x1200/jude-bellingham-2223-64898177471ef.jpg"
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
      setStep(2);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      toast.loading("Creating post...");
      const insertedData = {
        numberOfComments: 0,
        name: " ",
        image,
        contenue,
        user: myData._id,
      };
      const response = await httpClientReq.post("/posts", insertedData);

      console.log("response.data => ", response.data.data);
      EventListener(EventTypes.PostCreated, myData, response.data.data, "");

      toast.update("Post created successfully!", {
        type: "success",
        isLoading: false,
        position: "bottom-right",
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  // const { data, isLoading, error } = useSWR("/me", fetcher);
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    router.push(link);
  };
  return (
    <header className="sticky top-0 z-10 w-full h-full py-3 font-semibold text-gray-700 bg-white border-l-8 border-blue-600 shadow-md">
      <div className="flex items-center justify-between mx-3">
        <nav className="w-[30%] grid justify-start ml-5  ">
          <div className="">
            <ul className="flex items-center justify-center text-sm gap-11">
              <li>
                <div
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <MdHome />
                    </div>
                    <div className="">Home</div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/posts" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/posts")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <MdLibraryBooks />
                    </div>
                    <div className="">Posts</div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/comments" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/test")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <FaCommentDots />
                    </div>
                    <div className="">Comments</div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center justify-center cursor-pointer hover:text-blue-600 ${
                    activeLink === "/about" ? "text-blue-600" : ""
                  }`}
                  onClick={() => handleLinkClick("/about")}
                >
                  <div className="grid items-center">
                    <div className="flex text-xl justify-evenly">
                      <GrResources />
                    </div>
                    <div className="">About</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex items-center justify-end gap-3 text-sm font-bold  w-[30%]">
          {hideAddButton === false ? (
            <div className="">
              <button
                className="px-4 py-2 text-white transition duration-200 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 focus:ring-2 focus:ring-blue-400 hover:shadow-xl"
                style={{ borderRadius: "14px" }}
                onClick={() => {
                  // router.push("/posts/addPost");
                  setIsOpen(true);
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="text-xl">
                    <VscDiffAdded />
                  </div>
                  <div className="">Add post</div>
                </div>
              </button>

              <Dialog
              
                open={isOpen}
                onOpenChange={(open) => {
                  if (open === false) {
                    setIsOpen(false);
                    setBig(false);
                    setStep(1)
                  }
                }}
                
              >
                <DialogContent
                  className={` md:max-w-[95%] ${
                    big ? "lg:max-w-[70%]" : "lg:max-w-[600px]"
                  } p-0 max-h-[90%] sm:rounded-[1px] border-0 lg:rounded-lg overflow-hidden`}
                  withCloseButton={false}
                >
                  <div className="flex items-center justify-between w-full px-3 text-slate-900 border-b-[1px] border-slate-300">
                    <div className="text-lg cursor-pointer">
                      {step > 1 && (
                        <GrLinkPrevious
                          onClick={() => {
                            setStep(step - 1);

                            if (step === 3) {
                              setBig(false);
                            }
                          }}
                        />
                      )}
                    </div>

                    <div className="p-2 text-sm font-semibold text-center">
                      Create a new post
                    </div>
                    {!big && step !== 1 ? (
                      <div className="text-lg cursor-pointer ">
                        <GrLinkNext
                          onClick={() => {
                            if (step === 2) {
                              setBig(true);
                            }
                            setStep(step + 1);
                          }}
                        />
                      </div>
                    ) : !big ? (
                      <div></div>
                    ) : null}
                    {big && (
                      <>
                      <div
                        className="text-sm font-semibold text-blue-600 cursor-pointer"
                        onClick={() => {
                          handleSubmit();
                          notify();
                        }}
                      >
                        Share
                      </div>
                      {/* <ToastContainer /> */}
                      
                      </>
                    )}
                  </div>
                  {step === 1 && (
                    <div className="flex overflow-hidden">
                      <div className="w-[600px] h-[600px] shrink-0 bg-white rounded-lg flex flex-col justify-center items-center gap-3">
                        <div className="text-9xl">
                          <CiImageOn />
                        </div>
                        <div className="mb-3 text-2xl">Drag photos</div>
                        <div
                          className=""
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <div className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600">
                            Select on computer
                          </div>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                            
                          />
                        </div>
                        <ToastContainer />
                      </div>

                      <div className={` flex-grow ${big ? "flex" : "hidden"} shrink-0`}>
                        {big && (
                          <div className="w-full p-2 ">
                            <div className="flex items-center gap-3 p-6">
                              <div className="">
                                <Avatar src={myData.image} />
                              </div>
                              <div className="text-sm">
                                {myData.firstName} {myData.lastName}
                              </div>
                            </div>
                            <div className="w-full p-2 ">
                              <textarea
                                name=""
                                id=""
                                cols={30}
                                rows={8}
                                className="w-full px-3 py-1"
                                placeholder="Add a legend..."
                                style={{ outline: "none" }}
                                value={contenue}
                                onChange={(e) => setContenue(e.target.value)}
                              ></textarea>
                            </div>
                            {/* <div
                          className="flex items-center gap-3 cursor-pointer w-[50%]"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
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
                        </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex overflow-hidden">
                      <div className="w-[600px] h-[600px] shrink-0">
                        <img
                          // {previewImage}
                          // src="https://assets-fr.imgfoot.com/media/cache/1200x1200/jude-bellingham-2223-64898177471ef.jpg"
                          src={previewImage}
                          alt=""
                          className={`object-cover rounded-b-lg w-[600px] h-[600px]`}
                        />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <div className={` flex-grow ${big ? "flex" : "hidden"} shrink-0`}>
                        {big && (
                          <>
                            <div className="w-[600px] h-[600px] shrink-0">
                              <img
                                // {previewImage}
                                // src="https://assets-fr.imgfoot.com/media/cache/1200x1200/jude-bellingham-2223-64898177471ef.jpg"
                                src={previewImage}
                                alt=""
                                className={`object-cover rounded-b-lg w-[600px] h-[600px]`}
                              />
                            </div>
                            <div className="w-full p-2 ">
                              <div className="flex items-center gap-3 p-6">
                                <div className="">
                                  <Avatar src={myData.image} />
                                </div>
                                <div className="text-sm font-semibold">
                                  {myData.firstName} {myData.lastName}
                                </div>
                              </div>
                              <div className="w-full p-2 ">
                                <textarea
                                  name=""
                                  id=""
                                  cols={30}
                                  rows={8}
                                  className="w-full px-3 py-1"
                                  placeholder="Add a legend..."
                                  style={{ outline: "none" }}
                                  value={contenue}
                                  onChange={(e) => setContenue(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          ) : null}
          <UserDropDownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
