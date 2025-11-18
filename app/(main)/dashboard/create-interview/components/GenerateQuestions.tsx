"use client"
import { FormData } from '@/app/types/FormData';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/services/User';

interface GenerateQuestionsProps {
  formData: FormData;
  onCreateLink: (interviewId: string) => void;
}

interface QuestionItem {
  question: string,
  type: string
}

const GenerateQuestions: React.FC<GenerateQuestionsProps> = ({ formData, onCreateLink }) => {

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [questionsList, setQuestionsList] = useState<QuestionItem[]>([])
  const user = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])    

  const GenerateQuestionList = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/ai-model", {
        ...formData
      })
      console.log(response.data.message.content);
      const CONTENT = JSON.parse(response.data.message.content);
      setQuestionsList(CONTENT?.interviewQuestions)
      setLoading(false)
    }
    catch(error) {
      console.log("Error generating the questions list", error)
      toast("Server Error, Try Again!")
      setLoading(false)
    }
  }

  const onFinish = async () => {
    setLoading2(true)
    const interview_id = uuidv4();
    const { data } = await supabase
    .from('Interviews')
    .insert([
      { 
        ...formData,
        questionList: questionsList,
        userEmail: user?.email,
        interview_id: interview_id
      },
    ])
    .select()

    setLoading2(false)
    
    onCreateLink(interview_id)

    console.log(data)
  }

  return (
    <div>
      <div>
        <h2 className='font-bold text-[1.35rem] mb-4 ml-1'>Generated Interview Questions:</h2>
        {loading ? (
          <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
            <Loader2Icon className='animate-spin' />
            <div>
              <h2 className='font-medium'>Generating Interview Questions</h2>
              <p className='text-primary'>Our AI is crafting interview questions based on your position</p>
            </div>
          </div>
        ) : (
          <div>
            {questionsList?.length > 0 && 
              <div className='p-5 border border-gray-300 rounded-xl bg-white'>
                {questionsList.map((item: QuestionItem, index: number) => {
                return <div key={index} className='p-3 border border-gray-200 rounded-xl mb-3 bg-white'>
                  <h2 className='font-medium'>{item.question}</h2>
                  <h2 className='text-sm text-primary'>Type: {item.type}</h2>
                </div>
                })}
              </div>
            }
          </div>
        )}
      </div>
      <div className='flex justify-center mt-7'>
        <Button className='cursor-pointer w-56 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95' onClick={() => onFinish()} disabled={loading2}>{loading2 && <Loader2Icon className='animate-spin text-primary' />}Create Interview Link</Button>
      </div>
    </div>
  )
}

export default GenerateQuestions