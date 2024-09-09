import Topbar from '@/components/Topbar/Topbar'
import Workspace from '@/components/Workspace/Workspace'
import React from 'react'

const PrblemPage = () => {
  return (
    <div>
      <Topbar problemPage={true}/>
      <Workspace/>
    </div>
  )
}

export default PrblemPage
