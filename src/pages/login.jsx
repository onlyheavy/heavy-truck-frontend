import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <h2>Login page</h2>
      <Link href={'/truck-landing'}><button className='border border-red-500 p-2'>Landing  page</button></Link>

    </div>
  )
}

export default LoginPage