import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebaruser from '../Components/Sidebaruser';
import { TbLogout } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Userspage = () => {
    const { id } = useParams();
    const [loggeduser, setloggeduser] = useState([]);
    const [openeduser, setopeneduser] = useState([]);
    const [message, setmessage] = useState('');
    const [getmessa, setgetmessa] = useState([]);
    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.removeItem('authtoken');
        navigate('/');
    };

    const logger = async () => {
        try {
            const token = localStorage.getItem('authtoken');
            if (!token) throw new Error('No token found');
            const respo = await axios.get('https://chatappmern-j3tu.onrender.com/auth/logged', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setloggeduser(Array.isArray(respo.data) ? respo.data : [respo.data]);
        } catch (error) {
            console.error('Error fetching logged user data:', error);
        }
    };

    const openeduserpage = async () => {
        try {
            const token = localStorage.getItem('authtoken');
            if (!token) throw new Error('No token found');
            const getuser = await axios.get(`https://chatappmern-j3tu.onrender.com/auth/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setopeneduser(getuser.data);
        } catch (error) {
            console.error('Error fetching opened user data:', error);
        }
    };

    const fetchaccordmessage = async () => {
        try {
            const resp = await axios.get(`https://chatappmern-j3tu.onrender.com/message/messages/${loggeduser[0]._id}/${id}`);
            setgetmessa(resp.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendmessage = async () => {
        if (!message.trim()) return alert("Message cannot be empty!");

        const formattedMessage = message.trim(); // Remove extra spaces but preserve newlines

        const newMessage = {
            message: formattedMessage,
            senderId: loggeduser[0]._id,
            receiverId: id,
            createdAt: new Date(),
            _id: Date.now().toString(),
        };

        // Optimistically update the UI
        setgetmessa((prevMessages) => [...prevMessages, newMessage]);
        setmessage('');

        try {
            await axios.post(`https://chatappmern-j3tu.onrender.com/message/messages`, {
                message: formattedMessage,
                senderId: loggeduser[0]._id,
                receiverId: id,
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    useEffect(() => {
        logger();
    }, []);

    useEffect(() => {
        openeduserpage();
    }, [id]);

    useEffect(() => {
        if (loggeduser.length > 0) {
            fetchaccordmessage();
            const interval = setInterval(fetchaccordmessage, 2000); // Polling every 2 seconds

            // Cleanup on user switch or component unmount
            return () => clearInterval(interval);
        }
    }, [id, loggeduser]);
    const [sidepanel, setsidepanel] = useState(true)

    const handleInputChange = (e) => {
        setmessage(e.target.value);
        e.target.style.height = "auto"; // Reset height
        e.target.style.height = `${Math.min(150, e.target.scrollHeight)}px`; // Adjust height
    };

    const handleScroll = () => {
        const element = document.getElementById("sc");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
        }
    };
    return (
        <div className="flex">
            {
                sidepanel &&
                <div className='w-[360px] sm:flex hidden border-r-2 border-zinc-600 max-h-auto  h-screen bg-zinc-800 overflow-y-auto p-2  flex-col items-center justify-between sticky top-0' >
                    <Sidebaruser setside={setsidepanel} />
                    <div className='w-full h-7 bg-opacity-25 backdrop-blur-lg  bg-zinc-800 rounded-lg sticky bottom-0 z-50 flex items-center justify-around  mb-8' >
                        {
                            loggeduser.map(({ name, _id }) => (
                                <div key={_id} >
                                    <h2>{name}</h2>
                                </div>
                            ))
                        }
                        <div className='cursor-pointer  whitespace-nowrap select-none bg-zinc-900 py-1 px-2 rounded-lg flex items-center justify-between flex-nowrap'>
                            <h2 className='mx-2 text-md' onClick={handlelogout} >Logout </h2>
                            <TbLogout className='text-red-600 text-2xl' />
                        </div>

                    </div>
                </div>
            }

            {
                sidepanel ?

                    <div className="w-[100%] h-screen   sticky top-0 z-50 overflow-y-auto">
                        {/* onClick={() => navigate(`/alluserprofile/${id}`)} */}
                        <div className="w-full p-2 bg-zinc-800 sticky top-0 z-50 max-h-screen flex items-center">
                            <div className='bg-zinc-800 p-1 flex items-center' > <IoIosArrowBack onClick={() => navigate(-1)} className='cursor-pointer hover:bg-zinc-600 p-2  rounded-full text-4xl ' /></div>
                            {openeduser.map(({ name, _id, imageurl }) => (
                                <div key={_id}>
                                    {imageurl ? (
                                        <div className='flex items-center gap-3' >
                                            <div onClick={() => navigate(`/alluserprofile/${id}`)} className='w-16 flex mr-3 items-center justify-center h-16 cursor-pointer select-none rounded-full bg-zinc-700 mb-1 hover:bg-zinc-500'>
                                                <img className='w-full h-full rounded-full' src={imageurl} alt="Profile" />

                                            </div> <h1  onClick={() => navigate(`/alluserprofile/${id}`)}>{name}</h1>
                                        </div>
                                    ) : (
                                        <div className='flex items-center gap-3' >
                                            <div onClick={() => navigate(`/alluserprofile/${id}`)} className='w-16 flex mr-3 items-center justify-center h-16 cursor-pointer select-none rounded-full bg-zinc-700 mb-1 hover:bg-zinc-500'>
                                                <img className='w-full h-full rounded-full' src={imageurl} alt="Profile" />

                                            </div> <h1  onClick={() => navigate(`/alluserprofile/${id}`)} >{name}</h1>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col justify-end w-full items-end mb-20">
                            {getmessa.map(({ message, createdAt, _id, senderId }) => (
                                <div
                                    key={_id}
                                    className={`flex flex-col  w-auto max-w-[65%]  p-2 rounded-xl m-2 ${senderId === loggeduser[0]._id
                                        ? 'bg-green-950 self-end rounded-tr-none'
                                        : 'bg-neutral-950 self-start rounded-tl-none'
                                        }`}
                                    style={{
                                        whiteSpace: 'pre-wrap', // Preserve formatting
                                        wordWrap: 'break-word',
                                    }}
                                >


                                    <p>{message}</p>
                                    <p className="text-zinc-400">{new Date(createdAt).toLocaleString()}</p>


                                </div>
                            ))}
                        </div>

                        <div className="fixed bottom-0 sm:w-[79%]   w-full   flex items-center justify-around z-50 bg-zinc-800 p-2 bg-opacity-25 backdrop-blur-md py-3">
                            <textarea
                                value={message}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="w-[85%] h-[40px] bg-zinc-700 resize-none rounded-lg overflow-y-auto border-none outline-none p-1 text-lg px-2"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    minHeight: '40px',
                                    maxHeight: '90px',
                                }}
                            />
                            {/* <input
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}
                                type="text"
                                placeholder="Type your message..."
                                className="w-[85%] bg-zinc-700 border-none outline-none p-1 text-lg px-2"
                            /> */}
                            <IoIosSend
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendmessage()
                                    }
                                }}
                                onClick={sendmessage}
                                className="text-white text-5xl mx-2 p-2 hover:bg-zinc-800 rounded-xl select-none cursor-pointer"
                            />

                            <div>
                                <button className='border-none p-2 rounded-xl cursor-pointer hover:bg-zinc-600 select-none bg-zinc-700'
                                    onClick={handleScroll}

                                >
                                    <IoMdArrowRoundDown size={24} color="#fff" />
                                </button>
                            </div>



                        </div>
                        <div id='sc' ></div>
                    </div> :

                    <div className="w-[100%] h-screen sticky top-0 z-50 overflow-y-auto">

                        <div className="w-full p-2 bg-zinc-800 sticky top-0 z-50 max-h-screen flex items-center">
                            <div className='bg-zinc-800 p-1 flex items-center' > <IoIosArrowForward onClick={() => setsidepanel(true)} className='cursor-pointer hover:bg-zinc-600 p-2  rounded-full text-4xl ' /></div>
                            {openeduser.map(({ name, _id }) => (
                                <div key={_id}>
                                    <h1>{name}</h1>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col justify-end w-full items-end">
                            {getmessa.map(({ message, createdAt, _id, senderId }) => (
                                <div
                                    key={_id}
                                    className={`flex flex-col w-auto max-w-[50%] p-2 rounded-xl  m-2 ${senderId === loggeduser[0]._id
                                        ? 'bg-green-950 self-end rounded-tr-none'
                                        : 'bg-neutral-950 self-start rounded-tl-none'
                                        }`}
                                    style={{
                                        whiteSpace: 'pre-wrap', // Preserve formatting
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    <p>{message}</p>
                                    <p className="text-zinc-400">{new Date(createdAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="sticky bottom-0  w-full flex items-center justify-around z-50 bg-zinc-800 p-2 bg-opacity-25 backdrop-blur-md py-3">
                            <textarea
                                value={message}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="w-[85%]  bg-zinc-700 resize-none rounded-lg overflow-y-auto border-none outline-none p-1 text-lg px-2"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    minHeight: '40px',
                                    maxHeight: '90px',
                                }}
                            />
                            {/* <textarea value={message}
                                onChange={(e) => setmessage(e.target.value)}
                                type="text"
                                placeholder="Type your message..."
                                className="w-[85%] bg-zinc-700 resize-none rounded-lg h-[38px] overflow-y-auto   border-none outline-none p-1 text-lg px-2" ></textarea> */}
                            {/* <input
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}
                                type="text"
                                placeholder="Type your message..."
                                className="w-[85%] bg-zinc-700 border-none outline-none p-1 text-lg px-2"
                            /> */}
                            <IoIosSend onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendmessage()
                                }
                            }}
                                onClick={sendmessage}
                                className="text-white text-5xl mx-2 p-2 hover:bg-zinc-800 rounded-xl select-none cursor-pointer"
                            />
                            <div>
                                <button className='border-none p-2 rounded-xl cursor-pointer hover:bg-zinc-600 select-none bg-zinc-700'
                                    onClick={handleScroll}

                                >
                                    <IoMdArrowRoundDown size={24} color="#fff" />
                                </button>
                            </div>
                        </div>
                        <div id='sc' ></div>
                    </div>
            }
        </div>
    );
};

export default Userspage;
