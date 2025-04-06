import Header from "@/components/Header";
import React,{ ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-blue-950 min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Header/>
        <div className="w-full mx-auto mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
