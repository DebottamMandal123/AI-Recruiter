"use client"
import { Button } from '@/components/ui/button';
import { useInterview } from '@/services/Interview'
import { Mic, MicOff, PhoneOff, Timer } from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState(true);
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

  const ensureMicPermission = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      toast("Microphone access is not supported in this browser.");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error("Microphone permission denied:", error);
      toast("Please allow microphone access to continue the interview.");
      return false;
    }
  };

  const unmuteUser = () => {
    if (!vapi.current) return;
    vapi.current.setMuted(false);
    setIsMuted(false);
  };

  const toggleMic = () => {
    if (!vapi.current) return;
    const nextMuteState = !vapi.current.isMuted();
    vapi.current.setMuted(nextMuteState);
    setIsMuted(nextMuteState);
  };

  const startInterview = async () => {
    if (!vapi.current) {
      return
    };

    const hasPermission = await ensureMicPermission();
    if (!hasPermission) {
      return;
    }
    
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
      await vapi.current.start(assistantOptions);
      unmuteUser();

      vapi.current.on("call-start", () => {
        console.log("Call has started.");
        toast("Call Started ...")
        unmuteUser();
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
        setIsMuted(true)
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

  const parseFeedbackPayload = (value?: string) => {
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("Unable to parse feedback payload", { value, error });
      return null;
    }
  };

  const generateFeedback = async () => {
    if (!conversation) {
      console.warn("Skipping feedback generation because no conversation data was captured.");
      return;
    }
    const response = await axios.post('/api/ai-feedback', {
      conversation: conversation
    })
    const safePayload = response?.data?.payload ?? parseFeedbackPayload(response?.data?.text);
    console.log("feedback payload", safePayload)
    const { data } = await supabase
    .from('Interview-Feedback')
    .insert([
      { 
        userName: interviewInfo?.userName, 
        userEmail: interviewInfo?.userEmail,
        interview_id: interview_id,
        feedback: safePayload ?? { rawText: response?.data?.text ?? "No feedback" },
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
    setIsMuted(true)
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
          onClick={toggleMic}
          aria-pressed={!isMuted}
          className="rounded-full p-3 text-white h-auto w-auto bg-gray-800 border-gray-600 hover:bg-gray-700 active:bg-gray-600 hover:text-white">
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
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
