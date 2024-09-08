import { authModalState } from "@/atoms/authModalAtom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";

const Signup = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    displayname: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };
  const handleChangeInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register to Leetcode</h3>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Email
          </label>
          <input
            type="email"
            onChange={handleChangeInput}
            htmlFor="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
            required
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="name" className="text-sm font-medium block mb-2">
            Display Name
          </label>
          <input
            type="text"
            onChange={handleChangeInput}
            htmlFor="name"
            name="displayname"
            id="name"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="John Doe" required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Password
          </label>
          <input
            type="password"
            onChange={handleChangeInput}
            htmlFor="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="*********"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          {loading? "Registering...":"Register"}
        </button>

        <div className="text-sm font-medium text-gray-500">
          Already have an account{" "}
          <a
            onClick={handleClick}
            href="#"
            className="text-blue-700 hover:underline"
          >
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
