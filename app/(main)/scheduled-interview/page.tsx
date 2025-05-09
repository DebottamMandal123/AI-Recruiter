'use client'
import { InterviewType } from '@/app/types/InterviewType'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/services/User'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/components/InterviewCard'

const Scheduled_Interview: React.FC = () => {

  const [interviewsList, setInterviewsList] = useState<InterviewType[] | null>([])
  const user = useUser();

  useEffect(() => {
    if (user) {
        getInterviewList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  const getInterviewList = async () => {
    try {
        const { data } = await supabase
        .from('Interviews')
        .select('jobPosition, duration, interview_id, created_at, Interview-Feedback(userEmail)')
        .eq('userEmail', user?.email)
        .order('id', {ascending: false});

        console.log(data);
        setInterviewsList(data as InterviewType[] | null);
    }
    catch(error) {
        console.error("Error getting interview data ", error)
    }
  }

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl px-1'>Interview List with Candidate Feedback</h2>
        {interviewsList && interviewsList.length > 0 && (
          <div  className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
            {interviewsList.map((interview, index) => (
              <InterviewCard interview={interview} viewDetail={true} key={index} />
            ))}
          </div>
        )}
    </div>
  )
}

export default Scheduled_Interview