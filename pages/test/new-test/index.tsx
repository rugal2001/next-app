import fetcher from "@/lib/fetcher";
import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Main from "@/layouts/main-layout";
import AuthLayout from "@/layouts/auth-layout";
import PostCard from "@/components/posts-card";
import useSWR from "swr";
import axios from "axios";
import { Loader } from "@mantine/core";

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(2);
    const loaderRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${index}0&limit=12`
      )
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data]);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?offset=10&limit=12"
        );
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

 

  console.log({ items });
  return (
    <>
      <div className="flex justify-center w-96">
        <div className="grid col-span-3 my-10">
          {items.map((item,index) => (
            <div className="shadow-xl rounded-xl p-3">
              <div className="grid gap-3">
                <div className="text-md font-semibold" key={item.id}>{item.title}</div>
                <div className="text-sm">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div ref={loaderRef}>{isLoading && <Loader />}</div>
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

