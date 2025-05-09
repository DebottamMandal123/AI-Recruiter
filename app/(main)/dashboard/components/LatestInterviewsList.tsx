"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/services/User'
import { Plus, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'
import { InterviewType } from '@/app/types/InterviewType'

const LatestInterviewsList = () => {

  const [interviewsList, setInterviewsList] = useState<InterviewType[] | null>([])
  const router = useRouter();
  const user = useUser()

  useEffect(() => {
    if (user) {
      getInterviewList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const getInterviewList = async () => {
    const { data } = await supabase
    .from('Interviews')
    .select('*, Interview-Feedback(userEmail)')
    .eq('userEmail', user?.email)
    .order('id', {ascending:false})
    .limit(6);

    console.log(data);
    setInterviewsList(data as InterviewType[] | null)
  }

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'> Previously Created Interviews</h2>
        {interviewsList && interviewsList.length > 0 ? (
          <div  className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
            {interviewsList.map((interview, index) => (
              <InterviewCard interview={interview} viewDetail={false} key={index} />
            ))}
          </div>
          ) :
          <div className='p-5 flex flex-col gap-3 items-center mt-5'>
            <Video className='h-10 w-10 text-blue-700' />
            <h2>You don&apos;t have any interviews created!</h2>
            <Button className='bg-blue-700 hover:bg-blue-600 cursor-pointer' onClick={() => router.push('/dashboard/create-interview')}><Plus />Create New Interview</Button>
          </div>
        }
    </div>
  )
}

export default LatestInterviewsList