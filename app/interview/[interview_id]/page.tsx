'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useInterview } from '@/services/Interview'
import { supabase } from '@/services/supabaseClient'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface InterviewDataProps {
  jobPosition: string,
  duration: string
}

const Interview: React.FC = () => {

  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState<InterviewDataProps | null>(null)
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false)
  const { interviewInfo, setInterviewInfo } = useInterview();
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      getInterviewDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interview_id])

  useEffect(() => {
    if (interviewInfo) {
      console.log("Updated interviewInfo:", interviewInfo);
    }
  }, [interviewInfo]);

  const getInterviewDetails = async () => {
    try {
      const { data } = await supabase
        .from('Interviews')
        .select("jobPosition, duration")
        .eq("interview_id", interview_id)

      setInterviewData(data ? data[0] : null);
      setLoading(false)
      if (data?.length == 0) {
        toast("Incorrect Interview Link");
        return;
      }
    }
    catch(error) {
      console.log(error)
      setLoading(false);
      toast("Incorrect Interview Link")
    }
  }

  const handleJoinInterview = async () => {
    try {
      setLoading2(true);
      const { data } = await supabase
        .from('Interviews')
        .select('questionList')
        .eq('interview_id', interview_id)

        if (data && data[0]) {
          setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            questionList: data[0].questionList,
            jobPosition: interviewData?.jobPosition,
            duration: interviewData?.duration
          })

          router.push("/interview/" + interview_id + "/live")
          setLoading2(false);
        }
        else {
          toast("Failed to retrieve interview questions")
        }
    }
    catch(error) {
      console.error("Error joining interview:", error);
      toast("Failed to join Interview")
      setLoading2(false);
    }
  }
  
  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'> 
      {loading ? 
        <div className='flex justify-center items-center h-full'>
          <Loader2Icon className='animate-spin w-8 h-8 text-primary' />
        </div> :  
        <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-8 lg:px-24 xl:px-36'>
          <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[140px]' />
          <h2 className='mt-3'>AI-Powered Interview Platform</h2>
          <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-[280px] my-6 rounded-sm' />
          <h2 className='font-bold text-xl'>{interviewData?.jobPosition} Interview</h2>
          <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' />{interviewData?.duration}</h2>
          <div className='w-full mt-4'>
            <Input placeholder='Enter your full name' required={true} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className='w-full mt-4'>
            <Input placeholder='Enter your email id' required={true} onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          <div className='p-3 bg-blue-100 flex gap-4 rounded-xl mt-6'>
            <Info className='text-primary' />
            <div>
              <h2 className='font-bold'>Before you begin</h2>
              <ul className=''>
                <li className='text-sm text-primary'>- Test your camera and microphone</li>
                <li className='text-sm text-primary'>- Ensure you have a stable internet connection</li>
                <li className='text-sm text-primary'>- Find a quiet place for interview</li>
              </ul>
            </div>
          </div>
          <Button className='mt-5 w-full font-bold active:bg-blue-600' disabled={!userName || !userEmail || loading2}
          onClick={() => handleJoinInterview()}><Video />{loading2 && <Loader2Icon className='animate-spin' />}{loading2 ? "Joining" : "Join Interview"}</Button>
        </div>
      }
    </div>
  )
}

export default Interview