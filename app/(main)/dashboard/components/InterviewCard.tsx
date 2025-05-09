import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType } from '@/app/types/InterviewType'
import Link from 'next/link'

interface InterviewCardProps {
  interview: InterviewType;
  viewDetail: boolean
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, viewDetail }) => {

  const copyLink = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id
    if (url) {
        navigator.clipboard.writeText(url)
    }
    toast("Link Copied to Clipboard")
  }  

  const sendToMail = () => {
    const subject = encodeURIComponent("AI Recruiter Interview Link");
    const body = encodeURIComponent(`Interview Link: ${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`);
    window.location.href = `mailto:someone@gmail.com?subject=${subject}&body=${body}`;
  };  

  return (
    <div className='p-5 bg-white rounded-lg border shadow-lg'>
      <div className='flex items-center justify-between'>
        <div className='h-[40px] w-[40px] bg-primary rounded-full text-white text-xl flex justify-center items-center'>
          <UserIcon size={24} />
        </div>
        <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyyy')}</h2>
      </div>
      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
      <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.duration}
        {interview['Interview-Feedback']?.length > 0 && (
          <span className='text-green-700'>
            {interview['Interview-Feedback'].length}{" "}
            {interview['Interview-Feedback'].length === 1 ? "Candidate" : "Candidates"}
          </span>
        )}
      </h2>
      {!viewDetail ? 
        ( <div className='flex gap-3 mt-5 w-[98.5%]'>
            <Button variant='outline' className='w-[50%] shadow-md' onClick={copyLink}><Copy />Copy Link</Button>
            <Button className='w-[50%] active:bg-blue-600 shadow-md shadow-blue-900' onClick={sendToMail}><Send />Send</Button>
          </div>
        ) :
        (
          <Link href={'/scheduled-interview/' + interview?.interview_id + '/details'}>
            <Button className='mt-5 w-full shadow-md' variant='outline'><ArrowRight />View Details</Button>
          </Link>
        )
      }
    </div>
  )
}

export default InterviewCard