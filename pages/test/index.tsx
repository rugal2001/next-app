import { useRouter } from "next/router";
import Header from "../../layouts/main-layout/header";

import { useEffect } from "react";
import MainL from "../../layouts/main-layout/index";

////////////////////////////////////////////////////////
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/action-popup";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

import { useState } from "react";
import { Portal, Modal } from "@mantine/core";
////////////////////////////////////////////////////////

function test() {
  const [opened, setOpened] = useState(false);

  console.log("this is opened => ",opened)
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      {opened && (
        <Modal opened={true} onClose={()=>{setOpened(false)}}>
          <div>this is my modal content</div>
        </Modal>
      )}

      <div className="text-white bg-gray-700 cursor-pointer" onClick={() => setOpened(true)}>
        Open modal
      </div>
    </main>
  );
}
test.getLayout = function getLayout(test) {
  const router = useRouter();

  useEffect(() => {
    const token = process.browser && localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <>
      <Header />

      <div className="flex justify-between w-full h-screen bg-gray-200">
        <MainL>{test}</MainL>
      </div>
    </>
  );
};

export default test;
