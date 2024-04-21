import React, { useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import './ChatUser.css'
import { Link } from 'react-router-dom'

const ChatUser = () => {
    const [loading, setL] = useState(false)
    const [idN, setidN] = useState();
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const CreateF = () => {
        // setL(true);
        
        const data = {
                idN,
                password
        }

	    axios.post('http://localhost:5555/user/create',data)
        .then((response)=>{
            console.log(response);
            navigate('/home');
        })
        .catch((error)=>{
            // setL(false);
        })


    }

  return (
    <div className='ChatUser_parent'>
        <div className='Create_parent_leftpanel phonescreen'><Link to='/home' >Home</Link></div>
        <div className='Signup'>
         
         <input 
           type='text'
           placeholder='Enter your ID number'
           value={idN} 
           onChange={(e)=> {setidN(e.target.value);}}
         />
         <input 
           type='password'
           placeholder='Enter your password'
           value={password} 
           onChange={(e)=> {setpassword(e.target.value);}}
         />
        <button className='Create_parent_middlepanel_button' onClick={CreateF}
        >Save</button>
       </div>

        
    </div>
  )
}

export default ChatUser