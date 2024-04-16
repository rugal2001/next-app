import { useRouter } from "next/router";
import Main from "../../layouts/main-layout";
import { useEffect } from "react";
import AuthLayout from "../../layouts/auth-layout";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Loader } from "@mantine/core";

function Home() {
    const {data:myData,isLoading:}
  const { data, isLoading, error } = useSWR("/activity/", fetcher);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div className="">Error in loading activities !!</div>;
  }
  console.log({data})

  return <>
  <div className="flex">
    <div className="bg-gray-200 w-[20%] h-screen rounded-b-md"><div className="w-2 h-screen bg-blue-600"></div></div>
    <div className="bg-white w-[80%] h-screen rounded-t-md">
        <div className="m-4 font-semibold text-gray-700 text-md">Activity</div>
        <div className="mx-4">
            {/* {data} */}
        </div>
        
    </div>
  </div>
  </>;
}
Home.GetLayout = function GetLayout(Home) {
  const router = useRouter();

  useEffect(() => {
    const token = process.browser && localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <>
      <AuthLayout>
        <Main>{Home}</Main>
      </AuthLayout>
    </>
  );
};

export default Home;
