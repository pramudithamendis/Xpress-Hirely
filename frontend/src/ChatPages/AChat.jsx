import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import './AChat.css'
import BackButton from '../components/BackButton';


const AChat = () => {

  const [loading, setL] = useState(false)
  const [s, setS] = useState({});
  const [r, setR] = useState([]);
  const { id } = useParams();
  const [replyloading, setReply] = useState(true)
  const [editable, setEditable] = useState(true)

  useEffect(() => {
    setL(true);
    
    axios.get(`http://localhost:5555/chat/getchat/${id}/reply`)
      .then((response) => {
        // console.log(response);

        
        setR(response.data);
        
        setL(false)
        // setReply(false)
        setReply(false)

        setEditable(false)
        
      })
      .catch((error) => {
        console.log(error);
        
        setL(false);
        setReply(true)
        setEditable(true)
      })
  }, [])
  

  useEffect(() => {
    setL(true);
    axios.get(`http://localhost:5555/chat/getchat/${id}`)
      .then((response) => {
        // console.log(response);
        
        setS(response.data);
        setL(false)
        
      })
      .catch((error) => {
        console.log(error);
        setL(false);
        
      })
  }, [])


  return (
    <div className='AChat_parent'>
      <div className='AChat_leftpanel' style={{marginLeft: 20 + 'em'}}><BackButton /></div>
      <div className='AChat_parent_middlepanel'>
        <div className='AChat_parent_middlepanel_title text-black	'>Title: {s.title}</div><hr className='AChat_parent_middlepanel_title_hr' />
        <div className='AChat_parent_middlepanel_vehicle text-black	'>Vehicle number: {s.vehicle}</div><hr className='AChat_parent_middlepanel_vehicle_hr' />
        <div className='AChat_parent_middlepanel_issue text-black	'>Issue: {s.issue}</div>
        <div className='AChat_parent_middlepanel_issue text-black	'>Vehicle type: {s.vehicletypee}</div>
        <div className='AChat_parent_middlepanel_operations text-black	'>

        {editable ? (
          <Link className='edit' to={`/chat/edit/${s._id}`}>
          <AiOutlineEdit className='' />
        </Link>
        ) : (
          <div>Cannot-edit | </div>
        )}
        
        <Link className='delete' to={`/chat/delete/${s._id}`}>
          <MdOutlineDelete className='' />
        </Link>
        </div>


      </div>
      {replyloading ? (<Spinner />) : (

        <div>

          {/* {r.length} */}
         <div>     
          
         {r.map(function(r, i){
        return <div className='AChat_Reply'>
          {r.title}
        </div>;
        })}

   

         </div>
          

        </div>

      )
      
}
      
      
      
    </div>


  )
}

export default AChat