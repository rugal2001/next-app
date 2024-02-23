//import { Autocomplete, BackgroundImage } from "@mantine/core";
//import { BackgroundImage, Center, Text, Box } from '@mantine/core';
import { BackgroundImage, Center, Text, Box } from '@mantine/core';
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <section
      className="text-gray-600 body-font"
      style={{
        backgroundImage:
          "url('https://w0.peakpx.com/wallpaper/591/776/HD-wallpaper-simple-background-ultra-aero-colorful-blue-purple-background-colourful-simple-blurry.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="p-4 mb-6 md:w-1/2 md:mb-0">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Welcome</h1>
            <p>Welcome to my humble first home page i have made 😅</p>
          </div>
          <div className="w-1/2 p-4 sm:w-1/4">
            <h2 className="mb-8 text-3xl font-medium text-gray-900 title-font">
              Comments
            </h2>
            <h2 className="text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              <button
                onClick={() => {
                  console.log("the event onclick is working");
                  router.push("/comments/");
                }}
                className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded-lg focus:outline-none hover:bg-indigo-600"
              >
                Comments
              </button>
            </h2>
          </div>

          <div className="w-1/2 p-4 sm:w-1/4">
            <h2 className="mb-8 text-3xl font-medium text-gray-900 title-font">
              Posts
            </h2>
            <h2 className="text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              <button
                onClick={() => {
                  console.log("the event onClick is working in posts");
                  router.push("/posts/");
                }}
                className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded-lg focus:outline-none hover:bg-indigo-600"
              >
                Posts
              </button>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewHome() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center mt-44">
      <div className="grid grid-cols-3 justify-evenly gap-28">
        <div >
          <div className="text-3xl">Welcome</div>
          <div className="text-xl text-gray-600">Welcome to my first Home page</div>
        </div>
        <div className="flex justify-center col-span-2">
          <div className="btn" onClick={()=>{
            router.push("/comments/");
          }}>Comments</div>
          <div className="btn" onClick={()=>{
            router.push('/posts')
          }}>Posts</div>
        </div>
      </div>
    </section>
  );
}

function nHome(){
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
        radius="xs"
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}

export default NewHome;
