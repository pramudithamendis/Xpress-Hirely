import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import './Create.css'
import BackButton from '../components/BackButton'
import { useLocation } from 'react-router-dom'


const Create = () => {
  const [title, setTitle] = useState('');
  const [vehiclenumber, setV] = useState('');
  const [vehicletypee, setVT] = useState('');
  const [issue, setI] = useState('');

  const [loading, setL] = useState(false);
  const navigate = useNavigate();

  const [user, setU] = useState(localStorage.getItem('user'));
  const [vehicleisthere, setSuccessofVehicle] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const CreateF0 = () => {
    
    CreateF1()


  }

  const CreateF1 = () => {


              const dataOfVehicle = {
                    vehiclenumber
                          
                  }

                axios.post('http://localhost:5555/vehicle/validateVehicle',dataOfVehicle)
                  .then((response)=>{
                      console.log(response);
                      if(response.data.success === "Vehicle number is valid"){
                          console.log(response.data.success)
                          setSuccessofVehicle(true)
                           CreateF2()
                          
                      }
                      else{
                        setErrorMessage(response.data)
                      }
                  })
                  .catch((error)=>{
                      // setL(false);
                  })

                  

    
  }


  // const CreateF3 = () => {

  //   console.log("CreateF3 executed")
  // }
  const CreateF2 = () => {
    console.log("createf2 executed")
    const data = {
      title,
      vehiclenumber,
      issue,
      user
    };
    setL(true);
    axios.post('http://localhost:5555/chat/create', {
    "title": title,
    "vehicle": vehiclenumber,
    "issue": issue,
    "user": user,
    "vehicletypee": vehicletypee
    })
      .then((response) => {
        console.log(response);
        console.log("Hi");
        navigate('/chat/chats');
      })
      .catch((error) => {
        setL(false);
      })
  }

  return (
    <div className='Create_parent'>
      <div className='Create_parent_leftpanel phonescreen'><BackButton /></div>
      <div className="Create_parent_middlepanel">
        
        {/* <div>{user}</div> */}
          <input
            className='Create_parent_middlepanel_title'
            type='text' placeholder='Title of the issue'
            value={title}
            onChange={(e) => { setTitle(e.target.value); }
            }
          />
          <input
            className='Create_parent_middlepanel_vehicle'
            type='text' placeholder='Vehicle number'
            value={vehiclenumber}
            onChange={(e) => { setV(e.target.value); }
            }
          />
          <input
            className='Create_parent_middlepanel_issue'
            type='text' placeholder='Type your issue here'
            value={issue}
            onChange={(e) => { setI(e.target.value); }
            }
          />
          <input
            className='Create_parent_middlepanel_issue'
            type='text' placeholder='Vehicle type'
            value={vehicletypee}
            onChange={(e) => { setVT(e.target.value); }
            }
          />
           <button className='Create_parent_middlepanel_button' onClick={CreateF0}
      >Save</button>
      <div>
          {errorMessage}
        </div>
        
      </div>



     
    </div>
  )
}

export default Create