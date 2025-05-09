import { createContext, Dispatch, SetStateAction } from "react";

export interface Question {
    question: string;
    type: string;
}

export interface InterviewInfo {
    userName?: string,
    userEmail?: string,
    questionList: Question[],
    jobPosition?: string,
    duration?: string
}

export interface InterviewDetailContextType {
    interviewInfo: InterviewInfo | null; 
    setInterviewInfo: Dispatch<SetStateAction<InterviewInfo | null>>; 
}

export const InterviewDetailContext = createContext<InterviewDetailContextType | null>(null)