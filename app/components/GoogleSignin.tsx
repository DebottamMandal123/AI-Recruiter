"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import React from 'react'

const GoogleSignin: React.FC = () => {

  const handleSigninWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
    else {
      console.log('Login successful!');
    } 
  }

  return (
    <div className='w-full'>
      <Button className='mt-7 cursor-pointer w-full bg-blue-700 hover:bg-blue-600' onClick={handleSigninWithGoogle}>Signin with Google</Button>
    </div>
  )
}

export default GoogleSignin
// This component is a button that allows users to log in using their Google account.