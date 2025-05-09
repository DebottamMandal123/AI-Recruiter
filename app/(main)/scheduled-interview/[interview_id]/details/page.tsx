'use client'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/services/User'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetails from './components/InterviewDetails'
import { InterviewType } from '@/app/types/InterviewType'
import CandidateDetails from './components/CandidateDetails'
import { Separator } from '@/components/ui/separator'

const InterviewDetail: React.FC = () => {

  const [interviewDetail, setInterviewDetail] = useState<InterviewType | null>();
  const { interview_id } = useParams();
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
      .select('*, Interview-Feedback(*)')
      .eq('userEmail', user?.email)
      .eq('interview_id', interview_id);  

      const typedData = data as InterviewType[] | null

      if (typedData && typedData.length > 0) {
        setInterviewDetail(typedData[0]);
      } else {
        setInterviewDetail(null);
      }

      console.log(typedData);
    }
    catch(error) {
      console.error("Error getting interview data ", error)
    }
  }

  return (
    <div>
      <div className='mt-5 px-0.5'>
        <h2 className='font-bold text-2xl'>Interview Details</h2>
        <InterviewDetails interviewDetail={interviewDetail} />
      </div>
      <Separator className='mt-16' />
      <div className='mt-5 px-0.5'>
        <h2 className='font-bold text-2xl'>Candidates {interviewDetail?.['Interview-Feedback'] ? `(${interviewDetail?.['Interview-Feedback'].length})` : null}</h2>
        <CandidateDetails interviewDetail={interviewDetail?.['Interview-Feedback']} fullInterviewData={interviewDetail} />
      </div>
    </div>
  )
}
 
export default InterviewDetail