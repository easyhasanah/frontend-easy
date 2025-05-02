import { FC } from "react";
import Navbar from "../../components/Navbar";
import FormSuccess from "@/app/components/form/FormSuccess";

const Page: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <FormSuccess></FormSuccess>
    </>
  );
};

export default Page;
