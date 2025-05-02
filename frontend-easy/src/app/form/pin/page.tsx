"use client";

import Pin from "@/app/components/form/Pin";
import Navbar from "@/app/components/Navbar";
import { FC } from "react";

const Page: FC = () => {
  return (
    <>
      <Navbar />
      <Pin />
    </>
  );
};

export default Page;
