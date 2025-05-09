/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog';
import { InterviewType } from '@/app/types/InterviewType';

interface CandidateDetailProps {
    interviewDetail: any,
    fullInterviewData?: InterviewType | null
}

const CandidateDetails: React.FC<CandidateDetailProps> = ({ interviewDetail, fullInterviewData }) => {

  if (!interviewDetail || !Array.isArray(interviewDetail)) {
    return (
        <div className="p-5 text-gray-500 text-center flex flex-col items-center justify-center space-y-2 animate-fade-in-up">
          <div className="w-3 h-3 rounded-full bg-gray-500 animate-ping mb-2"></div>
          <p className="text-sm animate-pulse">Loading Candidate Data...</p>
        </div>
    );
  }  

  const calculateAverageRating = (detail: any) => {
    if (detail?.feedback?.feedback?.rating) {
      const ratings = detail.feedback.feedback.rating;
      const sum = ratings.communication + ratings.experince + ratings.problemSolving + ratings.techicalSkills;
      const average = sum / 4;
      return average
    }
    else {
      return 0;
    }
  };

  return (
    <div>
      <div>
        {interviewDetail.map((detail: any, index: number) => {
            const avgRating = calculateAverageRating(detail);
            return (
                <div key={index} className='p-5 bg-white rounded-lg mt-5 flex justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-primary rounded-full w-[40px] h-[40px] flex items-center justify-center font-extralight text-center text-white text-[20px]'>{detail?.userName.charAt(0)}</div>
                        <div>
                            <h2 className='text-lg font-semibold'>{detail?.userName}</h2>
                            <h2 className='text-gray-500 text-sm'>Completed on : {detail.created_at ? moment(detail?.created_at).format('MMM D yyyy') : null}</h2>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 px-6'>
                        <h2 className='text-lg text-green-600'>{avgRating}/10</h2>
                        <CandidateFeedbackDialog interviewDetail={detail} fullInterviewData={fullInterviewData} />
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default CandidateDetails