import { authModalState } from "@/atoms/authModalAtom";
import React from "react";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const setauthModalState = useSetRecoilState(authModalState)
  const handleClick = (val)=>{
    setauthModalState((prev)=>({...prev, type: val}))
  }
  return (
    <div>
      <form className="space-y-6 px-6 pb-4">
        <h3 className="text-xl font-medium text-white">Sign in to Leetcode</h3>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Your Email
          </label>
          <input
            htmlFor="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium block mb-2">
            Your Password
          </label>
          <input
            htmlFor="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="*********"
          />
        </div>
        <button type='submit' className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">Login</button>
        <button onClick={()=>handleClick('reset')} className="flex w-full justify-end">
            <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">Forgot Password</a>
        </button>
        <div className="text-sm font-medium text-gray-500">
            Not Registered?{" "}
            <a onClick={()=> handleClick('signup')} href="#" className="text-blue-700 hover:underline">Create Account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
