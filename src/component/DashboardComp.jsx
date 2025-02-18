import React from 'react'
import Graph1 from './graph1'
import Graph2 from './Graph2'
import Graph3 from './Graph3'
import Graph4 from './Graph4'

function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 rounded-xl">
      <Graph1 />
      <Graph2 />
      <Graph3 />
      <Graph4 />
    </div>
  )
}

export default Dashboard;
