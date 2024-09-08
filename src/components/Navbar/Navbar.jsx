import { authModalState } from "@/atoms/authModalAtom";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

const Navbar = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState(
      (prev) => ({ ...prev, isOpen: true })
    );
  };
  return (
    <div className="flex items-center justify-between sm:px12 px-2 md:px-24 shadow-lg">
      <Link href="/logo.png" className="flex items-center justify-center h-20">
        <img src="/logo.png" alt="leetcode" className="h-full" />
      </Link>
      <div className="flex items-center">
        <button
          onClick={handleClick}
          className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange cursor-pointer border-2 border-transparent trasnition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
