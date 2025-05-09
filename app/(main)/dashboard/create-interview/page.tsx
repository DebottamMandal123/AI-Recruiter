"use client"
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import GenerateQuestions from './components/GenerateQuestions'
import { toast } from 'sonner'
import { FormData } from '@/app/types/FormData'
import InterviewLink from './components/InterviewLink'

const CreateInterview: React.FC = () => {

  const router = useRouter();
  const [step, setStep ] = useState(1);
  const [interviewID, setInterviewId] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({});

  const handleFormInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  } 

  useEffect(() => {
    console.log("FormData ", formData)
  }, [formData])

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
      <div className='flex gap-2 items-center'>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer mt-0.5' />
        <h2 className='font-bold text-2xl'>Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className='my-5' />
      {step == 1 ? <Form 
      handleFormInputChange={handleFormInputChange}
      GoToNext={() => {
        if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
          toast("Please enter all the details")
          return;
        }
        setStep(step + 1);
      }} /> :
      step == 2 ? <GenerateQuestions formData={formData} onCreateLink={(interview_id) => {
        setInterviewId(interview_id);
        setStep(step + 1);
      }} /> : 
      step == 3 ? <InterviewLink interview_id={interviewID} formData={formData} /> : null}
    </div>
  )
}

export default CreateInterview