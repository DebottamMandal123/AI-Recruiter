import { FormData } from '@/app/types/FormData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, Plus, Signal, Slack } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

interface InterviewProps {
    formData: FormData,
    interview_id: string
}

const InterviewLink: React.FC<InterviewProps> = ({ interview_id, formData }) => {

  const URL = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id

  return (
    <div className='flex flex-col justify-center items-center mt-10'>
        <Image src={"/check.png"} alt='check' width={200} height={200} className='w-[50px] h-[50px]' />
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
        <p className='mt-3'>Share this link with your candidate to start the interview process</p>
        <div className='w-full p-7 mt-6 rounded-lg bg-white'>
            <div className='flex justify-between'>
                <h2 className='font-bold'>Interview Link</h2>
                <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-4xl'>Valid for 30 Days</h2>
            </div>
            <div className='mt-3 flex gap-3 items-center'>
                <Input defaultValue={URL} disabled={true} />
                <Button className='active:bg-blue-600' onClick={async () => {
                    await navigator.clipboard.writeText(URL);
                    toast("Link copied to clipboard!");
                }}><Copy />Copy Link</Button>
            </div>
            <hr className='my-7' />
            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4' />{formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4' />10 Questions</h2>
            </div>
        </div>
        <div className='mt-7 bg-white p-5 rounded-lg w-full'>
            <h2 className='font-bold'>Share Via</h2>
            <div className='flex gap-7 mt-2'>
                <Button variant={'outline'}><Mail />Email</Button>
                <Button variant={'outline'}><Slack />Slack</Button>
                <Button variant={'outline'}><Signal />Signal</Button>
            </div>
        </div>
        <div className='flex w-full gap-5 justify-between mt-6'>
            <Link href={'/dashboard'}>
                <Button variant={'outline'}><ArrowLeft />Back to Dashboard</Button>
            </Link>
            <Link href={'/dashboard/create-interview'}>
                <Button className='hover:bg-blue-600 active:bg-blue-600'><Plus />Create New Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewLink