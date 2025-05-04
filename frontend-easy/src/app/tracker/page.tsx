import { FC } from "react";
import Navbar from "@/app/components/Navbar";
import FormAddressSuccess from "@/app/components/form/FormAddressSuccess";
import Tracker from "../components/tracker/Tracker";

const Page: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <Tracker></Tracker>
    </>
  );
};

export default Page;
