import React from 'react'

type errorProps = {
    msg: string
}

const ErrorMsg = ({ msg }: errorProps) => {
  return (
    <div className='text-red-500 font-bold'>{msg}</div>
  )
}

export default ErrorMsg