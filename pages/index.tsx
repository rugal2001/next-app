import { useRouter } from "next/router";

export default function Hello() {
  const router = useRouter();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="p-4 mb-6 md:w-1/2 md:mb-0">
            <h1 className="mb-4 text-4xl font-bold text-gray-900" >Welcome</h1>
            <p>Welcome to my humble first home page i have made 😅</p>
          </div>
          <div className="w-1/2 p-4 sm:w-1/4">
            <h2 className="mb-8 text-3xl font-medium text-gray-900 title-font">Comments</h2>
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
          <h2 className="mb-8 text-3xl font-medium text-gray-900 title-font">Posts</h2>
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

/**<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900"><button
        onClick={() => {
          console.log("the event onclick is working");
          router.push("/comments/");
        }}
      >
        Comments
      </button></h2>
        <p class="leading-relaxed">Users</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">1.8K</h2>
        <p class="leading-relaxed">Subscribes</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900"><button
        onClick={() => {
          console.log("the event onClick is working in posts");
          router.push("/posts/");
        }}
      >
        Posts
      </button></h2>
        
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">4</h2>
        <p class="leading-relaxed">Products</p>
      </div>
    </div>
  </div>
</section> */
