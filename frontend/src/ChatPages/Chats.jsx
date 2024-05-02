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
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const Chats = () => {
    const [chats, setS] = useState([]);
    const [loading, setL] = useState(false)

    const [user, setU] = useState(localStorage.getItem('user'));

    const [chatsloading, setChats] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        setL(true);
        console.log(user)
       
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
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Issue title', 'Vehicle number']],
            body: chats.map(s => [
                s.title,
                s.vehicle
              
                
                
            ]),
            styles: { fontSize: 8 },
            theme: 'grid'
        });
        doc.save('My Chats.pdf');
    };
    return (
        <div>
            <div>
                <div className='Chats_parent '>
                <div> {user}<br /></div>
                </div>
            </div>
            <div>
                {!user ? (<div className='LoginFirst_parent'><div className="LoginIfCantGetDetailsFromLocalStorage_parent">To create a chat, you must create an account first.</div><div className="LoginIfCantGetDetailsFromLocalStorage" onClick={() => {
                            navigate(`/user/signin`)
                        }}>Login</div></div>) : (


                    <div className='Chats_parent '>



                        <div className='CreateButton font-bold' onClick={() => {
                            navigate(`/chat/create`)
                        }}>

                            Create

                        </div>
                        <div>
                        <button onClick={exportToPDF} className="Chats_DownloadPdf">
                        Download PDF
                    </button>
                        </div>
                        


                    </div>



                )}
            </div>
            <div>
                <div className='Chats_parent2 '>
                    {chatsloading ? (<div></div>) : (
                        <div >
                            {chats.map(function (s, index) {
                                return <>
                                    <div className='Chat' key={s._id}
                                        onClick={() => {
                                            navigate(`/chat/getchat/${s._id}`)
                                        }}>
                                        <div className='Chats_parent_middlepanel_title text-black	'>Title: {s.title}</div>
                                        <div className='Chats_parent_middlepanel_vehicle text-black	'>Vehicle Number: {s.vehicle}</div>

                                        <div className='Chats_parent_middlepanel_Operations text-black	'>
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