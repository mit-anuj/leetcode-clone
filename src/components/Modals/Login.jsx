import { authModalState } from "@/atoms/authModalAtom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

const Login = () => {
  const setauthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChangeInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!user) return;
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);
  const handleClick = (val) => {
    setauthModalState((prev) => ({ ...prev, type: val }));
  };
  return (
    <div>
      <form className="space-y-6 px-6 pb-4" onSubmit={handleSubmit}>
        <h3 className="text-xl font-medium text-white">Sign in to Leetcode</h3>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Your Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            htmlFor="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium block mb-2">
            Your Password
          </label>
          <input
            onChange={handleChangeInput}
            type="password"
            htmlFor="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="*********"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          {loading ? "Loading ....." : "Log In"}
        </button>
        <button
          onClick={() => handleClick("reset")}
          className="flex w-full justify-end"
        >
          <a
            href="#"
            className="text-sm block text-brand-orange hover:underline w-full text-right"
          >
            Forgot Password
          </a>
        </button>
        <div className="text-sm font-medium text-gray-500">
          Not Registered?{" "}
          <a
            onClick={() => handleClick("signup")}
            href="#"
            className="text-blue-700 hover:underline"
          >
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
