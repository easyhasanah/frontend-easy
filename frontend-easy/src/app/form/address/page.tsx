import { FC } from "react";
import Navbar from "../../components/Navbar";
import FormAddress from "@/app/components/form/FormAddress";

const Page: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <FormAddress></FormAddress>
    </>
  );
};

export default Page;
