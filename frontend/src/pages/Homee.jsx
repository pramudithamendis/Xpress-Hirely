import React from 'react'
import './Homee.css'
// import background from '../../public/ferrari-360-2918130_1280.jpg'

const Home = () => {
  return (
    <div className='Home_parent' >
      {/* style={{backgroundImage : `url(${background})`}} */}

    <a className='HomeSignUp' href='/user/create'>Sign up</a>
    <a className='HomeSignIn' href='/user/signin'>Sign In</a>
    
    </div>
  )
}

export default Home