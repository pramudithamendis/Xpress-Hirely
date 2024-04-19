import React from 'react'
import './HomeAdmin.css'
const HomeAdmin = () => {
  return (
    <div className='HomeAdmin_parent'>
      
        <a className='HomeAdminSignUp' href='/admin/create'>Sign up for admin</a>
    <a className='HomeAdminSignIn' href='/admin/signin'>Sign In for admin</a>
    </div>
    
  )
}

export default HomeAdmin