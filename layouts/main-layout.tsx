import { useRouter } from "next/router";
//import { HiMiniHomeModern } from "react-icons/hi2";

export default function Layout({ children }) {
  return (
    <>
      <WebNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
function WebNavbar() {
    const router = useRouter();
  return (
    <header className="text-gray-600 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <nav className="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="hover:text-gray-900">Fourth Link</a>
        </nav>
        <a className="flex items-center order-first mb-4 font-medium text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0">
        
          <span className="ml-3 text-xl">
            <button onClick={() => {router.push('/')}}
            className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded-lg focus:outline-none hover:bg-indigo-600"
            >Home</button>
          </span>
        </a>
        <div className="inline-flex ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
            <a href="https://jsonplaceholder.typicode.com/"><button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0" >
            Source
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button></a>
          
        </div>
      </div>
    </header>
  );
}
function Navbar() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded-lg focus:outline-none hover:bg-indigo-600 "
      >
        Home
      </button>
    </div>
  );
}

function Footer() {
  return <p className="text-gray-600">Footer</p>
  
}
/**<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 p-2 text-white bg-blue-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> */