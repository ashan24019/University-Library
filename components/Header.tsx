"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full my-10 flex justify-between items-center gap-5">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40}/>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base font-medium cursor-pointer capitalize transition-colors",
              pathname === "/library" ? "text-[#F5E6D5]" : "text-[#D9B28B] hover:text-[#F5E6D5"
            )}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
