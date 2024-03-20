"use client";

import * as React from "react";

import { cn } from "../../utils/cn";


import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { Avatar } from "@mantine/core";

export function NavigationMenuLayout() {
  const router = useRouter();
  const { data, isLoading, error } = useSWR("/me", fetcher);
  return (
    <>
    <div className="sticky top-0 z-10 w-full h-20 bg-pink-500">
    <div className="flex items-center justify-between w-full h-full pl-3 bg-yellow-500">
      <div className="flex items-center gap-3">
        <div className=""><Avatar src={data?.image}  /></div>
        <div className="">{data?.firstName} {data?.lastName}</div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
    </div>
    </>
  );
};

