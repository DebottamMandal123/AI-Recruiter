import GoogleSignin from '@/app/components/GoogleSignin'
import Image from 'next/image'
import React from 'react'

const login: React.FC = () => {

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border-2 rounded-2xl p-8'>
        <Image src={"/logo.png"} 
        alt="Logo" 
        width={200} 
        height={100}
        className='w-[250px] bg-white mb-2'/>
        <div>
          <Image src={"/login.png"}
          alt="Login"
          height={600}
          width={400}
          className='w-[350px] h-[250px] rounded-2xl' />
        </div>
        <h2 className='text-2xl font-semibold text-center text-blue-700 mt-5'>Welcome to AI Recruiter</h2>
        <p className='text-gray-500 text-center'>Sign in with Google Authentication</p>
        <GoogleSignin />
      </div>
    </div>
  )
}

export default login