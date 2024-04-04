import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import httpClientReq from "../../../lib/http-client-req";
import useSWR from "swr";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetcher = (url: string) => httpClientReq(url).then((r) => r.data);

  const [token, setToken] = useState("");

  const router = useRouter();

  async function handleSubmitSignin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        setToken(accessToken);
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);

          router.push("/");
        }
      }
    } catch (error) {
      console.error({ message: "ERRROR" });
    }
  }

  // const handleLogin = async () => {
  //   console.log('im in Login function ')
  //   try {
  //     const insertedData = {
  //       email,
  //       password
  //     }
  //     const response = await httpClientReq.post("/login",insertedData);
  //     console.log({response});
  //     // router.push('/');
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-wrap items-center px-5 py-24 mx-auto">
          <div className="pr-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0">
            <h1 className="text-3xl font-medium text-gray-900 title-font">
              WELCOME TO FUTUR
            </h1>
            <p className="mt-4 leading-relaxed">
              Step into a world of seamless connections and endless
              possibilities. Join our community today to unlock exclusive
              features and connect with like-minded individuals. Your journey
              starts here. Sign in now and let the adventure begin!
            </p>
          </div>
          <div className="flex flex-col w-full p-8 mt-10 text-sm bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
            <form onSubmit={handleSubmitSignin}>
              <h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
                Log In
              </h2>

              <div className="relative mb-4">
                <label className="leading-7 text-gray-600 ">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-gray-600 ">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  onClick={() => {
                    router.push("/");
                  }}
                  className="px-8 py-2 text-sm text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
                >
                  Log In
                </button>
                <div
                  className="ml-3 cursor-pointer hover:underline hover:text-blue-600"
                  onClick={() => {
                    router.push("/auth/signIn");
                  }}
                >
                  I don t have account
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


export default LogIn;
