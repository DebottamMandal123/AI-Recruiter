/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { InterviewType } from '@/app/types/InterviewType'
import { Progress } from '@/components/ui/progress'

interface CandidateDetailProps {
    interviewDetail: any,
    fullInterviewData?: InterviewType | null
} 

const CandidateFeedbackDialog: React.FC<CandidateDetailProps> = ({ interviewDetail, fullInterviewData }) => {

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

  const sendOfferMail = (detail: { userEmail: string; userName: string }) => {
    const subject = encodeURIComponent('Your Offer Letter');
    const body = encodeURIComponent(`Hi ${detail.userName},
  
    We are pleased to offer you a position at our company.
    
    Please let us know if you accept.
    
    Best regards,
    HR Team`);
  
    const mailtoLink = `mailto:${detail.userEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };  

  const sendRejectionMail = (detail: { userEmail: string; userName: string }) => {
    const subject = encodeURIComponent('Regarding Your Job Application');
    const body = encodeURIComponent(`Hi ${detail.userName},
  
    Thank you for taking the time to apply and interview with us.
    
    After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.
    
    We truly appreciate your interest in the position and our company, and we encourage you to apply for future opportunities that match your skills and experience.
    
    Wishing you all the best in your career.
    
    Sincerely,
    HR Team`);
  
    const mailtoLink = `mailto:${detail.userEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };
  
    
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className='shadow-md text-primary' variant='outline'>View Report</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogDescription>
                <div className='bg-white rounded-lg flex justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-primary rounded-full w-[50px] h-[50px] flex items-center justify-center font-extralight text-center text-white text-[20px]'>{interviewDetail?.userName.charAt(0)}</div>
                        <div className='pb-0.5'>
                            <h2 className='text-2xl font-bold text-black'>{interviewDetail?.userName}</h2>
                            <h2 className='text-sm font-semibold'>{fullInterviewData?.jobPosition} Position</h2>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 px-6'>
                        <h2 className='text-xl'><span className='text-blue-700 text-2xl font-semibold'>{calculateAverageRating(interviewDetail)}</span>/10</h2>
                    </div>
                </div>
                <div className='mt-5 text-black px-3'>
                    <h2 className='font-semibold text-lg mb-2'>Skills Assessment</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <div className='flex justify-between'>
                                <h2 className='font-semibold mb-1'>Technical Skills</h2>
                                <h2 className='text-blue-700'>{interviewDetail?.feedback?.feedback?.rating?.techicalSkills}/10</h2>
                            </div>
                            <Progress value={(interviewDetail?.feedback?.feedback?.rating?.techicalSkills) * 10} />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <h2 className='font-semibold mb-1'>Communication</h2>
                                <h2 className='text-blue-700'>{interviewDetail?.feedback?.feedback?.rating?.communication}/10</h2>
                            </div>
                            <Progress value={(interviewDetail?.feedback?.feedback?.rating?.communication) * 10} />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <h2 className='font-semibold mb-1'>Problem Solving</h2>
                                <h2 className='text-blue-700'>{interviewDetail?.feedback?.feedback?.rating?.problemSolving}/10</h2>
                            </div>
                            <Progress value={(interviewDetail?.feedback?.feedback?.rating?.problemSolving) * 10} />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <h2 className='font-semibold mb-1'>Experience</h2>
                                <h2 className='text-blue-700'>{interviewDetail?.feedback?.feedback?.rating?.experince}/10</h2>
                            </div>
                            <Progress value={(interviewDetail?.feedback?.feedback?.rating?.experince) * 10} />
                        </div>
                    </div>
                </div>
                <div className='mt-5 text-black px-3'>
                    <h2 className='font-semibold text-lg mb-2'>Performance Summary</h2>
                    <h2>{interviewDetail?.feedback?.feedback?.summery}</h2>
                </div>
                <div className='mt-10 px-2'>
                    {interviewDetail?.feedback?.feedback?.Recommendation === 'Recommended' ? 
                    <div className='bg-green-50 rounded-sm flex justify-between h-20 px-3 gap-3'>
                        <div>
                            <h2 className='text-green-700 text-lg mt-2'>{interviewDetail?.feedback?.feedback?.Recommendation} for Hire</h2>
                            <h2 className='text-green-600 text-sm mb-2'>{interviewDetail?.feedback?.feedback?.RecommendationMsg}</h2>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Button className='bg-green-700 hover:bg-green-600 active:bg-green-500 shadow shadow-green-900' onClick={() => sendOfferMail({
                                userEmail: interviewDetail?.userEmail,
                                userName: interviewDetail?.userName
                            })}>Proceed to Offer</Button>
                        </div>
                    </div>
                    : 
                    <div className='bg-red-200 rounded-sm flex justify-between h-20 px-3'>
                        <div>
                            <h2 className='text-red-700 text-lg mt-2'>{interviewDetail?.feedback?.feedback?.Recommendation} for Hire</h2>
                            <h2 className='text-red-600 text-sm mb-2'>{interviewDetail?.feedback?.feedback?.RecommendationMsg}</h2>
                        </div>
                        <div className='flex items-center justify-center'>                            
                            <Button className='bg-red-700 hover:bg-red-600 active:bg-red-500 shadow shadow-red-900' onClick={() => sendRejectionMail({
                                userEmail: interviewDetail?.userEmail,
                                userName: interviewDetail?.userName
                            })}>Send Message</Button>                            
                        </div>
                    </div>
                    }
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog