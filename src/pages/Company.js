import React from 'react'
import { useNavigate } from 'react-router-dom'

function Company() {
  const navigator = useNavigate();
  return (
    <div>
      <h1>Company</h1>
      <button onClick={()=> navigator('/')}>Home으로 돌아가기</button>
    </div>
  )
}

export default Company