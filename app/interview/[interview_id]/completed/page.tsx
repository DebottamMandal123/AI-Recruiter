import React from 'react'
import { CheckCircle } from 'lucide-react'

const CompleteInterview = () => {
  return (
    <div className="w-full h-full flex justify-center items-center pt-16 pb-8">
      <div className="flex flex-col max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-12 mb-3">
          <div className="mb-2 flex justify-center">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center">
            Interview Completed!
          </h1>
          
          <p className="text-gray-600 mb-4 text-center">
            Thank you for participating in the interview process.
            We have successfully received your responses.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <div className="text-blue-800 font-medium text-center text-sm">
              <p className='mb-0.5'>Our team will review your application and get</p>
              <p>back to you within 5-7 business days.</p>
            </div>
          </div>
          
        </div>
        
        <p className="text-gray-500 text-sm text-center">
          If you have any questions, please contact <a href="mailto:support@company.com" className="text-blue-600">support@company.com</a>
        </p>
      </div>
    </div>
  )
}

export default CompleteInterview