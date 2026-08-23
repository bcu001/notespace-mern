import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {

  const btnTempHandler = ()=>{
    toast.success("congrats");
  }

  return (
    <div >
      <button onClick={btnTempHandler} className="btn">Button</button>
      <button onClick={btnTempHandler} className="btn btn-neutral">Neutral</button>
      <button onClick={btnTempHandler} className="btn btn-primary">Primary</button>
      <button onClick={btnTempHandler} className="btn btn-secondary">Secondary</button>
      <button onClick={btnTempHandler} className="btn btn-accent">Accent</button>
      <button onClick={btnTempHandler} className="btn btn-ghost">Ghost</button>
      <button onClick={btnTempHandler} className="btn btn-link">Link</button>
    </div>
  )
}

export default HomePage
