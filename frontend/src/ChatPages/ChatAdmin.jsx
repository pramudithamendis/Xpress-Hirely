import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import './ChatAdmin.css'
import { Link } from 'react-router-dom'

const ChatAdmin = () => {
  const [loading, setL] = useState(false)
  const [email, setEmail] = useState();
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const CreateF = () => {
    // setL(true);

    const data = {
      email,
      password
    }

    axios.post('http://localhost:5555/admin/create', data)
      .then((response) => {
        console.log(response);
        navigate('/home/admin');
      })
      .catch((error) => {
        // setL(false);
      })


  }

  return (
    <div className='ChatAdmin_parent'>
      <div className='Create_parent_leftpanel phonescreen'><Link to='/home/admin' >Home</Link></div>
      <div className='Signup'>

        <input
          type='text'
          placeholder='Enter your ID number'
          value={email}
          onChange={(e) => { setEmail(e.target.value); }}
        />
        <input
          type='text'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => { setpassword(e.target.value); }}
        />
        <button className='Create_parent_middlepanel_button' onClick={CreateF}
        >Save</button>
      </div>


    </div>
  )
}

export default ChatAdmin