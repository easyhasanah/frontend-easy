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
      <div className="flex justify-around">
        <Cardgold></Cardgold>
        <Cardplatinum></Cardplatinum>
      </div>
    </>
  );
};

export default Page;
