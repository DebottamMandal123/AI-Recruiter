"use client"
import { useUser } from '@/services/User';
import Image from 'next/image';
import React from 'react'

const WelcomeContainer: React.FC = () => {

  const user = useUser();

  return (
    <div className='bg-white p-3 rounded-2xl flex justify-between items-center'>
      <div>
        <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
        <h2 className='text-gray-500'>AI-Driven Interviews, Hassle-Free Hiring</h2>
      </div>
      {user && <Image src={user?.picture || ''} alt='userAvatar' width={40} height={40} className='rounded-full' />}
    </div>
  )
}

export default WelcomeContainer