/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Clock, Tag } from 'lucide-react'
import React from 'react'
import moment from 'moment'

const InterviewDetails = ({ interviewDetail }: any) => {
  return (
    <div className='p-5 bg-white rounded-lg mt-5'>
      <h2 className='font-bold text-2xl'>{interviewDetail?.jobPosition}</h2>
      <div className='flex justify-between mt-5'>
      <div>
        <h2 className='text-sm text-gray-500'>Duration</h2>
        <h2 className='flex items-center gap-1 text-md font-bold'><Clock className='h-4 w-4 mt-0.5' />{interviewDetail?.duration}</h2>
      </div>
      <div>
        <h2 className='text-sm text-gray-500'>Created On</h2>
        <h2 className='flex items-center gap-1 text-md font-bold'><Calendar className='h-4 w-4 mt-0.5' />{interviewDetail?.created_at ?  moment(interviewDetail?.created_at).format('MMM D, yyyy') : ''}</h2>
      </div>
      <div>
        <h2 className='text-sm text-gray-500'>Interview Type</h2>
        <h2 className='flex items-center gap-1 text-md font-bold'><Tag className='h-4 w-4 mt-0.5' />{JSON.parse(interviewDetail?.type || "[]").join(" + ")}</h2>
      </div>
      </div>
      <div className='mt-5'>
        <h2 className='font-bold text-xl'>Job Description</h2>
        <p className='mt-1 text-gray-700 text-[17px]'>{interviewDetail?.jobDescription}</p>
      </div>
      <div className='mt-5'>
        <h2 className='font-bold text-xl'>Interview Questions</h2>
        <div className='mt-1 text-gray-700'>{interviewDetail?.questionList.map((item: any, index: number) => (
          <p className='flex items-center gap-2 py-0.5 text-[17px]' key={index}>{index + 1}. {item.question}</p>
        ))}</div>
      </div>
    </div>
  )
}

export default InterviewDetails