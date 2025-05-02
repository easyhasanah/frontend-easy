import { FC } from "react";
import Navbar from "../../components/Navbar";
import FormFailed from "@/app/components/form/FormFailed";

const Page: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <FormFailed></FormFailed>
    </>
  );
};

export default Page;
