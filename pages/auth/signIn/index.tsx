import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  async function handleSubmitSignin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/auth/logIn");
      } else {
        console.log("this is a big mistake hhhh");
      }
    } catch (error) {
      console.error({message : 'ERRROR'})
    }
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-wrap items-center px-5 py-24 mx-auto">
          <div className="pr-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0">
            <h1 className="text-3xl font-medium text-gray-900 title-font">
              WELCOME to Futur
            </h1>
            <p className="mt-4 leading-relaxed">
              Step into a world of seamless connections and endless
              possibilities. Join our community today to unlock exclusive
              features and connect with like-minded individuals. Your journey
              starts here. Sign in now and let the adventure begin!
            </p>
          </div>
          <div className="flex flex-col w-full p-8 mt-10 text-xl bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
            <form onSubmit={handleSubmitSignin}>
              <h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
                Sign Up
              </h2>
              <div className="relative mb-4">
                <label className="leading-7 text-gray-600 ">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-gray-600 ">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
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
                <label className="leading-7 text-gray-600 ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-gray-600 ">Role</label>
                <input
                  type="role"
                  id="role"
                  name="role"
                  className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                ></input>
              </div>
              <p className="mt-3 mb-8 text-xs text-gray-500">
                Literally you probably haven t heard of them jean shorts.
              </p>
              <button
                type="submit"
                className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
