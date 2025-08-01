//home page
import React from "react";
import LeftPanel from "@/app/components/home/leftPanel/LeftPanel";
import RightPanel from "@/app//components/home/rightPanel/RightPanel";
import Feed from "@/app/components/home/feed/Feed";

export default function Home() {
  return (
    <div className="flex flex-col gap-1 sm:grid sm:grid-cols-11 overflow-y-auto">

      <div className="hidden sm:block sm:col-span-3 md:col-span-3 lg:col-span-3">
        <LeftPanel />
      </div>

      <div className="sm:col-span-5 md:col-span-5 lg:col-span-5" >
        <Feed />
      </div>

      <div className="hidden sm:inline-block sm:col-span-3 md:col-span-4 lg:col-span-3 sm:top-[30px]">
        <RightPanel />
      </div>


    </div>
  );
}
