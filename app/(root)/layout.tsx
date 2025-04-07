import Header from "@/components/Header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col bg-gradient-to-b from-[#090C15] from-[8.11%] to-[#080B17] to-[100%] px-5 xs:px-10 md:px-16">
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <Header/>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;