import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";

const Topbar = ({ problemPage }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const user = useAuthState(auth);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }));
  };
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className={`flex w-full items-center justify-between ${!problemPage?"max-w-[1200px] mx-auto":''}`}>
        <Link href="#" className="h-[22px] flex-1">
          <img src="/logo-full.png" alt="logo" className="h-full" />
        </Link>
        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>ProblemList</p>
            </Link>
            <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
              <FaChevronRight />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://mit-anuj-portfolio.vercel.app/"
              target="_blank"
              rel="norefferrer"
              className="bg-dark-fill-3 scroll-py-1.5 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {user && problemPage && <Timer/>}
          {!user[0] && (
            <Link href="/auth">
              <button
                className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded"
                onClick={handleClick}
              >
                Sign In
              </button>
            </Link>
          )}
          {user[0] && (
            <div className="cursor-pointer group relative">
              <img
                src="/avatar.png"
                alt="user profile img"
                className="h-8 w-8 rounded-full"
              />
              <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                <p className="text-sm">{user[0].email}</p>
              </div>
            </div>
          )}
          {user[0] && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
