'use client'
import { InterviewType } from '@/app/types/InterviewType';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/services/User';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/components/InterviewCard';

const All_Interview = () => {

  const [interviewsList, setInterviewsList] = useState<InterviewType[] | null>([]);  
  const user = useUser();

  useEffect(() => {
    if (user) {
        getInterviewList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  const getInterviewList = async () => {
    const { data } = await supabase
    .from('Interviews')
    .select('*, Interview-Feedback(userEmail)')
    .eq('userEmail', user?.email)
    .order('id', {ascending:false})
    .limit(6);

    console.log(data)
    setInterviewsList(data as InterviewType[] | null)
  }

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>All Interviews</h2>
        {interviewsList && interviewsList.length > 0 && (
          <div  className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
            {interviewsList.map((interview, index) => (
              <InterviewCard interview={interview} viewDetail={false} key={index} />
            ))}
          </div>
        )}
    </div>
  )
}

export default All_Interview