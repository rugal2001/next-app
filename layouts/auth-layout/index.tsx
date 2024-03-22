import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function AuthLayout({ children }) {
  const router = useRouter();

  const {
    data: isAuthenticated,
    error,
    isLoading,
  } = useSWR(`http://localhost:4000/me`, fetcher);

  if (isLoading) {
    return <p className="">loading...</p>;
  }

  if (!isAuthenticated) {
    router.push("/auth");
    return null;
  }

  return children;
}
