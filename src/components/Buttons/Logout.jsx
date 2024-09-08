import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import {FiLogOut} from 'react-icons/fi'
const Logout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();
    const handleLogout = async(e)=>{
        e.preventDefault();
        try {
            const success = await signOut();
            if(error) alert(error.message);
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
      <FiLogOut/>
    </button>
  )
}

export default Logout
