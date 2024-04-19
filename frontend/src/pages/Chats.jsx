import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

import { Link } from 'react-router-dom'

import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'
import './Chats.css'


const Chats = () => {
    const [chats, setS] = useState([]);
    const [loading, setL] = useState(false)

    const [user, setU] = useState(localStorage.getItem('user'));

    const [chatsloading, setChats] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        setL(true);

        axios.get(`http://localhost:5555/chat/chats/${user}`)
            .then((response) => {
                setS(response.data);

                setL(false)

                if (response.data[0].title == "hi") {
                    setChats(true)
                }
                else {
                    setChats(false)

                }


            })
            .catch((error) => {
                console.log(error);
                setL(true);
                setChats(false)

            })
    }, [])
    return (
        <div>
            <div>
                <div className='Chats_parent'>
                <div>Hi {user}!<br /></div>
                </div>
            </div>
            <div>
                {loading ? (<Spinner />) : (


                    <div className='Chats_parent'>



                        <div className='CreateButton' onClick={() => {
                            navigate(`/chat/create`)
                        }}>

                            Create

                        </div>



                    </div>



                )}
            </div>
            <div>
                <div className='Chats_parent2'>
                    {chatsloading ? (<div></div>) : (
                        <div >
                            {chats.map(function (s, index) {
                                return <>
                                    <div className='Chat' key={s._id}
                                        onClick={() => {
                                            navigate(`/chat/getchat/${s._id}`)
                                        }}>
                                        <div className='Chats_parent_middlepanel_title'>Title: {s.title}</div>
                                        <div className='Chats_parent_middlepanel_vehicle'>Vehicle Number: {s.vehicle}</div>

                                        <div className='Chats_parent_middlepanel_Operations'>
                                            {/* <Link className='info' to={`/chat/getchat/${s._id}`}>
                                                <BsInfoCircle className='' />
                                            </Link> */}
                                            <Link className='delete' to={`/chat/delete/${s._id}`}>
                                                <MdOutlineDelete className='' />
                                            </Link>

                                        </div>

                                    </div>
                                </>
                            })}
                        </div>

                    )}
                </div>
            </div>
        </div >
    )
}

export default Chats