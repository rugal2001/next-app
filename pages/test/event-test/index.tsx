import EventListener from "@/components/event-listener";
import AuthLayout from "@/layouts/auth-layout";
import Main from "@/layouts/main-layout";
import fetcher from "@/lib/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

function Home() {
//   const [start, setStart] = useState(false);
  const [submitTime] = useState(Date.now());
  const { data: myData, isLoading, error } = useSWR("/me", fetcher);
  
//   useEffect(() => {
//     if (start) {
      
    //   setStart(false);
//     }
//   }, [start, myData, submitTime]);

  return (
    <div>
      <button
        className="w-32 p-3 m-10 font-semibold text-white bg-blue-500 rounded-md"
        onClick={() => {
            EventListener(
                myData,
                "addPost",
                "a",
                "Add post with the id (651245456)",
                // "https://chat.openai.com/c/a23b267b-fd72-4ad1-b1d0-d92ef495ef86",
                // submitTime
              );
        }}
      >
        Start
      </button>
    </div>
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
