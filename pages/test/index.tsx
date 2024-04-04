import Main from "../../layouts/main-layout";
import AuthLayout from "../../layouts/auth-layout";
import { Skeleton } from "@mantine/core";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

function Home() {
  return (
    <>
       <div className="">
        {/*<div className="flex items-center gap-3 bg-green-400">
          <div className="bg-blue-400 ">
            <Skeleton height={50}  circle mb="xl" />
          </div>
          <div className="w-full bg-lime-900">
            <Skeleton height={8} width={150} radius="xl" />
          </div>
        </div>

        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} my={6}  width="70%" radius="xl" /> */}
        <Skeleton visible={true} height={230} width={260} className="mb-2" />
          
        {/* </Skeleton> */}
      </div>
    </>
  );
}

Home.GetLayout = function GetLayout(Page) {
  return (
    <AuthLayout>
      <Main>{Page}</Main>
    </AuthLayout>
  );
};

export default Home;
