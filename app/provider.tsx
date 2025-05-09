"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  interface User {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    CreateNewUser()
  }, [])

  const CreateNewUser = () => {

    supabase.auth.getUser()
        .then( async ({data: {user}}) => {

            // check if user exists

            const { data: Users } = await supabase
                .from('Users')
                .select('*')
                .eq('email', user?.email)

            console.log("Users", Users)

            // if not, create new user

            if (Users?.length == 0) {
                const { data } = await supabase
                    .from("Users")
                    .insert([
                        {
                            name: user?.user_metadata?.name,
                            email: user?.email,
                            picture: user?.user_metadata?.picture
                        }
                    ])
                    .select('id, name, email, picture, credits')
                    .single()
                    
                console.log("data",data)
                setUser(data);
                return;
            }

            if (Users && Users.length > 0) {
                setUser(Users[0]);
            }
        })
  }  

  return ( 
    <UserDetailContext.Provider value={{ user, setUser }}>
        <div>
            {children}
        </div>
    </UserDetailContext.Provider>
  )
}

export default Provider