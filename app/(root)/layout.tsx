import Header from "@/components/Header";
import React,{ ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <Header/>
        <div className="mx-auto mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
