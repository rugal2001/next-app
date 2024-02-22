import { useRouter } from "next/router";
import { GrResources } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { MdComment, MdTextSnippet } from "react-icons/md";

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
          router.push("/comments");
        }}
      >
        <MdComment />
        Comments
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
  return <h1>Footer</h1>;
}
