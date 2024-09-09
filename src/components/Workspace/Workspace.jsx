import React from 'react'
import Split from 'react-split'
import ProblemDescription from './ProblemDescription/ProblemDescription'
import Playground from './Playground/Playground'

const Workspace = () => {
  return (
    <Split className='split' minSize={0}>
			<ProblemDescription  />
			<div >
                <Playground/>
			</div>
		</Split>
  )
}

export default Workspace
