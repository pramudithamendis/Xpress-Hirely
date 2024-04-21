import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import './ChatUserLogin.css'
import { Link } from 'react-router-dom'

const ChatUserLogin = () => {
  // const [loading, setL] = useState(false)
  const [idN, setidN] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('')
  const LoginF = () => {
    // setL(true);

    const data = {
      idN,
      password
    }

    axios.post('http://localhost:5555/user/login', data)
      .then((response) => {
        console.log(response);
        if (response.data.success === "Success") {

          navigate('/chat/chats')
          localStorage.setItem('user', response.data.user);

        }
        else {
          setErrorMessage(response.data)
        }
      })
      .catch((error) => {
        // setL(false);
      })


  }

  return (
    <div className='ChatUserLogin_parent'>
      <div className='Create_parent_leftpanel phonescreen'><Link to='/home' >Home</Link></div>

      <div className='Signin'>

        <input
          type='text'
          placeholder='Enter your ID number'
          value={idN}
          onChange={(e) => { setidN(e.target.value); }}
        />
        <input
          type='text'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => { setpassword(e.target.value); }}
        />
        <button className='Create_parent_middlepanel_button' onClick={LoginF}
        >Save</button>
        <div>
          {errorMessage}
        </div>
      </div>


    </div>
  )
}

export default ChatUserLogin