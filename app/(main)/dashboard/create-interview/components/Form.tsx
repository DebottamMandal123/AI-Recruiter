import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InterviewType } from '@/services/SidebarOptions'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FormProps {
  handleFormInputChange: (field: string, value: string | string[]) => void;
  GoToNext: () => void;
}

const Form: React.FC<FormProps> = ({ handleFormInputChange, GoToNext }) => {

  const [interviewType, setInterviewType] = useState<string[]>([]);

  const handleInterviewTypeChange = (type: string) => {
    const newInterviewType = interviewType.includes(type) ? interviewType.filter(item => item !== type) : [...interviewType, type]
    setInterviewType(newInterviewType);
    handleFormInputChange('type', newInterviewType)
  }

  return (
    <div className='bg-white p-5 rounded-md'>
      <div>
        <h2 className='text-sm font-medium'>Job Position</h2>
        <Input placeholder='e.g. Full Stack Developer' className='mt-2' onChange={(event) => handleFormInputChange('jobPosition', event.target.value)} spellCheck="false" />
      </div>
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Job Description</h2>
        <Textarea placeholder='Enter details of job description' className='mt-2 h-[150px]' onChange={(event) => handleFormInputChange('jobDescription', event.target.value)} spellCheck="false" />
      </div>
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Duration</h2>
        <Select onValueChange={(value) => handleFormInputChange("duration", value)}>
            <SelectTrigger className="w-full mt-2 cursor-pointer">
                <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="5 Min" className='cursor-pointer'>5 Min</SelectItem>
                <SelectItem value="15 Min" className='cursor-pointer'>15 Min</SelectItem>
                <SelectItem value="30 Min" className='cursor-pointer'>30 Min</SelectItem>
                <SelectItem value="45 Min" className='cursor-pointer'>45 Min</SelectItem>
                <SelectItem value="60 Min" className='cursor-pointer'>60 Min</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div className='mt-5'>
        <h2 className='text-sm font-medium'>Interview Type</h2>
        <div className='flex gap-3 flex-wrap mt-2'>
            {InterviewType.map((type, index) => {
                return (
                    <div key={index} className={`flex gap-2 py-1 px-2 items-center bg-white border border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100 ${interviewType.includes(type.title) && 'text-primary'}`} onClick={() => handleInterviewTypeChange(type.title)}>
                        <type.icon className='h-4 w-4' />
                        <span>{type.title}</span>
                    </div>
                )
            })}
        </div>
      </div>
      <div className='mt-7 flex justify-end' onClick={() => GoToNext()}>
        <Button className='cursor-pointer active:bg-blue-600'>Generate Question <ArrowRight /></Button>
      </div>
    </div>
  )
}

export default Form