import { FC } from "react";
import Navbar from "../../components/Navbar";
import FormAddressSuccess from "@/app/components/form/FormAddressSuccess";

const Page: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <FormAddressSuccess></FormAddressSuccess>
    </>
  );
};

export default Page;
