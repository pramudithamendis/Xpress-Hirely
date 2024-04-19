import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import './Delete.css'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import BackButton from '../components/BackButton'

const Delete = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const DeleteF = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/chat/delete/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/chat/chats');
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      })
  }
  return (
    <div className='Delete_parent'>
      <div className="Delete_parent_leftpanel"><BackButton /></div>
      <div className="Delete_parent_middlepanel">
        <div className='Delete_parent_middlepanel_verify'>
          Are you sure you want to delete this?
        </div>
        <button className='Delete_parent_middlepanel_button' onClick={DeleteF}
        >Delete</button>
        <div className='Delete_parent_middlepanel_operations'>

          <Link className='delete' to={`/chat/getchat/${id}`}>
            <BsInfoCircle className='' />
          </Link>
        </div>
      </div>



    </div>
  )
}

export default Delete