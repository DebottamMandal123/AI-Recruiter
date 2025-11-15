"use client"
import { Button } from '@/components/ui/button';
import { useInterview } from '@/services/Interview'
import { Mic, PhoneOff, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './components/AlertConfirmation';
import { getInterviewerPrompt } from '@/services/Prompts';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

const StartInterviewWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='p-10 lg:px-48 xl:px-56 w-full'>
      {children}
    </div>
  )
}

const StartInterview: React.FC = () => {
  const { interviewInfo, } = useInterview();
  const [activeUser, setActiveUser] = useState(false);
  const [interviewActive, setInterviewActive] = useState(true);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const vapi = useRef<Vapi | null>(null);

  useEffect(() => {
    if (!vapi.current) {
      vapi.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");
    }

    if (interviewInfo) {
      startInterview()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[interviewInfo])

  const startInterview = () => {
    if (!vapi.current) {
      return
    };
    
    let questionList: string = "";
    if (interviewInfo) {
      questionList = interviewInfo.questionList.map(item => item?.question).join(', ');
    }

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.jobPosition+"?",
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2",
        language: "en-US" as const,
        smart_format: true,
        interim_results: true,
        endpointing: 800,
        multichannel: true,
      },
      voice: {
        provider: "playht" as const,
        voiceId: "jennifer",
      },
      model: {
        provider: "openai" as const,
        model: "gpt-4" as const,
        messages: [
          {
            role: "system" as const,
            content: getInterviewerPrompt(interviewInfo?.jobPosition || "", questionList),
          },
        ],
      },
    };

    try {
      vapi.current.start(assistantOptions);

      vapi.current.on("call-start", () => {
        console.log("Call has started.");
        toast("Call Started ...")
      });

      vapi.current.on("volume-level", (volume) => {
        console.log(`Assistant volume level: ${volume}`);
      });

      vapi.current.on("speech-start", () => {
        console.log("Assistant speech has started.");
        setActiveUser(false)
      });

      vapi.current.on("speech-end", () => {
        console.log("Assistant speech has ended.");
        setActiveUser(true)
      });      

      vapi.current.on("call-end", () => {
        console.log("Call has ended.");
        setActiveUser(false)
        setInterviewActive(false)
        generateFeedback();
        router.replace('/interview/' + interview_id + '/completed')
      });

      vapi.current.on("message", (message) => {
        setConversation(message?.conversation)
      });
    }
    catch(error) {
      console.error(error)
    }
  }

  const generateFeedback = async () => {
    const response = await axios.post('/api/ai-feedback', {
      conversation: conversation
    })
    const CONTENT = response?.data?.message?.content
    console.log(CONTENT)
    const { data } = await supabase
    .from('Interview-Feedback')
    .insert([
      { 
        userName: interviewInfo?.userName, 
        userEmail: interviewInfo?.userEmail,
        interview_id: interview_id,
        feedback: JSON.parse(CONTENT),
        recommended: false
      },
    ])
    .select()
    console.log(data);
  }

  const stopInterview = () => {
    if (vapi.current) {
      vapi.current.stop()
    }
    setActiveUser(false)
    setInterviewActive(false)
    router.replace('/interview/' + interview_id + '/completed')
  }

  return (
    <StartInterviewWrapper>
      <h2 className='font-semibold text-xl flex justify-between px-0.5'>AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer />
          00:00:00
        </span>
      </h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-4'>
        <div className='bg-slate-900 h-[350px] rounded-lg border flex items-center justify-center relative'>
          <div className='relative'>
            {!activeUser && interviewActive && (
              <span className='absolute -inset-2 rounded-full bg-cyan-500 opacity-75 animate-ping' />
            )}
            <Image src={'/ai.png'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover z-10' />
          </div>
          <div className='absolute bottom-4 left-4 bg-gray-800 bg-opacity-80 text-white text-sm py-1 px-4 rounded-full'>
            AI Interviewer
          </div>
        </div>

        <div className='bg-slate-900 h-[350px] rounded-lg border flex items-center justify-center relative'>
          <div className='relative'>
            {activeUser && interviewActive && (
              <span className='absolute -inset-2 rounded-full bg-cyan-500 opacity-75 animate-ping' />
            )}
            <div className='w-[60px] h-[60px] rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl'>
              {interviewInfo?.userName ? interviewInfo?.userName[0] : "Y"}
            </div>
          </div>
          <div className='absolute bottom-4 left-4 bg-gray-800 bg-opacity-80 text-white text-sm py-1 px-4 rounded-full'>
            You
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-8 gap-4'>
        <Button 
          variant="outline" 
          className="rounded-full p-3 text-white h-auto w-auto bg-gray-800 border-gray-600 hover:bg-gray-700 active:bg-gray-600 hover:text-white">
          <Mic size={20} />
        </Button>
        <AlertConfirmation handleStopInterview={() => stopInterview()} >
          <Button 
            variant="destructive" 
            className="rounded-full p-3 h-auto w-auto active:bg-red-500">
            <PhoneOff size={20} />
          </Button>
        </AlertConfirmation>
      </div>

      <div className='text-gray-400 text-sm text-center mt-4'>
        Interview in progress...
      </div>
    </StartInterviewWrapper>
  )
}

export default StartInterview