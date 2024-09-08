import { authModalState } from '@/atoms/authModalAtom'
import React from 'react'
import { useSetRecoilState } from 'recoil'

const Signup = () => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const handleClick = () =>{
    setAuthModalState((prev)=>({...prev,type:'login'}))
  }
  return (
    <div>
      <form className="space-y-6 px-6 pb-4">
        <h3 className="text-xl font-medium text-white">Register to Leetcode</h3>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Email
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
          <label htmlFor="name" className="text-sm font-medium block mb-2">
            Display Name
          </label>
          <input
            htmlFor="name"
            name="name"
            id="name"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2">
            Password
          </label>
          <input
            htmlFor="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="*********"
          />
        </div>
        <button type='submit' className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">Register</button>
        
        <div className="text-sm font-medium text-gray-500">
            Already have an account{" "}
            <a onClick={handleClick} href="#" className="text-blue-700 hover:underline">Log in</a>
        </div>
      </form>
    </div>
  )
}

export default Signup
