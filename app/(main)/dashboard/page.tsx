import React from 'react'
// import WelcomeContainer from './components/WelcomeContainer'
import CreateOptions from './components/CreateOptions'
import LatestInterviewsList from './components/LatestInterviewsList'

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className='py-3 text-2xl font-bold'>Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  )
}

export default Dashboard