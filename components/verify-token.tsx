import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useRouter } from "next/router";
import { useEffect } from "react";

const VerifyToken = () => {
  const router = useRouter();
  const { data: verifiedToken, isLoading } = useSWR(
    `http://localhost:4000/test`,
    fetcher
  );

  const token = process.browser && localStorage.getItem("access_token");

  useEffect(() => {
    if (!isLoading) {
      if (!token || token !== verifiedToken?.data) {
        router.push("/auth");
      }
    }
  }, [router, token, verifiedToken, isLoading]);
  
  if (!verifiedToken) {
    return "there is an error in bringing the token";
  }
  return <>{}</>;
};
