import { InterviewDetailContext } from "@/context/InterviewDetailContext"
import { useContext } from "react"

const useInterview = () => {
    const context = useContext(InterviewDetailContext);
    if (!context) {
        throw new Error("useInterview must be used within a InterviewDetailProvider");
    }

    const { interviewInfo, setInterviewInfo } = context;
    return { interviewInfo, setInterviewInfo }
}

export { useInterview }