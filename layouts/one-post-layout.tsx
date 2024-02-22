import router, { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { MdTextSnippet } from "react-icons/md";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function Navbar() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mx-20">
      <div
        className="flex items-center justify-center gap-2 btn"
        onClick={() => {
          router.push("/");
        }}
      >
        <IoHome />
        Home
      </div>
      <div
        className="flex items-center justify-center gap-2 btn"
        onClick={() => {
          router.push("/posts");
        }}
      >
        <MdTextSnippet />
        Posts
      </div>
      <a href="https://jsonplaceholder.typicode.com/" target="_blank">
        <div className="flex items-center justify-center gap-2 btn">
          <GrResources />
          Source
        </div>
      </a>
    </div>
  );
}

function Footer() {
  return <div>Footer</div>;
}
