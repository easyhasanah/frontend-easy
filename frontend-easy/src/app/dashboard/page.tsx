import { FC } from "react";
import Navbar from "@/app/components/Navbar";
import Dashboard from "@/app/components/dashboard/Dashboard";
import Cardgold from "@/app/components/card/Cardgold";
import Cardplatinum from "../components/card/Cardplatinum";

const Page: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <Dashboard></Dashboard>
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center gap-6 px-4 py-8">
        <Cardgold></Cardgold>
        <Cardplatinum></Cardplatinum>
      </div>
    </>
  );
};

export default Page;
