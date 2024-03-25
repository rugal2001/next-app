import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { Loader } from "@mantine/core";

export default function AuthLayout({ children }) {
  const router = useRouter();

  const {
    data: isAuthenticated,
    error,
    isLoading,
  } = useSWR(`http://localhost:4000/me`, fetcher);

  if (isLoading) {
    return <div className="grid justify-center mt-80"><Loader color="blue" />;</div>;
  }

  if (!isAuthenticated) {
    router.push("/auth");
    return null;
  }

  return children;
}
