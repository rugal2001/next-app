import { useRouter } from "next/router";

export default function Hello() {
  const router = useRouter();
  return (
    <div>
      <h1>Welcome</h1>
      <button
        onClick={() => {
          console.log("the event onclick is working");
          router.push("/comments/");
        }}
      >
        Comments
      </button>
      <br></br>
      <button
        onClick={() => {
          console.log("the event onClick is working in posts");
          router.push("/postse/");
        }}
      >
        Posts
      </button>
    </div>
  );
}
