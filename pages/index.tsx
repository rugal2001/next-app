import { BackgroundImage, Center, Text, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { ColorSchemeScript } from "@mantine/core";
import { Demo } from "../layouts/application-cantainer";

function nextHome() {
  return (
    <div>
      
      <Demo>
      <section className="flex justify-center mt-44 ">
          <div className="grid items-center justify-evenly gap-28">
            <div className="text-center text-black">
              <div className="mb-6 font-serif font-extrabold cursor-default text-7xl hover:text-gray-700">
                Welcome
              </div>
              <div className="text-3xl cursor-default hover:text-gray-700 ">
                Welcome to my first Home page
              </div>
            </div>
          </div>
        </section>
      </Demo>
    </div>
  );
}

export default nextHome;
