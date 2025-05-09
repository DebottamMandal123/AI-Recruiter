import { Question } from "@/context/InterviewDetailContext";

export interface InterviewType {
    id: number;
    interview_id: string;
    userEmail: string;
    created_at: string;
    duration: string;
    jobDescription: string;
    jobPosition: string;
    type: string | string[];
    questionList: Question[];
    'Interview-Feedback': Array<{ userEmail: string }>;
}