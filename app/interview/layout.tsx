"use client"
import React, { useState } from 'react'
import InterviewHeader from './components/InterviewHeader'
import { InterviewDetailContext, InterviewInfo } from '@/context/InterviewDetailContext'

const InterviewLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo | null>(null);  

  return (
    <InterviewDetailContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className='min-h-screen bg-secondary flex flex-col'>
        <div>
          <InterviewHeader />
        </div>
        <div className='flex-1 flex justify-center pb-20'>
          {children}
        </div>    
      </div>
    </InterviewDetailContext.Provider>
  )
}

export default InterviewLayout