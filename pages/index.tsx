import { BackgroundImage, Center, Text, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { ColorSchemeScript } from "@mantine/core";
import { Demo } from "../components/application-cantainer";

function NewHome() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center mt-44">
      <div className="grid grid-cols-3 justify-evenly gap-28">
        <div>
          <div className="text-3xl">Welcome</div>
          <div className="text-xl text-gray-600">
            Welcome to my first Home page
          </div>
        </div>
        <div className="flex justify-center col-span-2">
          <div
            className="btn"
            onClick={() => {
              router.push("/comments/");
            }}
          >
            Comments
          </div>
          <div
            className="btn"
            onClick={() => {
              router.push("/posts");
            }}
          >
            Posts
          </div>
        </div>
      </div>
    </section>
  );
}

function nextHome() {
  return <Demo></Demo>;
}

export default nextHome;
